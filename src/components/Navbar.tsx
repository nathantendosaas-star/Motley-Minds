import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from './CartContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, cart } = useCart();
  const location = useLocation();
  const pathname = location.pathname;
  const isHome = pathname === '/';

  // On home page, we use the split colors (black left, white right).
  // On other pages, we use a solid color based on the background.
  // Lookbook is dark, others are light.
  const isDarkBg = pathname === '/lookbook';
  
  const leftTextColor = isHome ? 'text-raw-black' : (isDarkBg ? 'text-white' : 'text-raw-black');
  const rightTextColor = isHome ? 'text-white' : (isDarkBg ? 'text-white' : 'text-raw-black');
  const logoLeftColor = isHome ? 'text-raw-black' : (isDarkBg ? 'text-white' : 'text-raw-black');
  const logoRightColor = isHome ? 'lg:text-white text-raw-black' : (isDarkBg ? 'text-white' : 'text-raw-black');
  const navBg = isHome ? 'bg-transparent' : (isDarkBg ? 'bg-raw-black/90 backdrop-blur-md' : 'bg-off-white/90 backdrop-blur-md border-b border-light-stone');

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBg}`}>
      <div className="w-full px-8 lg:px-16">
        <div className="flex justify-between items-center h-24 relative">
          
          {/* Left Navigation */}
          <nav className={`hidden lg:flex space-x-8 w-1/3 ${leftTextColor}`}>
            <Link to="/" className="text-xs font-bold hover:opacity-70 transition-opacity uppercase tracking-widest">
              Home
            </Link>
            <Link to="/shop" className="text-xs font-bold hover:opacity-70 transition-opacity uppercase tracking-widest">
              Shop
            </Link>
          </nav>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex font-display text-2xl font-bold tracking-widest uppercase z-10 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full shadow-sm border border-white/20">
            <Link to="/" className="flex">
              <span className={`${logoLeftColor} pr-[1px]`}>MOT</span>
              <span className={`${logoRightColor} pl-[1px]`}>LEY</span>
            </Link>
          </div>
          
          {/* Right Navigation & Icons */}
          <div className={`hidden lg:flex items-center justify-end space-x-8 w-1/3 ${rightTextColor}`}>
            <nav className="flex space-x-8">
              <Link to="/lookbook" className="text-xs font-bold hover:opacity-70 transition-opacity uppercase tracking-widest">
                Lookbook
              </Link>
              <Link to="/about" className="text-xs font-bold hover:opacity-70 transition-opacity uppercase tracking-widest">
                About
              </Link>
            </nav>
            
            <div className="flex items-center space-x-6">
              <button className="hover:opacity-70 transition-opacity">
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="hover:opacity-70 transition-opacity relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className={`absolute -top-2 -right-2 ${isHome || isDarkBg ? 'bg-white text-raw-black' : 'bg-raw-black text-white'} text-[10px] w-4 h-4 rounded-full flex items-center justify-center`}>
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center justify-end w-full">
             <button 
              className="hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className={`w-6 h-6 ${isHome ? 'text-white' : rightTextColor}`} /> : <Menu className={`w-6 h-6 ${isHome ? 'text-raw-black' : rightTextColor}`} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-raw-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white uppercase tracking-widest py-3 border-b border-white/10">Home</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white uppercase tracking-widest py-3 border-b border-white/10">Shop</Link>
              <Link to="/lookbook" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white uppercase tracking-widest py-3 border-b border-white/10">Lookbook</Link>
              <button onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }} className="text-lg font-bold text-white uppercase tracking-widest py-3 text-left border-b border-white/10">Bag ({cart.length})</button>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white uppercase tracking-widest py-3">About</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
