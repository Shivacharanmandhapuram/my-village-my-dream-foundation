// Village Market — types, API client and display helpers shared by the market pages and the CMS.

export interface Category { id: string; name_en: string; name_mr: string; emoji: string; sort: number; active: boolean }
export interface Product {
  id: string; category_id: string; name_en: string; name_mr: string; emoji: string;
  image_url: string | null; description: string; sort: number; active: boolean;
}
export interface Seller {
  id: string; name_en: string; name_mr: string; phones: string[]; village: string; about: string;
  photo_url: string | null; featured: boolean; active: boolean;
}
export interface Listing { seller_id: string; product_id: string; position: number; active: boolean }
export interface Rating { avg: number; count: number }
export interface Catalog {
  categories: Category[]; products: Product[]; sellers: Seller[]; listings: Listing[];
  ratings: Record<string, Rating>;
}
export interface CmsCatalog extends Catalog { hiddenReviews: Record<string, number> }
export interface Review {
  id: number; seller_id: string; product_id: string | null; rating: number;
  author_name: string; comment: string; created_at: string;
}
export interface CmsReview extends Review { status: 'published' | 'hidden'; seller_name: string; product_name: string | null }

export async function api<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: init?.method ?? 'GET',
    headers: init?.body !== undefined ? { 'content-type': 'application/json' } : undefined,
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
  return data as T;
}

// The public catalog is loaded once per page view and shared between market pages.
let catalogCache: Promise<Catalog> | null = null;
export const loadCatalog = (fresh = false) => {
  if (fresh || !catalogCache) catalogCache = api<Catalog>('/market/catalog').catch((e) => { catalogCache = null; throw e; });
  return catalogCache;
};

/** Villagers selling a product, in display order: featured first, then the CMS-set position. */
export function sellersFor(catalog: Pick<Catalog, 'listings' | 'sellers'>, productId: string): Seller[] {
  const byId = new Map(catalog.sellers.map((s) => [s.id, s]));
  return catalog.listings
    .filter((l) => l.product_id === productId && l.active)
    .map((l) => ({ l, s: byId.get(l.seller_id) }))
    .filter((x): x is { l: Listing; s: Seller } => !!x.s && x.s.active)
    .sort((a, b) => Number(b.s.featured) - Number(a.s.featured) || a.l.position - b.l.position)
    .map((x) => x.s);
}

export function productsFor(catalog: Pick<Catalog, 'listings' | 'products'>, sellerId: string): Product[] {
  const ids = new Set(catalog.listings.filter((l) => l.seller_id === sellerId && l.active).map((l) => l.product_id));
  return catalog.products.filter((p) => ids.has(p.id) && p.active);
}

export const formatPhone = (p: string) => (p.length === 10 ? `${p.slice(0, 5)} ${p.slice(5)}` : p);
export const telLink = (p: string) => `tel:+91${p}`;
export function whatsappLink(phone: string, sellerName: string, productName?: string) {
  const msg = `Namaste ${sellerName} ji, I found you on the My Village My Dream Village Market.` +
    (productName ? ` I would like to buy ${productName}.` : '');
  return `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;
}

/** Warm tile colours for products without a photo, picked per category. */
const TILE_COLORS: Record<string, string> = {
  'dairy-products': 'from-sky-50 to-blue-100',
  'grains-pulses-and-staples': 'from-amber-50 to-amber-100',
  'fresh-produce': 'from-lime-50 to-green-100',
  'home-made-foods-and-spices': 'from-orange-50 to-red-100',
  'clothing-tailoring-and-crafts': 'from-pink-50 to-rose-100',
  services: 'from-slate-50 to-slate-200',
};
export const tileColor = (categoryId: string) => TILE_COLORS[categoryId] ?? 'from-orange-50 to-amber-100';

export const timeAgo = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return 'today';
  if (days < 2) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};
