import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, ListOrdered, MessageSquare, LogOut, ExternalLink, Lock } from 'lucide-react';
import { api, loadCatalog, type CmsCatalog } from '../lib/market';
import { PageState } from '../components/market/MarketUI';
import SellersTab from '../components/admin/SellersTab';
import ProductsTab from '../components/admin/ProductsTab';
import PriorityTab from '../components/admin/PriorityTab';
import ReviewsTab from '../components/admin/ReviewsTab';

// Sign-in is handled by Azure Static Web Apps. Admins are invited with the "admin" role.
interface Principal { userDetails: string; userRoles: string[] }

const TABS = [
  { id: 'villagers', label: 'Villagers', icon: Users },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'priority', label: 'Priority order', icon: ListOrdered },
  { id: 'reviews', label: 'Reviews', icon: MessageSquare },
] as const;
type TabId = (typeof TABS)[number]['id'];

const SignIn: React.FC<{ principal: Principal | null }> = ({ principal }) => (
  <div className="min-h-[70vh] flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl border border-orange-50 p-8 max-w-md w-full text-center shadow-sm">
      <div className="inline-flex p-3 rounded-full bg-orange-50 text-ngo-maroon mb-4"><Lock size={28} /></div>
      <h1 className="text-2xl font-bold text-gray-900">Village Market admin</h1>
      {principal ? (
        <>
          <p className="mt-3 text-gray-600 text-sm">
            You're signed in as <span className="font-semibold">{principal.userDetails}</span>, but this account hasn't been given admin access.
            Ask the site owner to invite you.
          </p>
          <a href="/.auth/logout?post_logout_redirect_uri=/admin" className="mt-6 inline-block text-sm font-bold text-ngo-maroon hover:underline">Sign in with a different account</a>
        </>
      ) : (
        <>
          <p className="mt-3 text-gray-600 text-sm">Sign in to add villagers, manage products and moderate reviews.</p>
          <div className="mt-6 flex flex-col gap-3">
            <a href="/.auth/login/aad?post_login_redirect_uri=/admin" className="px-5 py-3 rounded-full bg-ngo-maroon text-white font-bold hover:bg-red-900">Sign in with Microsoft</a>
            <a href="/.auth/login/github?post_login_redirect_uri=/admin" className="px-5 py-3 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-50">Sign in with GitHub</a>
          </div>
        </>
      )}
    </div>
  </div>
);

const Admin: React.FC = () => {
  const [principal, setPrincipal] = useState<Principal | null | undefined>(undefined);
  const [catalog, setCatalog] = useState<CmsCatalog | null>(null);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<TabId>('villagers');

  const reload = useCallback(async () => {
    try {
      setCatalog(await api<CmsCatalog>('/cms/catalog'));
      loadCatalog(true).catch(() => {}); // keep the public pages in sync within this session
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  useEffect(() => {
    fetch('/.auth/me')
      .then((r) => r.json())
      .then((d) => setPrincipal(d.clientPrincipal ?? null))
      .catch(() => setPrincipal(null));
  }, []);

  const isAdmin = !!principal?.userRoles.includes('admin');
  useEffect(() => {
    if (isAdmin) reload();
  }, [isAdmin, reload]);

  if (principal === undefined) return <PageState loading />;
  if (!isAdmin) return <SignIn principal={principal} />;
  if (!catalog) return <PageState loading={!error} error={error || undefined} />;

  const listed = catalog.sellers.filter((s) => s.active).length;

  return (
    <div className="bg-ngo-beige min-h-screen pb-16">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Village Market admin</h1>
              <p className="text-sm text-gray-500 mt-1">
                {listed} listed villagers · {catalog.products.length} products · {catalog.categories.length} categories
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/market" className="inline-flex items-center gap-1.5 font-semibold text-gray-600 hover:text-ngo-maroon"><ExternalLink size={15} /> View market</Link>
              <span className="text-gray-400 hidden sm:inline">{principal!.userDetails}</span>
              <a href="/.auth/logout?post_logout_redirect_uri=/" className="inline-flex items-center gap-1.5 font-semibold text-gray-600 hover:text-ngo-maroon"><LogOut size={15} /> Sign out</a>
            </div>
          </div>
          <nav className="mt-6 flex gap-1 overflow-x-auto" aria-label="Admin sections">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                  tab === id ? 'border-ngo-maroon text-ngo-maroon' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {tab === 'villagers' && <SellersTab catalog={catalog} reload={reload} />}
        {tab === 'products' && <ProductsTab catalog={catalog} reload={reload} />}
        {tab === 'priority' && <PriorityTab catalog={catalog} reload={reload} />}
        {tab === 'reviews' && <ReviewsTab reload={reload} />}
      </div>
    </div>
  );
};

export default Admin;
