import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { api, timeAgo, type CmsReview } from '../../lib/market';
import { Stars, PageState } from '../market/MarketUI';
import { Button, inputCls } from './ui';

const ReviewsTab: React.FC<{ reload: () => Promise<void> }> = ({ reload }) => {
  const [reviews, setReviews] = useState<CmsReview[] | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'hidden'>('all');
  const [error, setError] = useState('');

  const load = () => api<CmsReview[]>('/cms/reviews').then(setReviews).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  const act = async (fn: () => Promise<unknown>) => {
    try {
      await fn();
      await Promise.all([load(), reload()]);
    } catch (e) {
      alert((e as Error).message);
    }
  };

  if (!reviews) return <PageState loading={!error} error={error || undefined} />;
  const rows = reviews.filter((r) => filter === 'all' || r.status === filter);

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-5">
        <select className={`${inputCls} !w-auto`} value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} aria-label="Filter reviews">
          <option value="all">All reviews ({reviews.length})</option>
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
        </select>
        <p className="text-sm text-gray-500">Reviews go live straight away. Hide anything abusive or fake.</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
        {rows.map((r) => (
          <div key={r.id} className={`p-4 flex flex-col sm:flex-row gap-4 ${r.status === 'hidden' ? 'bg-gray-50' : ''}`}>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Stars value={r.rating} size={14} />
                <span className="font-semibold text-sm text-gray-900">{r.author_name}</span>
                <span className="text-xs text-gray-400">{timeAgo(r.created_at)}</span>
                {r.status === 'hidden' && <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">Hidden</span>}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                for <span className="font-semibold text-gray-700">{r.seller_name}</span>{r.product_name && ` · ${r.product_name}`}
              </p>
              {r.comment && <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{r.comment}</p>}
            </div>
            <div className="flex gap-2 sm:flex-col">
              {r.status === 'published' ? (
                <Button variant="secondary" onClick={() => act(() => api(`/cms/reviews/${r.id}`, { method: 'PATCH', body: { status: 'hidden' } }))}><EyeOff size={14} /> Hide</Button>
              ) : (
                <Button variant="secondary" onClick={() => act(() => api(`/cms/reviews/${r.id}`, { method: 'PATCH', body: { status: 'published' } }))}><Eye size={14} /> Publish</Button>
              )}
              <Button variant="danger" onClick={() => confirm('Delete this review permanently?') && act(() => api(`/cms/reviews/${r.id}`, { method: 'DELETE' }))}><Trash2 size={14} /> Delete</Button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="p-8 text-center text-gray-500">No reviews here yet.</p>}
      </div>
    </div>
  );
};

export default ReviewsTab;
