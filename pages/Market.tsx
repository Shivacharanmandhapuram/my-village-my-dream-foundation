import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Store, Phone, Handshake, Users, X } from 'lucide-react';
import { loadCatalog, sellersFor, type Catalog, type Product } from '../lib/market';
import { ProductImage, PageState } from '../components/market/MarketUI';

const ProductCard: React.FC<{ product: Product; sellerCount: number }> = ({ product, sellerCount }) => (
  <Link
    to={`/market/${product.id}`}
    className="group bg-white rounded-2xl overflow-hidden border border-orange-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
  >
    <ProductImage product={product} className="w-full aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-300" />
    <div className="p-4 flex-1 flex flex-col">
      <h3 className="font-bold text-gray-900 group-hover:text-ngo-maroon transition-colors">{product.name_en}</h3>
      <p className="text-sm text-gray-500">{product.name_mr}</p>
      <p className="mt-auto pt-3 text-xs font-semibold text-ngo-teal inline-flex items-center gap-1">
        <Users size={13} /> {sellerCount} {sellerCount === 1 ? 'villager sells' : 'villagers sell'} this
      </p>
    </div>
  </Link>
);

const Market: React.FC = () => {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState('');
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const activeCat = params.get('category') ?? '';

  useEffect(() => {
    loadCatalog().then(setCatalog).catch((e) => setError(e.message));
  }, []);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };

  const sections = useMemo(() => {
    if (!catalog) return [];
    const q = query.trim().toLowerCase();
    const sellerById = new Map(catalog.sellers.map((s) => [s.id, s]));
    return catalog.categories
      .filter((c) => !activeCat || c.id === activeCat)
      .map((c) => ({
        category: c,
        products: catalog.products
          .filter((p) => p.category_id === c.id)
          .map((p) => ({ product: p, sellers: sellersFor(catalog, p.id) }))
          .filter(({ product: p, sellers }) => {
            if (!sellers.length) return false;
            if (!q) return true;
            // Match product names in either language, or any villager selling it.
            return [p.name_en, p.name_mr, c.name_en, c.name_mr].some((s) => s.toLowerCase().includes(q)) ||
              sellers.some((s) => [s.name_en, s.name_mr, s.village].some((v) => v.toLowerCase().includes(q)) ||
                s.phones.some((ph) => ph.includes(q.replace(/\s/g, ''))));
          }),
      }))
      .filter((s) => s.products.length > 0 && sellerById.size > 0);
  }, [catalog, query, activeCat]);

  if (!catalog) return <PageState loading={!error} error={error || undefined} />;

  const villagerCount = new Set(catalog.listings.filter((l) => l.active).map((l) => l.seller_id)).size;

  return (
    <div className="bg-ngo-beige min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-white border-b border-orange-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-ngo-maroon bg-orange-50 px-3 py-1.5 rounded-full mb-5">
              <Store size={16} /> Village Market · गाव बाजार
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              Buy directly from the villagers who make it.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Fresh milk, grains, home-made foods, tailoring and more from {villagerCount} villagers in our
              community. Find what you need, then call or WhatsApp the villager directly. No middlemen, no commission.
            </p>
          </div>

          <div className="mt-8 max-w-2xl relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              value={query}
              onChange={(e) => setParam('q', e.target.value)}
              placeholder="Search milk, तूर, rice, a villager's name…"
              className="w-full pl-14 pr-12 py-4 rounded-full border border-gray-200 bg-white shadow-sm text-base focus:border-ngo-orange focus:ring-4 focus:ring-orange-100 outline-none"
              aria-label="Search the market"
            />
            {query && (
              <button onClick={() => setParam('q', '')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700" aria-label="Clear search">
                <X size={18} />
              </button>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl text-sm">
            {[
              { icon: <Search size={18} />, text: 'Find a product and pick a villager' },
              { icon: <Phone size={18} />, text: 'Call or WhatsApp them directly' },
              { icon: <Handshake size={18} />, text: 'Agree on price, quantity and delivery' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-600">
                <span className="w-9 h-9 rounded-full bg-ngo-warm-gray text-ngo-maroon flex items-center justify-center flex-shrink-0">{s.icon}</span>
                {s.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category chips */}
      <div className="sticky top-[116px] z-30 bg-ngo-beige/95 backdrop-blur border-b border-orange-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          {[{ id: '', name_en: 'All', emoji: '🛒' }, ...catalog.categories].map((c) => (
            <button
              key={c.id}
              onClick={() => setParam('category', c.id)}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCat === c.id ? 'bg-ngo-maroon text-white' : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              <span aria-hidden="true">{c.emoji}</span> {c.name_en}
            </button>
          ))}
        </div>
      </div>

      {/* Products by category */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {sections.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Nothing matches “{query}”.</p>
            <button onClick={() => setParams({}, { replace: true })} className="mt-3 text-ngo-maroon font-semibold hover:underline">
              Show everything
            </button>
          </div>
        )}
        {sections.map(({ category, products }) => (
          <section key={category.id} aria-labelledby={`cat-${category.id}`}>
            <div className="flex items-baseline gap-3 mb-6 flex-wrap">
              <h2 id={`cat-${category.id}`} className="text-2xl md:text-3xl font-bold text-gray-900">
                <span aria-hidden="true" className="mr-2">{category.emoji}</span>{category.name_en}
              </h2>
              <span className="text-gray-500">{category.name_mr}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.map(({ product, sellers }) => (
                <ProductCard key={product.id} product={product} sellerCount={sellers.length} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-ngo-teal rounded-2xl p-8 md:p-10 text-white grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold">Are you a villager who wants to sell here?</h2>
            <p className="mt-2 text-teal-50">Listing is free. Contact the My Village My Dream team and we will add you and your products.</p>
          </div>
          <a href="tel:+919970681002" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-ngo-teal font-bold hover:bg-teal-50">
            <Phone size={18} /> +91 99706 81002
          </a>
        </div>
        <p className="mt-6 text-xs text-gray-500 leading-relaxed max-w-3xl">
          My Village My Dream connects buyers with villagers and does not handle payments, deliveries or product quality.
          Please agree on price, quantity and delivery directly with the villager.
        </p>
      </section>
    </div>
  );
};

export default Market;
