'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { useCart } from '@/components/CartContext';

const products = [
  { id: 1, name: 'Patchwork Denim Jacket', price: '$280', image: '/8.jpeg', category: 'Jackets' },
  { id: 2, name: 'Structured Tote Bag', price: '$120', image: '/1.jpeg', category: 'Accessories' },
  { id: 3, name: 'Utility Crossbody', price: '$95', image: '/17.jpeg', category: 'Accessories' },
  { id: 4, name: 'Raw Indigo Jacket', price: '$250', image: '/12.jpeg', category: 'Jackets' },
  { id: 5, name: 'Deconstructed Jacket', price: '$310', image: '/13.jpeg', category: 'Jackets' },
  { id: 6, name: 'Panel Denim Jacket', price: '$290', image: '/14.jpeg', category: 'Jackets' },
  { id: 7, name: 'Everyday Denim Tote', price: '$110', image: '/2.jpeg', category: 'Accessories' },
  { id: 8, name: 'Mini Crossbody Pouch', price: '$75', image: '/0.jpeg', category: 'Accessories' },
];

function ProductCard({ product, index }: { product: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const { setSelectedProduct, addToCart } = useCart();

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group cursor-pointer relative"
      onClick={() => setSelectedProduct(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-light-stone mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300 border border-silver-rivet/30 rounded-sm">
        <motion.div style={{ y: imageY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-sm" 
          />
        </motion.div>
        <div className="absolute inset-0 bg-raw-black/5 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-off-white/90 backdrop-blur-sm border-t border-dashed border-silver-rivet">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full py-3 text-sm font-bold uppercase tracking-widest text-indigo-deep border border-indigo-deep hover:bg-indigo-deep hover:text-off-white transition-colors relative rounded-md"
          >
            <span className="absolute inset-1 border border-dashed border-indigo-deep/30 pointer-events-none rounded-[4px]"></span>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-display text-lg font-bold text-raw-black leading-tight">{product.name}</h3>
          <p className="text-washed-blue text-xs uppercase tracking-wider mt-1">{product.category}</p>
        </div>
        <span className="font-sans font-medium text-raw-black">{product.price}</span>
      </div>
    </motion.div>
  );
}

export default function Shop() {
  const [filter, setFilter] = useState('All');

  const filteredProducts = products.filter(product => 
    filter === 'All' ? true : product.category === filter
  );

  return (
    <div className="w-full pt-20 bg-off-white denim-texture-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-dashed border-silver-rivet/50 pb-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-raw-black uppercase tracking-tighter mb-2">Collections</h1>
            <p className="text-washed-blue font-light">Premium denim pieces, crafted for the modern mind.</p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-6">
            <button 
              onClick={() => setFilter('All')}
              className={`text-sm font-bold uppercase tracking-widest pb-1 transition-colors ${filter === 'All' ? 'text-indigo-deep border-b-2 border-indigo-deep' : 'text-faded-stitch hover:text-indigo-deep'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('Jackets')}
              className={`text-sm font-bold uppercase tracking-widest pb-1 transition-colors ${filter === 'Jackets' ? 'text-indigo-deep border-b-2 border-indigo-deep' : 'text-faded-stitch hover:text-indigo-deep'}`}
            >
              Jackets
            </button>
            <button 
              onClick={() => setFilter('Accessories')}
              className={`text-sm font-bold uppercase tracking-widest pb-1 transition-colors ${filter === 'Accessories' ? 'text-indigo-deep border-b-2 border-indigo-deep' : 'text-faded-stitch hover:text-indigo-deep'}`}
            >
              Accessories
            </button>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
