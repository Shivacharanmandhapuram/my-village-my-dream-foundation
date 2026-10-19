import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { api, loadCatalog, productsFor, type Catalog, type Review } from '../lib/market';
import { ProductImage, ContactButtons, SellerAvatar, FeaturedBadge, RatingBadge, ReviewList, ReviewForm, PageState } from '../components/market/MarketUI';

const MarketSeller: React.FC = () => {
  const { sellerId = '' } = useParams();
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCatalog().then(setCatalog).catch((e) => setError(e.message));
    api<Review[]>(`/market/reviews?seller=${encodeURIComponent(sellerId)}`).then(setReviews).catch(() => setReviews([]));
  }, [sellerId]);

  if (!catalog) return <PageState loading={!error} error={error || undefined} />;
  const seller = catalog.sellers.find((s) => s.id === sellerId);
  if (!seller) return <PageState error="This villager is not listed right now." />;
  const products = productsFor(catalog, seller.id);
  const productNames = Object.fromEntries(catalog.products.map((p) => [p.id, p.name_en]));

  return (
    <div className="bg-ngo-beige min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/market" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-mkt">
          <ArrowLeft size={16} /> Village Market
        </Link>

        <div className="mt-6 bg-white rounded-2xl border border-mkt-light p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <SellerAvatar seller={seller} size="w-24 h-24 text-3xl" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{seller.name_en}</h1>
                <RatingBadge rating={catalog.ratings[seller.id]} />
                {seller.featured && <FeaturedBadge />}
              </div>
              {seller.name_mr && <p className="text-lg text-gray-500">{seller.name_mr}</p>}
              {seller.village && <span className="inline-flex items-center gap-1 text-sm text-gray-500 mt-2"><MapPin size={14} /> {seller.village}</span>}
              {seller.about && <p className="mt-4 text-gray-700 leading-relaxed">{seller.about}</p>}
              <div className="mt-5"><ContactButtons seller={seller} /></div>
            </div>
          </div>
        </div>

        <h2 className="mt-10 mb-4 text-xl font-bold text-gray-900">Sells</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <Link key={p.id} to={`/market/${p.id}`} className="group bg-white rounded-xl overflow-hidden border border-mkt-light hover:shadow-md transition-shadow">
              <ProductImage product={p} className="w-full aspect-[4/3]" emojiSize="text-5xl" />
              <div className="p-3">
                <p className="font-bold text-gray-900 text-sm group-hover:text-mkt">{p.name_en}</p>
                <p className="text-xs text-gray-500">{p.name_mr}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6 items-start">
          <div className="bg-white rounded-2xl border border-mkt-light p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reviews</h2>
            <ReviewList reviews={reviews} productNames={productNames} />
          </div>
          <div className="bg-white rounded-2xl border border-mkt-light p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Bought from {seller.name_en.split(' ')[0]}?</h2>
            <p className="text-sm text-gray-500 mb-4">Your review helps other buyers trust village sellers.</p>
            <ReviewForm
              seller={seller}
              onPosted={(r) => {
                setReviews((prev) => [r, ...prev]);
                loadCatalog(true).then(setCatalog).catch(() => {});
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSeller;
