import React, { useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import { api, type Category, type CmsCatalog, type Product } from '../../lib/market';
import { ProductImage } from '../market/MarketUI';
import { Button, Field, ImageInput, Modal, Toggle, ErrorNote, inputCls } from './ui';

type ProductDraft = Omit<Product, 'id'> & { id?: string };
type CategoryDraft = Omit<Category, 'id'> & { id?: string };

const ProductForm: React.FC<{ catalog: CmsCatalog; initial: ProductDraft; onClose: () => void; onSaved: () => void }> = ({
  catalog, initial, onClose, onSaved,
}) => {
  const [d, setD] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = <K extends keyof ProductDraft>(k: K, v: ProductDraft[K]) => setD((p) => ({ ...p, [k]: v }));
  const sellerCount = d.id ? catalog.listings.filter((l) => l.product_id === d.id).length : 0;

  const save = async () => {
    setBusy(true);
    setError('');
    try {
      if (d.id) await api(`/cms/products/${encodeURIComponent(d.id)}`, { method: 'PUT', body: d });
      else await api('/cms/products', { method: 'POST', body: d });
      onSaved();
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  };
  const remove = async () => {
    if (!d.id || !confirm(`Delete ${d.name_en}? It will be removed from ${sellerCount} villager(s).\n\nTo hide it temporarily, switch off "Shown" instead.`)) return;
    setBusy(true);
    try {
      await api(`/cms/products/${encodeURIComponent(d.id)}`, { method: 'DELETE' });
      onSaved();
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  };

  return (
    <Modal
      title={d.id ? `Edit ${initial.name_en}` : 'Add a product'}
      onClose={onClose}
      footer={
        <>
          <Button onClick={save} busy={busy}>{d.id ? 'Save changes' : 'Add product'}</Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          {d.id && <Button variant="danger" onClick={remove} className="ml-auto">Delete</Button>}
        </>
      }
    >
      <div className="space-y-4">
        <ErrorNote message={error} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name (English) *"><input className={inputCls} value={d.name_en} onChange={(e) => set('name_en', e.target.value)} /></Field>
          <Field label="Name (Marathi)"><input className={inputCls} value={d.name_mr} onChange={(e) => set('name_mr', e.target.value)} /></Field>
          <Field label="Category *">
            <select className={inputCls} value={d.category_id} onChange={(e) => set('category_id', e.target.value)}>
              {catalog.categories.map((c) => <option key={c.id} value={c.id}>{c.name_en}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Icon" hint="Shown when there's no photo"><input className={inputCls} value={d.emoji} onChange={(e) => set('emoji', e.target.value)} maxLength={8} /></Field>
            <Field label="Sort order" hint="Lower comes first"><input className={inputCls} type="number" value={d.sort} onChange={(e) => set('sort', Number(e.target.value))} /></Field>
          </div>
        </div>
        <Field label="Product photo" hint="A general photo of the product (e.g. a glass of milk).">
          <ImageInput value={d.image_url} onChange={(v) => set('image_url', v)} />
        </Field>
        <Field label="Description (optional)">
          <textarea className={inputCls} rows={2} value={d.description} onChange={(e) => set('description', e.target.value)} />
        </Field>
        <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
          <Toggle checked={d.active} onChange={(v) => set('active', v)} label="Shown" /> Shown on the market
        </label>
      </div>
    </Modal>
  );
};

const CategoryForm: React.FC<{ initial: CategoryDraft; onClose: () => void; onSaved: () => void }> = ({ initial, onClose, onSaved }) => {
  const [d, setD] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = <K extends keyof CategoryDraft>(k: K, v: CategoryDraft[K]) => setD((p) => ({ ...p, [k]: v }));
  const save = async () => {
    setBusy(true);
    setError('');
    try {
      if (d.id) await api(`/cms/categories/${encodeURIComponent(d.id)}`, { method: 'PUT', body: d });
      else await api('/cms/categories', { method: 'POST', body: d });
      onSaved();
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  };
  return (
    <Modal
      title={d.id ? `Edit ${initial.name_en}` : 'Add a category'}
      onClose={onClose}
      footer={<><Button onClick={save} busy={busy}>Save</Button><Button variant="secondary" onClick={onClose}>Cancel</Button></>}
    >
      <div className="space-y-4">
        <ErrorNote message={error} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name (English) *"><input className={inputCls} value={d.name_en} onChange={(e) => set('name_en', e.target.value)} /></Field>
          <Field label="Name (Marathi)"><input className={inputCls} value={d.name_mr} onChange={(e) => set('name_mr', e.target.value)} /></Field>
          <Field label="Icon"><input className={inputCls} value={d.emoji} onChange={(e) => set('emoji', e.target.value)} maxLength={8} /></Field>
          <Field label="Sort order" hint="Lower comes first"><input className={inputCls} type="number" value={d.sort} onChange={(e) => set('sort', Number(e.target.value))} /></Field>
        </div>
        <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
          <Toggle checked={d.active} onChange={(v) => set('active', v)} label="Shown" /> Shown on the market
        </label>
      </div>
    </Modal>
  );
};

const ProductsTab: React.FC<{ catalog: CmsCatalog; reload: () => Promise<void> }> = ({ catalog, reload }) => {
  const [product, setProduct] = useState<ProductDraft | null>(null);
  const [category, setCategory] = useState<CategoryDraft | null>(null);
  const count = (pid: string) => catalog.listings.filter((l) => l.product_id === pid && l.active).length;
  const done = async () => {
    setProduct(null);
    setCategory(null);
    await reload();
  };
  const nextSort = (list: { sort: number }[]) => Math.max(0, ...list.map((x) => x.sort)) + 10;

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          onClick={() => setProduct({
            category_id: catalog.categories[0]?.id ?? '', name_en: '', name_mr: '', emoji: '🛒', image_url: null,
            description: '', sort: nextSort(catalog.products), active: true,
          })}
        >
          <Plus size={16} /> Add product
        </Button>
        <Button variant="secondary" onClick={() => setCategory({ name_en: '', name_mr: '', emoji: '🛒', sort: nextSort(catalog.categories), active: true })}>
          <Plus size={16} /> Add category
        </Button>
      </div>

      <div className="space-y-8">
        {catalog.categories.map((c) => (
          <section key={c.id}>
            <div className="flex items-center gap-3 mb-3">
              <h3 className={`text-lg font-bold ${c.active ? 'text-gray-900' : 'text-gray-400 line-through'}`}>{c.emoji} {c.name_en}</h3>
              <span className="text-sm text-gray-500">{c.name_mr}</span>
              <button onClick={() => setCategory(c)} className="text-gray-400 hover:text-ngo-maroon p-1" aria-label={`Edit ${c.name_en}`}><Pencil size={14} /></button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {catalog.products.filter((p) => p.category_id === c.id).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProduct(p)}
                  className={`text-left flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:border-ngo-orange transition-colors ${p.active ? '' : 'opacity-50'}`}
                >
                  <ProductImage product={p} className="w-14 h-14 rounded-lg flex-shrink-0" emojiSize="text-2xl" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 truncate">{p.name_en} <span className="font-normal text-gray-500">{p.name_mr}</span></p>
                    <p className="text-xs text-gray-500">
                      {count(p.id)} villager{count(p.id) === 1 ? '' : 's'}
                      {!p.image_url && ' · no photo yet'}
                      {!p.active && ' · hidden'}
                    </p>
                  </div>
                  <Pencil size={14} className="text-gray-300" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {product && <ProductForm catalog={catalog} initial={product} onClose={() => setProduct(null)} onSaved={done} />}
      {category && <CategoryForm initial={category} onClose={() => setCategory(null)} onSaved={done} />}
    </div>
  );
};

export default ProductsTab;
