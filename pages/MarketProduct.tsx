import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MessageSquare, PenLine } from 'lucide-react';
import { api, loadCatalog, sellersFor, type Catalog, type Review, type Seller, type Product } from '../lib/market';
import { ProductImage, SellerCard, ReviewList, ReviewForm, PageState } from '../components/market/MarketUI';

const SellerReviews: React.FC<{ seller: Seller; product: Product; reviews: Review[]; onPosted: (r: Review) => void }> = ({
  seller, product, reviews, onPosted,
}) => {
  const [open, setOpen] = useState<'none' | 'read' | 'write'>('none');
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex flex-wrap gap-4 text-sm font-semibold">
        <button onClick={() => setOpen(open === 'read' ? 'none' : 'read')} className="inline-flex items-center gap-1.5 text-gray-600 hover:text-mkt">
          <MessageSquare size={15} /> {reviews.length ? `Read ${reviews.length} review${reviews.length > 1 ? 's' : ''}` : 'Reviews'}
        </button>
        <button onClick={() => setOpen(open === 'write' ? 'none' : 'write')} className="inline-flex items-center gap-1.5 text-gray-600 hover:text-mkt">
          <PenLine size={15} /> Write a review
        </button>
      </div>
      {open === 'read' && <div className="mt-4"><ReviewList reviews={reviews} /></div>}
      {open === 'write' && (
        <div className="mt-4 max-w-xl">
          <ReviewForm seller={seller} productId={product.id} onPosted={onPosted} />
        </div>
      )}
    </div>
  );
};

const MarketProduct: React.FC = () => {
  const { productId = '' } = useParams();
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCatalog().then(setCatalog).catch((e) => setError(e.message));
    api<Review[]>(`/market/reviews?product=${encodeURIComponent(productId)}`).then(setReviews).catch(() => setReviews([]));
  }, [productId]);

  if (!catalog) return <PageState loading={!error} error={error || undefined} />;
  const product = catalog.products.find((p) => p.id === productId);
  if (!product) return <PageState error="This product is not listed right now." />;
  const category = catalog.categories.find((c) => c.id === product.category_id);
  const sellers = sellersFor(catalog, product.id);
  const related = catalog.products.filter((p) => p.category_id === product.category_id && p.id !== product.id && sellersFor(catalog, p.id).length);

  const onPosted = (r: Review) => {
    setReviews((prev) => [r, ...prev]);
    loadCatalog(true).then(setCatalog).catch(() => {});
  };

  return (
    <div className="bg-ngo-beige min-h-screen pb-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to={`/market${category ? `?category=${category.id}` : ''}`} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-mkt">
          <ArrowLeft size={16} /> {category ? category.name_en : 'Village Market'}
        </Link>

        <div className="mt-6 grid md:grid-cols-[minmax(0,380px)_1fr] gap-8 items-start">
          <ProductImage product={product} className="w-full aspect-[16/9] md:aspect-[4/3] rounded-2xl" emojiSize="text-7xl md:text-8xl" />
          <div>
            <p className="text-sm font-bold text-mkt uppercase tracking-wide">{category?.name_en}</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold text-gray-900">{product.name_en}</h1>
            <p className="text-2xl text-gray-500 mt-1">{product.name_mr}</p>
            {product.description && <p className="mt-4 text-gray-700 leading-relaxed max-w-2xl">{product.description}</p>}
            <p className="mt-5 text-gray-600">
              <span className="font-bold text-gray-900">{sellers.length}</span> {sellers.length === 1 ? 'villager sells' : 'villagers sell'} {product.name_en.toLowerCase()}.
              Call or WhatsApp them to agree on price, quantity and delivery.
            </p>
          </div>
        </div>

        <h2 className="mt-12 mb-5 text-2xl font-bold text-gray-900">Villagers selling {product.name_en}</h2>
        <div className="space-y-4">
          {sellers.map((s) => (
            <SellerCard key={s.id} seller={s} rating={catalog.ratings[s.id]} product={product}>
              <SellerReviews seller={s} product={product} reviews={reviews.filter((r) => r.seller_id === s.id)} onPosted={onPosted} />
            </SellerCard>
          ))}
          {sellers.length === 0 && <p className="text-gray-500">No villagers are selling this right now.</p>}
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-gray-900 mb-4">More in {category?.name_en}</h2>
            <div className="flex flex-wrap gap-3">
              {related.map((p) => (
                <Link key={p.id} to={`/market/${p.id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-mkt hover:text-mkt">
                  <span aria-hidden="true">{p.emoji}</span> {p.name_en} <span className="text-gray-400 font-normal">{p.name_mr}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketProduct;
