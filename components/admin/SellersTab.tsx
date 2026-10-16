import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Star, Award, EyeOff } from 'lucide-react';
import { api, formatPhone, type CmsCatalog, type Seller } from '../../lib/market';
import { SellerAvatar } from '../market/MarketUI';
import { Button, Field, ImageInput, Modal, Toggle, ErrorNote, inputCls } from './ui';

type Draft = Omit<Seller, 'id' | 'phones'> & { id?: string; phones: string; product_ids: string[] };

const emptyDraft = (): Draft => ({
  name_en: '', name_mr: '', phones: '', village: '', about: '', photo_url: null, featured: false, active: true, product_ids: [],
});

const SellerForm: React.FC<{ catalog: CmsCatalog; initial: Draft; onClose: () => void; onSaved: () => void }> = ({
  catalog, initial, onClose, onSaved,
}) => {
  const [d, setD] = useState<Draft>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((prev) => ({ ...prev, [k]: v }));
  const toggleProduct = (id: string) =>
    set('product_ids', d.product_ids.includes(id) ? d.product_ids.filter((p) => p !== id) : [...d.product_ids, id]);

  const save = async () => {
    setBusy(true);
    setError('');
    try {
      const body = { ...d, phones: d.phones };
      if (d.id) await api(`/cms/sellers/${encodeURIComponent(d.id)}`, { method: 'PUT', body });
      else await api('/cms/sellers', { method: 'POST', body });
      onSaved();
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!d.id || !confirm(`Permanently delete ${d.name_en} and all their reviews?\n\nTo hide them temporarily, switch off "Listed" instead.`)) return;
    setBusy(true);
    try {
      await api(`/cms/sellers/${encodeURIComponent(d.id)}`, { method: 'DELETE' });
      onSaved();
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  };

  return (
    <Modal
      title={d.id ? `Edit ${initial.name_en}` : 'Add a villager'}
      onClose={onClose}
      footer={
        <>
          <Button onClick={save} busy={busy}>{d.id ? 'Save changes' : 'Add villager'}</Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          {d.id && <Button variant="danger" onClick={remove} className="ml-auto">Delete</Button>}
        </>
      }
    >
      <div className="space-y-5">
        <ErrorNote message={error} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name (English) *"><input className={inputCls} value={d.name_en} onChange={(e) => set('name_en', e.target.value)} /></Field>
          <Field label="Name (Marathi)"><input className={inputCls} value={d.name_mr} onChange={(e) => set('name_mr', e.target.value)} /></Field>
          <Field label="Phone number(s) *" hint="10-digit mobile. Separate two numbers with a comma.">
            <input className={inputCls} value={d.phones} onChange={(e) => set('phones', e.target.value)} inputMode="tel" placeholder="98765 43210" />
          </Field>
          <Field label="Village / town"><input className={inputCls} value={d.village} onChange={(e) => set('village', e.target.value)} placeholder="e.g. Wardha" /></Field>
        </div>
        <Field label="About (optional)" hint="A line about them or their products, shown on their page.">
          <textarea className={inputCls} rows={2} value={d.about} onChange={(e) => set('about', e.target.value)} />
        </Field>
        <Field label="Photo (optional)">
          <ImageInput value={d.photo_url} onChange={(v) => set('photo_url', v)} round />
        </Field>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
            <Toggle checked={d.active} onChange={(v) => set('active', v)} label="Listed" /> Listed on the market
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
            <Toggle checked={d.featured} onChange={(v) => set('featured', v)} label="Recommended" /> Recommended (shown first)
          </label>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-700 mb-2">Products they sell *</p>
          <div className="space-y-3">
            {catalog.categories.map((c) => (
              <div key={c.id}>
                <p className="text-xs text-gray-500 mb-1.5">{c.emoji} {c.name_en}</p>
                <div className="flex flex-wrap gap-2">
                  {catalog.products.filter((p) => p.category_id === c.id).map((p) => {
                    const on = d.product_ids.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => toggleProduct(p.id)}
                        aria-pressed={on}
                        className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                          on ? 'bg-ngo-maroon text-white border-ngo-maroon' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {p.name_en}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const SellersTab: React.FC<{ catalog: CmsCatalog; reload: () => Promise<void> }> = ({ catalog, reload }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'listed' | 'unlisted' | 'featured'>('all');
  const [editing, setEditing] = useState<Draft | null>(null);
  const [savingId, setSavingId] = useState('');

  const productNames = useMemo(() => new Map(catalog.products.map((p) => [p.id, p.name_en])), [catalog]);
  const productsBySeller = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const l of catalog.listings) m.set(l.seller_id, [...(m.get(l.seller_id) ?? []), l.product_id]);
    return m;
  }, [catalog]);

  const rows = catalog.sellers.filter((s) => {
    if (filter === 'listed' && !s.active) return false;
    if (filter === 'unlisted' && s.active) return false;
    if (filter === 'featured' && !s.featured) return false;
    const q = query.trim().toLowerCase();
    return !q || [s.name_en, s.name_mr, s.village, ...s.phones].some((v) => v.toLowerCase().includes(q.replace(/\s/g, '')) || v.toLowerCase().includes(q));
  });

  const quickUpdate = async (s: Seller, patch: Partial<Seller>) => {
    setSavingId(s.id);
    try {
      await api(`/cms/sellers/${encodeURIComponent(s.id)}`, { method: 'PUT', body: { ...s, ...patch } });
      await reload();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSavingId('');
    }
  };

  const edit = (s: Seller) =>
    setEditing({ ...s, phones: s.phones.join(', '), product_ids: productsBySeller.get(s.id) ?? [] });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className={`${inputCls} pl-9`} placeholder="Search name, phone or village" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select className={`${inputCls} !w-auto`} value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} aria-label="Filter villagers">
          <option value="all">All villagers ({catalog.sellers.length})</option>
          <option value="listed">Listed</option>
          <option value="unlisted">Unlisted</option>
          <option value="featured">Recommended</option>
        </select>
        <Button onClick={() => setEditing(emptyDraft())}><Plus size={16} /> Add villager</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
        {rows.map((s) => {
          const rating = catalog.ratings[s.id];
          const products = productsBySeller.get(s.id) ?? [];
          return (
            <div key={s.id} className={`p-4 flex flex-col lg:flex-row lg:items-center gap-4 ${s.active ? '' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <SellerAvatar seller={s} size="w-11 h-11 text-base" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={`font-bold ${s.active ? 'text-gray-900' : 'text-gray-400'}`}>{s.name_en}</p>
                    {s.featured && <Award size={15} className="text-ngo-teal" aria-label="Recommended" />}
                    {!s.active && <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full"><EyeOff size={11} /> Unlisted</span>}
                  </div>
                  <p className="text-sm text-gray-500">
                    {s.name_mr}{s.village && ` · ${s.village}`} · {s.phones.map(formatPhone).join(', ')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {products.map((p) => productNames.get(p)).filter(Boolean).join(', ') || <span className="text-red-500">No products selected</span>}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-5 text-sm">
                <span className="inline-flex items-center gap-1 text-gray-600 w-20">
                  {rating ? <><Star size={14} className="text-amber-500" fill="currentColor" /> {rating.avg.toFixed(1)} <span className="text-gray-400">({rating.count})</span></> : <span className="text-gray-300">—</span>}
                </span>
                <label className="flex items-center gap-2 text-gray-600">
                  <Toggle checked={s.featured} disabled={savingId === s.id} onChange={(v) => quickUpdate(s, { featured: v })} label={`Recommend ${s.name_en}`} /> Recommended
                </label>
                <label className="flex items-center gap-2 text-gray-600">
                  <Toggle checked={s.active} disabled={savingId === s.id} onChange={(v) => quickUpdate(s, { active: v })} label={`List ${s.name_en}`} /> Listed
                </label>
                <Button variant="secondary" onClick={() => edit(s)}><Pencil size={14} /> Edit</Button>
              </div>
            </div>
          );
        })}
        {rows.length === 0 && <p className="p-8 text-center text-gray-500">No villagers match.</p>}
      </div>

      {editing && (
        <SellerForm
          catalog={catalog}
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null);
            await reload();
          }}
        />
      )}
    </div>
  );
};

export default SellersTab;
