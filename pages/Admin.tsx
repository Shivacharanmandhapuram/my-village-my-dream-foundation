import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, ListOrdered, MessageSquare, LogOut, ExternalLink, Lock, Loader2 } from 'lucide-react';
import { api, loadCatalog, type CmsCatalog } from '../lib/market';
import { PageState } from '../components/market/MarketUI';
import SellersTab from '../components/admin/SellersTab';
import ProductsTab from '../components/admin/ProductsTab';
import PriorityTab from '../components/admin/PriorityTab';
import ReviewsTab from '../components/admin/ReviewsTab';

// Sign-in: one shared password (set as the CMS_PASSWORD app setting) → session cookie for 30 days.

const TABS = [
  { id: 'villagers', label: 'Villagers', icon: Users },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'priority', label: 'Priority order', icon: ListOrdered },
  { id: 'reviews', label: 'Reviews', icon: MessageSquare },
] as const;
type TabId = (typeof TABS)[number]['id'];

const SignIn: React.FC<{ onSignedIn: () => void }> = ({ onSignedIn }) => {
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('/cms/login', { method: 'POST', body: { password } });
      onSignedIn();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-orange-50 p-8 max-w-sm w-full text-center shadow-sm">
        <div className="inline-flex p-3 rounded-full bg-orange-50 text-ngo-maroon mb-4"><Lock size={28} /></div>
        <h1 className="text-2xl font-bold text-gray-900">Village Market admin</h1>
        <p className="mt-2 text-gray-600 text-sm">Enter the admin password to manage villagers, products and reviews.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          placeholder="Password"
          aria-label="Admin password"
          className="mt-6 w-full px-4 py-3 rounded-xl border border-gray-200 text-center focus:border-ngo-orange focus:ring-2 focus:ring-orange-100 outline-none"
        />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          disabled={busy || !password}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ngo-maroon text-white font-bold hover:bg-red-900 disabled:opacity-50"
        >
          {busy && <Loader2 size={16} className="animate-spin" />} Sign in
        </button>
      </form>
    </div>
  );
};

const Admin: React.FC = () => {
  const [signedIn, setSignedIn] = useState<boolean | undefined>(undefined);
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
    api<{ admin: boolean }>('/cms/session')
      .then((d) => setSignedIn(d.admin))
      .catch(() => setSignedIn(false));
  }, []);

  useEffect(() => {
    if (signedIn) reload();
  }, [signedIn, reload]);

  const signOut = async () => {
    await api('/cms/logout', { method: 'POST' }).catch(() => {});
    setCatalog(null);
    setSignedIn(false);
  };

  if (signedIn === undefined) return <PageState loading />;
  if (!signedIn) return <SignIn onSignedIn={() => setSignedIn(true)} />;
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
              <button onClick={signOut} className="inline-flex items-center gap-1.5 font-semibold text-gray-600 hover:text-ngo-maroon"><LogOut size={15} /> Sign out</button>
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
