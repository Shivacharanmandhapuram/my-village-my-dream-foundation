import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Star, MapPin, Award, Loader2, CheckCircle2 } from 'lucide-react';
import {
  api, formatPhone, telLink, whatsappLink, tileColor, timeAgo,
  type Product, type Seller, type Rating, type Review,
} from '../../lib/market';

export const Stars: React.FC<{ value: number; size?: number }> = ({ value, size = 16 }) => (
  <span className="inline-flex items-center" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={size}
        className={i <= Math.round(value) ? 'text-amber-500' : 'text-gray-300'}
        fill={i <= Math.round(value) ? 'currentColor' : 'none'}
      />
    ))}
  </span>
);

export const RatingBadge: React.FC<{ rating?: Rating }> = ({ rating }) =>
  rating ? (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
      <Stars value={rating.avg} size={16} />
      <span className="font-semibold">{rating.avg.toFixed(1)}</span>
      <span className="text-gray-400">({rating.count})</span>
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
      <Stars value={0} size={16} />
      <span>New</span>
    </span>
  );

// Photo priority: CMS upload → built-in photo (public/images/market/<id>.jpg) → emoji tile.
export const ProductImage: React.FC<{ product: Product; className?: string; emojiSize?: string }> = ({
  product, className = '', emojiSize = 'text-6xl',
}) => {
  const src = product.image_url ?? `/images/market/${product.id}.jpg`;
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed)
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br ${tileColor(product.category_id)} ${className}`} aria-hidden="true">
        <span className={`${emojiSize} drop-shadow-sm select-none`}>{product.emoji}</span>
      </div>
    );
  return (
    <div className={`relative overflow-hidden bg-ngo-warm-gray ${className}`}>
      <img
        src={src}
        alt={product.name_en}
        loading="lazy"
        onError={() => setFailed(true)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
};

export const ContactButtons: React.FC<{ seller: Seller; productName?: string; compact?: boolean }> = ({ seller, productName, compact }) => (
  <div className="flex flex-col gap-2">
    {seller.phones.map((p) => (
      <div key={p} className="flex flex-wrap items-center gap-2">
        <a
          href={telLink(p)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-mkt text-white text-sm font-bold hover:bg-mkt-dark transition-colors"
        >
          <Phone size={16} /> {formatPhone(p)}
        </a>
        <a
          href={whatsappLink(p, seller.name_en, productName)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-green-600 text-green-700 text-sm font-bold hover:bg-green-50 transition-colors"
        >
          <MessageCircle size={16} /> {compact ? 'WhatsApp' : 'Chat on WhatsApp'}
        </a>
      </div>
    ))}
  </div>
);

export const SellerAvatar: React.FC<{ seller: Seller; size?: string }> = ({ seller, size = 'w-14 h-14 text-xl' }) =>
  seller.photo_url ? (
    <img src={seller.photo_url} alt={seller.name_en} className={`${size} rounded-full object-cover flex-shrink-0`} />
  ) : (
    <div className={`${size} rounded-full bg-mkt-light text-mkt font-bold flex items-center justify-center flex-shrink-0`} aria-hidden="true">
      {seller.name_en.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('')}
    </div>
  );

export const FeaturedBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 text-xs font-bold text-mkt bg-mkt-light px-2.5 py-1 rounded-full">
    <Award size={12} /> Recommended
  </span>
);

export const ReviewList: React.FC<{ reviews: Review[]; productNames?: Record<string, string> }> = ({ reviews, productNames }) =>
  reviews.length === 0 ? (
    <p className="text-gray-500 text-sm">No reviews yet. Bought from this villager? Be the first to share your experience.</p>
  ) : (
    <ul className="divide-y divide-gray-100">
      {reviews.map((r) => (
        <li key={r.id} className="py-4 first:pt-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
            <Stars value={r.rating} size={14} />
            <span className="font-semibold text-gray-900 text-sm">{r.author_name}</span>
            {r.product_id && productNames?.[r.product_id] && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{productNames[r.product_id]}</span>
            )}
            <span className="text-xs text-gray-400">{timeAgo(r.created_at)}</span>
          </div>
          {r.comment && <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{r.comment}</p>}
        </li>
      ))}
    </ul>
  );

export const ReviewForm: React.FC<{ seller: Seller; productId?: string; onPosted: (r: Review) => void }> = ({ seller, productId, onPosted }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return setError('Please choose a star rating.');
    setBusy(true);
    setError('');
    try {
      const r = await api<Review>('/market/reviews', {
        method: 'POST',
        body: { seller_id: seller.id, product_id: productId, rating, author_name: name, comment, website },
      });
      setDone(true);
      if (r?.id) onPosted(r);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (done)
    return (
      <div className="flex items-center gap-3 bg-green-50 text-green-800 rounded-xl p-4 text-sm font-medium">
        <CheckCircle2 size={18} /> Thank you! Your review helps other buyers and supports {seller.name_en}.
      </div>
    );

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)} role="radiogroup" aria-label="Your rating">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={rating === i}
            aria-label={`${i} star${i > 1 ? 's' : ''}`}
            onClick={() => setRating(i)}
            onMouseEnter={() => setHover(i)}
            className="p-0.5"
          >
            <Star size={28} className={(hover || rating) >= i ? 'text-amber-500' : 'text-gray-300'} fill={(hover || rating) >= i ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={60}
        placeholder="Your name"
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-mkt focus:ring-2 focus:ring-mkt-light outline-none text-sm"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={1000}
        rows={3}
        placeholder="How was the product and the service? (optional)"
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-mkt focus:ring-2 focus:ring-mkt-light outline-none text-sm"
      />
      <input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        disabled={busy}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-700 disabled:opacity-60"
      >
        {busy && <Loader2 size={16} className="animate-spin" />} Post review
      </button>
    </form>
  );
};

export const SellerCard: React.FC<{
  seller: Seller; rating?: Rating; product?: Product; children?: React.ReactNode;
}> = ({ seller, rating, product, children }) => (
  <div className="bg-white rounded-2xl border border-mkt-light p-5 sm:p-6 hover:shadow-md transition-shadow">
    <div className="flex flex-col sm:flex-row sm:items-start gap-5">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <SellerAvatar seller={seller} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/market/villager/${seller.id}`} className="text-lg font-bold text-gray-900 hover:text-mkt">
              {seller.name_en}
            </Link>
            <RatingBadge rating={rating} />
            {seller.featured && <FeaturedBadge />}
          </div>
          {seller.name_mr && <p className="text-gray-500 text-sm">{seller.name_mr}</p>}
          {seller.village && (
            <span className="inline-flex items-center gap-1 text-sm text-gray-500 mt-1"><MapPin size={14} /> {seller.village}</span>
          )}
        </div>
      </div>
      <ContactButtons seller={seller} productName={product?.name_en} compact />
    </div>
    {children}
  </div>
);

export const PageState: React.FC<{ loading?: boolean; error?: string }> = ({ loading, error }) => (
  <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
    {loading ? <Loader2 className="animate-spin text-mkt" size={32} /> : <p>{error}</p>}
  </div>
);
