import { useCart } from './CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag } from 'lucide-react';

export default function CartPopup() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-raw-black/50 z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-off-white z-[101] shadow-2xl p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tighter">Shopping Bag</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-light-stone rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-washed-blue">
                <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                <p>Your bag is empty.</p>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b border-light-stone pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm" />
                    <div className="flex-grow">
                      <h3 className="font-bold text-raw-black">{item.name}</h3>
                      <p className="text-sm text-washed-blue">{item.price} x {item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-raw-black hover:text-indigo-deep">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="pt-6 border-t border-light-stone">
              <button className="w-full py-4 bg-indigo-deep text-off-white font-bold uppercase tracking-widest hover:bg-washed-blue transition-colors rounded-md">
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
