import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ChevronsUp, Award, Loader2 } from 'lucide-react';
import { api, formatPhone, type CmsCatalog } from '../../lib/market';
import { SellerAvatar } from '../market/MarketUI';
import { Toggle, inputCls } from './ui';

/** Set the order villagers appear in on each product page. Recommended villagers always sit on top. */
const PriorityTab: React.FC<{ catalog: CmsCatalog; reload: () => Promise<void> }> = ({ catalog, reload }) => {
  const [productId, setProductId] = useState(catalog.products[0]?.id ?? '');
  const [busy, setBusy] = useState(false);

  const sellerById = new Map(catalog.sellers.map((s) => [s.id, s]));
  const rows = catalog.listings
    .filter((l) => l.product_id === productId && sellerById.has(l.seller_id))
    .map((l) => ({ l, s: sellerById.get(l.seller_id)! }))
    .sort((a, b) => Number(b.s.featured) - Number(a.s.featured) || a.l.position - b.l.position);

  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    try {
      await fn();
      await reload();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= rows.length) return;
    const ids = rows.map((r) => r.s.id);
    const [id] = ids.splice(from, 1);
    ids.splice(to, 0, id);
    run(() => api(`/cms/order/${encodeURIComponent(productId)}`, { method: 'PUT', body: { seller_ids: ids } }));
  };

  const setListingActive = (sellerId: string, active: boolean) =>
    run(() => api('/cms/listings', { method: 'PATCH', body: { seller_id: sellerId, product_id: productId, active } }));

  return (
    <div className="max-w-3xl">
      <p className="text-sm text-gray-600 mb-4">
        Choose a product, then move villagers up or down. The order here is the order buyers see on that product's page.
        Villagers marked <span className="font-semibold text-ngo-teal">Recommended</span> (in the Villagers tab) always appear first.
      </p>
      <div className="flex items-center gap-3 mb-5">
        <select className={`${inputCls} !w-auto max-w-sm`} value={productId} onChange={(e) => setProductId(e.target.value)} aria-label="Product">
          {catalog.categories.map((c) => (
            <optgroup key={c.id} label={c.name_en}>
              {catalog.products.filter((p) => p.category_id === c.id).map((p) => (
                <option key={p.id} value={p.id}>{p.name_en} — {p.name_mr}</option>
              ))}
            </optgroup>
          ))}
        </select>
        {busy && <Loader2 size={18} className="animate-spin text-gray-400" />}
      </div>

      <ol className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
        {rows.map(({ l, s }, i) => (
          <li key={s.id} className={`flex items-center gap-3 p-3 ${l.active && s.active ? '' : 'bg-gray-50 opacity-60'}`}>
            <span className="w-7 text-center text-sm font-bold text-gray-400">{i + 1}</span>
            <SellerAvatar seller={s} size="w-10 h-10 text-sm" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 truncate flex items-center gap-2">
                {s.name_en} {s.featured && <Award size={14} className="text-ngo-teal" aria-label="Recommended" />}
              </p>
              <p className="text-xs text-gray-500">
                {s.phones.map(formatPhone).join(', ')}
                {!s.active && ' · villager unlisted'}
              </p>
            </div>
            <label className="hidden sm:flex items-center gap-2 text-xs text-gray-500" title="Show this villager for this product">
              <Toggle checked={l.active} disabled={busy} onChange={(v) => setListingActive(s.id, v)} label={`Show ${s.name_en} for this product`} /> Shown
            </label>
            <div className="flex">
              <button disabled={busy || i === 0} onClick={() => move(i, 0)} className="p-2 text-gray-400 hover:text-ngo-maroon disabled:opacity-30" aria-label="Move to top"><ChevronsUp size={18} /></button>
              <button disabled={busy || i === 0} onClick={() => move(i, i - 1)} className="p-2 text-gray-400 hover:text-ngo-maroon disabled:opacity-30" aria-label="Move up"><ArrowUp size={18} /></button>
              <button disabled={busy || i === rows.length - 1} onClick={() => move(i, i + 1)} className="p-2 text-gray-400 hover:text-ngo-maroon disabled:opacity-30" aria-label="Move down"><ArrowDown size={18} /></button>
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="p-8 text-center text-gray-500">No villagers sell this product yet. Add it to a villager in the Villagers tab.</li>}
      </ol>
    </div>
  );
};

export default PriorityTab;
