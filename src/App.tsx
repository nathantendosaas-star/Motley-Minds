import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import CartPopup from '@/components/CartPopup';
import ProductDetailPopup from '@/components/ProductDetailPopup';
import { CartProvider } from '@/components/CartContext';

// Views
import Home from '@/views/Home';
import Shop from '@/views/Shop';
import About from '@/views/About';
import Lookbook from '@/views/Lookbook';
import Contact from '@/views/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Disable browser's automatic scroll restoration to prevent jumping
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <SmoothScroll>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/lookbook" element={<Lookbook />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <CartPopup />
          <ProductDetailPopup />
        </div>
      </SmoothScroll>
    </CartProvider>
  );
}
