import { useCart } from './CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function ProductDetailPopup() {
  const { selectedProduct, setSelectedProduct, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('M');

  // Reset size when product changes
  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize('M');
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      {selectedProduct && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-raw-black/50 z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-off-white z-[101] shadow-2xl p-8 rounded-sm"
          >
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 p-2 hover:bg-light-stone rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full aspect-square object-cover rounded-sm" />
              <div className="flex flex-col justify-center">
                <h2 className="font-display text-3xl font-bold uppercase tracking-tighter mb-2">{selectedProduct.name}</h2>
                <p className="text-washed-blue mb-6">{selectedProduct.category}</p>
                <p className="text-2xl font-bold text-raw-black mb-6">{selectedProduct.price}</p>
                
                {/* Size Selector */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold uppercase tracking-widest text-raw-black">Size</span>
                    <button className="text-xs text-washed-blue underline hover:text-indigo-deep transition-colors">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-sm font-bold transition-colors border rounded-sm ${
                          selectedSize === size 
                            ? 'bg-raw-black text-white border-raw-black' 
                            : 'bg-transparent text-raw-black border-silver-rivet hover:border-raw-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    // In a real app, we'd pass the size to the cart item
                    addToCart({ ...selectedProduct, name: `${selectedProduct.name} - ${selectedSize}` });
                    setSelectedProduct(null);
                  }}
                  className="w-full py-4 bg-indigo-deep text-off-white font-bold uppercase tracking-widest hover:bg-washed-blue transition-colors rounded-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
