import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'motion/react';
import { useRef, useState } from 'react';
import { useCart } from '@/components/CartContext';
import { Helmet } from 'react-helmet-async';

const images = [
  '/19.jpeg', '/24.jpeg', '/25.jpeg', '/26.jpeg', 
  '/27.jpeg', '/28.jpeg', '/29.jpeg', '/30.jpeg',
  '/6.jpeg', '/7.jpeg'
];

// Helper to generate a mock product from an image URL
const getMockProduct = (src: string, index: number) => ({
  id: 1000 + index,
  name: `Lookbook Style ${index + 1}`,
  price: `$${(120 + index * 15).toFixed(2)}`,
  image: src,
  category: 'Campaign 01 Collection'
});

function LookbookImage({ src, index, onClick }: { src: string, index: number, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Stagger the parallax speed based on column index
  const yOffset = (index % 3 === 0) ? [-40, 40] : (index % 3 === 1) ? [-80, 80] : [-20, 20];
  const y = useTransform(scrollYProgress, [0, 1], yOffset);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.2 }}
      className="break-inside-avoid relative group overflow-hidden shadow-2xl border border-washed-blue/30 rounded-sm cursor-pointer"
      onClick={onClick}
    >
      <motion.div style={{ y }} className="relative w-full h-full scale-110 origin-center">
        <img 
          src={src} 
          alt={`Lookbook image ${index + 1}`} 
          className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      
      {/* Quick View Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-white/90 text-raw-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          Quick View
        </div>
      </div>
    </motion.div>
  );
}

function SwipeCard({ card, isTop, visualIndex, onSwipe, totalImages, customDirection, onClick }: any) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const handleDragEnd = (e: any, info: any) => {
    const threshold = 80;
    if (info.offset.x < -threshold) {
      onSwipe('forward');
    } else if (info.offset.x > threshold) {
      onSwipe('backward');
    }
  };

  const cardVariants: any = {
    exit: (dir: string) => ({
      x: dir === 'forward' ? -500 : 500,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    })
  };

  return (
    <motion.div
      custom={customDirection}
      variants={cardVariants}
      style={isTop ? { x, rotate } : {}}
      className="absolute w-[80%] max-w-sm aspect-[3/4] rounded-sm shadow-2xl border border-washed-blue/30 overflow-hidden bg-light-stone cursor-grab active:cursor-grabbing"
      initial={{ scale: 0.8, y: 40, opacity: 0 }}
      animate={{
        scale: 1 - visualIndex * 0.05,
        y: visualIndex * 20,
        opacity: 1 - visualIndex * 0.2,
        zIndex: isTop ? 10 : 1
      }}
      exit="exit"
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={isTop ? handleDragEnd : undefined}
      onClick={() => {
        // Only allow clicking if it's the top card and we haven't dragged it significantly
        if (isTop && Math.abs(x.get()) < 10) {
          onClick();
        }
      }}
    >
      <div className="relative w-full h-full">
        <img src={card.src} alt="Lookbook" className="w-full h-full object-cover pointer-events-none" />
      </div>
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      
      <div className="absolute top-4 right-4 bg-raw-black/70 backdrop-blur-sm text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono pointer-events-none border border-white/20">
        {card.originalIndex + 1}/{totalImages}
      </div>

      {isTop && (
        <>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-white/90 text-raw-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl backdrop-blur-sm">
              Tap to View
            </div>
          </div>
          <div className="absolute bottom-6 left-0 w-full flex justify-center gap-4 pointer-events-none">
            <div className="bg-raw-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs tracking-widest uppercase flex items-center gap-2">
              <span>&larr;</span> Next | Prev <span>&rarr;</span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

function MobileSwipeCards({ images, onProductClick }: { images: string[], onProductClick: (index: number) => void }) {
  const [cards, setCards] = useState(images.map((src, id) => ({ src, id: `${src}-${id}`, originalIndex: id })));
  const [exitDirection, setExitDirection] = useState<'forward' | 'backward'>('forward');

  const handleSwipe = (direction: 'forward' | 'backward') => {
    setExitDirection(direction);
    setCards((prev) => {
      const newCards = [...prev];
      if (direction === 'forward') {
        const first = newCards.shift();
        if (first) newCards.push({ ...first, id: `${first.src}-${Date.now()}-${Math.random()}` });
      } else {
        const last = newCards.pop();
        if (last) newCards.unshift({ ...last, id: `${last.src}-${Date.now()}-${Math.random()}` });
      }
      return newCards;
    });
  };

  return (
    <div className="relative w-full h-[65vh] flex items-center justify-center md:hidden overflow-hidden mt-8">
      <AnimatePresence custom={exitDirection}>
        {cards.slice(0, 3).reverse().map((card, index) => {
          const isTop = index === 2;
          const visualIndex = 2 - index;

          return (
            <SwipeCard
              key={card.id}
              card={card}
              isTop={isTop}
              visualIndex={visualIndex}
              onSwipe={handleSwipe}
              totalImages={images.length}
              customDirection={exitDirection}
              onClick={() => onProductClick(card.originalIndex)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default function Lookbook() {
  const { setSelectedProduct } = useCart();

  const handleProductClick = (index: number) => {
    const product = getMockProduct(images[index], index);
    setSelectedProduct(product);
  };

  return (
    <div className="w-full pt-20 bg-indigo-deep denim-texture min-h-screen text-off-white">
      <Helmet>
        <title>Lookbook | Motley Minds</title>
        <meta name="description" content="Campaign 01 / The Raw Edit. A visual exploration of texture, form, and the spaces in between." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4 text-shadow-sm">Lookbook</h1>
          <p className="text-washed-blue font-light tracking-wide uppercase text-sm">Campaign 01 / The Raw Edit</p>
        </div>

        {/* Mobile Swipe View */}
        <MobileSwipeCards images={images} onProductClick={handleProductClick} />

        {/* Desktop Grid View */}
        <div className="hidden md:block columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((src, index) => (
            <LookbookImage 
              key={index} 
              src={src} 
              index={index} 
              onClick={() => handleProductClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
