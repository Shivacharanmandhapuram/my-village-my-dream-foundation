import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contribute from './pages/Contribute';
import Volunteer from './pages/Volunteer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Market from './pages/Market';
import MarketProduct from './pages/MarketProduct';
import MarketSeller from './pages/MarketSeller';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-ngo-beige">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/market" element={<Market />} />
            <Route path="/market/villager/:sellerId" element={<MarketSeller />} />
            <Route path="/market/:productId" element={<MarketProduct />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
