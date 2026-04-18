import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Helmet } from 'react-helmet-async';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lookbookRef = useRef<HTMLDivElement>(null);
  const lookbookTextRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  });
  const storyImageY = useTransform(storyProgress, [0, 1], [-50, 50]);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: lookbookRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: lookbookTextRef.current,
        pinSpacing: false,
      });

      // Animate the lookbook images with GSAP
      const images = gsap.utils.toArray('.lookbook-image');
      images.forEach((img: any, i) => {
        gsap.fromTo(img, 
          { 
            opacity: 0, 
            y: 100, 
            scale: 0.9,
            rotation: i % 2 === 0 ? -5 : 5
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );
      });
    });

    // Mobile animations
    mm.add("(max-width: 767px)", () => {
      const images = gsap.utils.toArray('.lookbook-image');
      images.forEach((img: any) => {
        gsap.fromTo(img, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });
  }, { scope: lookbookRef });

  return (
    <div className="w-full">
      <Helmet>
        <title>Motley Minds | Premium Denim Fashion</title>
        <meta name="description" content="Motley Minds is a creative denim fashion brand focusing on craftsmanship, identity, and style." />
      </Helmet>
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full flex flex-col lg:flex-row items-center justify-center overflow-hidden">
        {/* Split Background */}
        <div className="absolute inset-0 flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-white relative">
            <div className="absolute inset-0 opacity-20 denim-pattern pointer-events-none"></div>
          </div>
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-washed-blue relative">
            <div className="absolute inset-0 opacity-40 denim-pattern pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/40 to-transparent pointer-events-none"></div>
          </div>
        </div>
        
        {/* Huge Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <h1 className="font-display text-[18vw] lg:text-[9vw] font-bold tracking-tighter uppercase whitespace-nowrap flex flex-col lg:flex-row w-full items-center justify-center leading-none">
            <span className="lg:w-1/2 text-center lg:text-right text-raw-black lg:pr-4 drop-shadow-sm">MOTLEY</span>
            <span className="lg:w-1/2 text-center lg:text-left text-white lg:pl-4 drop-shadow-md">MINDS</span>
          </h1>
        </div>

        {/* Center Model Image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[60vh] lg:h-[85vh] z-10 pointer-events-none drop-shadow-2xl">
          <img 
            src="/12.jpeg" 
            alt="Model" 
            className="h-full w-auto object-cover object-top"
            loading="eager"
          />
        </div>

        {/* Left Content */}
        <div className="absolute left-0 top-0 w-full lg:w-1/2 h-auto lg:h-full flex flex-col justify-start lg:justify-center px-6 lg:px-12 xl:px-24 z-20 pt-28 lg:pt-0">
          <div className="max-w-md text-center lg:text-left mx-auto lg:mx-0 bg-white/50 lg:bg-transparent p-4 lg:p-0 rounded-lg backdrop-blur-sm lg:backdrop-blur-none flex flex-col items-center lg:items-start gap-4">
            <Link to="/shop" className="inline-block bg-indigo-deep text-off-white px-8 py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest hover:bg-indigo-deep/90 transition-colors relative group rounded-sm shadow-lg w-full lg:w-auto text-center">
              <span className="absolute inset-1 border border-dashed border-off-white/40 group-hover:border-off-white/70 pointer-events-none rounded-[2px] transition-colors"></span>
              Shop Now
            </Link>
            <Link to="/lookbook" className="inline-block bg-transparent border border-raw-black text-raw-black px-8 py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest hover:bg-raw-black hover:text-white transition-colors relative group rounded-sm w-full lg:w-auto shadow-lg backdrop-blur-sm text-center">
              <span className="absolute inset-1 border border-dashed border-raw-black/40 group-hover:border-white/40 pointer-events-none rounded-[2px] transition-colors"></span>
              View Lookbook
            </Link>
          </div>
        </div>

        {/* Floating Product Card 1 (Left) */}
        <div className="hidden lg:flex absolute left-[5%] xl:left-[10%] top-[30%] z-20 bg-white p-4 shadow-xl items-center gap-4 rounded-sm origin-left">
          <div className="w-16 h-16 relative bg-light-stone/20">
            <img src="/8.jpeg" alt="Jacket" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-raw-black">Cropped Denim Jacket</p>
            <p className="text-[10px] text-raw-black/60 mb-1">€ 899 EUR</p>
            <div className="flex text-raw-black text-[8px]">★★★★★</div>
          </div>
          <button className="w-6 h-6 rounded-full bg-raw-black text-white flex items-center justify-center ml-2">
            +
          </button>
        </div>

        {/* Floating Product Card 2 (Right) */}
        <div className="hidden lg:flex absolute right-[5%] xl:right-[15%] top-[25%] z-20 bg-white/10 backdrop-blur-md p-4 shadow-xl items-center gap-4 rounded-sm border border-white/20 origin-right">
          <div className="w-16 h-16 relative bg-white">
            <img src="/2.jpeg" alt="Top" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white">Ribbed Top</p>
            <p className="text-[10px] text-white/80 mb-1">€ 49 EUR</p>
            <div className="flex text-white text-[8px]">★★★★★</div>
          </div>
          <button className="w-6 h-6 rounded-full bg-white text-raw-black flex items-center justify-center ml-2">
            +
          </button>
        </div>

        {/* Floating Product Card 3 (Right Bottom) */}
        <div className="hidden lg:flex absolute right-[20%] xl:right-[30%] bottom-[20%] z-20 bg-white/10 backdrop-blur-md p-4 shadow-xl items-center gap-4 rounded-sm border border-white/20 origin-right">
          <div className="w-16 h-16 relative bg-white">
            <img src="/14.jpeg" alt="Skirt" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white">Crossover Skirt</p>
            <p className="text-[10px] text-white/80 mb-1">€ 199 EUR</p>
            <div className="flex text-white text-[8px]">★★★★★</div>
          </div>
          <button className="w-6 h-6 rounded-full bg-white text-raw-black flex items-center justify-center ml-2">
            +
          </button>
        </div>

        {/* Bottom Right Carousel Preview */}
        <div className="hidden lg:flex absolute right-0 bottom-0 w-1/3 h-[30vh] gap-4 p-8 z-20 items-end justify-end">
          <div className="flex gap-2 absolute top-4 right-8">
            <button className="w-6 h-6 rounded-full border border-white/50 text-white flex items-center justify-center text-xs hover:bg-white hover:text-raw-black transition-colors">&lt;</button>
            <button className="w-6 h-6 rounded-full border border-white/50 text-white flex items-center justify-center text-xs hover:bg-white hover:text-raw-black transition-colors">&gt;</button>
          </div>
          <div className="w-32 h-40 bg-white p-2 shadow-lg">
            <div className="relative w-full h-full">
              <img src="/13.jpeg" alt="Model" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-32 h-40 bg-white p-2 shadow-lg">
            <div className="relative w-full h-full">
              <img src="/17.jpeg" alt="Model" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-off-white denim-texture-light relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-silver-rivet to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-raw-black uppercase tracking-tight">Signature<br/>Pieces</h2>
            <Link to="/shop" className="text-sm font-bold uppercase tracking-widest text-indigo-deep hover:text-washed-blue pb-1 border-b border-dashed border-faded-stitch">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-light-stone mb-4 shadow-md border border-silver-rivet/30 rounded-sm">
                <img src="/8.jpeg" alt="Denim Jackets" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-raw-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-raw-black">Jackets</h3>
              <p className="text-denim-midtone text-sm mt-1">Structured & Raw</p>
            </motion.div>

            {/* Category 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-light-stone mb-4 shadow-md border border-silver-rivet/30 rounded-sm">
                <img src="/1.jpeg" alt="Tote Bags" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-raw-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-raw-black">Accessories</h3>
              <p className="text-denim-midtone text-sm mt-1">Everyday Utility</p>
            </motion.div>

            {/* Category 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer md:hidden lg:block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-light-stone mb-4 shadow-md border border-silver-rivet/30 rounded-sm">
                <img src="/17.jpeg" alt="Crossbody Bags" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-raw-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-raw-black">Crossbody</h3>
              <p className="text-denim-midtone text-sm mt-1">Street Ready</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section ref={storyRef} className="py-24 bg-indigo-deep text-off-white denim-texture relative overflow-hidden shadow-inner">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-deep via-washed-blue to-indigo-deep opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-deep via-washed-blue to-indigo-deep opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative aspect-square md:aspect-[4/5] shadow-2xl overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 border-2 border-dashed border-washed-blue/50 translate-x-4 translate-y-4 rounded-sm z-20 pointer-events-none" />
            <motion.div style={{ y: storyImageY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
              <img src="/4.jpeg" alt="Craftsmanship" className="w-full h-full object-cover z-10 relative border-4 border-raw-black rounded-sm" />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6 text-shadow-sm">The Art of<br/>Deconstruction</h2>
            <p className="text-light-stone text-lg font-light leading-relaxed mb-8">
              Every piece tells a story of reinvention. We take raw, rugged denim and reconstruct it into modern silhouettes that challenge traditional fashion norms. Motley Minds is not just clothing; it&apos;s a canvas for expression.
            </p>
            <Link to="/about" className="inline-block bg-transparent border border-off-white text-off-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-off-white hover:text-indigo-deep transition-colors relative group rounded-md">
              <span className="absolute inset-1 border border-dashed border-off-white/40 group-hover:border-indigo-deep/40 pointer-events-none transition-colors rounded-[4px]"></span>
              Read Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lookbook Teaser - GSAP Pinned Section */}
      <section ref={lookbookRef} className="py-24 bg-off-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-silver-rivet to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            
            {/* Pinned Left Side */}
            <div className="w-full md:w-1/3">
              <div ref={lookbookTextRef} className="md:h-screen flex flex-col justify-center">
                <h2 className="font-display text-4xl md:text-6xl font-bold text-raw-black uppercase tracking-tight mb-6">Campaign 01</h2>
                <p className="text-washed-blue text-lg font-light mb-10">The Raw Edit. A visual exploration of texture, form, and the spaces in between.</p>
                <div>
                  <Link to="/lookbook" className="inline-block bg-indigo-deep text-off-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-raw-black transition-colors shadow-md relative group rounded-md">
                    <span className="absolute inset-1 border border-dashed border-off-white/30 pointer-events-none rounded-[4px]"></span>
                    View Full Lookbook
                  </Link>
                </div>
              </div>
            </div>

            {/* Scrolling Right Side */}
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 md:pt-[20vh] md:pb-[20vh]">
              <div className="lookbook-image relative aspect-[3/4] overflow-hidden bg-light-stone border border-silver-rivet/30 shadow-lg rounded-sm">
                <img src="/25.jpeg" alt="Lookbook 1" className="w-full h-full object-cover" />
              </div>
              <div className="lookbook-image relative aspect-[3/4] overflow-hidden bg-light-stone border border-silver-rivet/30 shadow-lg rounded-sm sm:mt-24">
                <img src="/19.jpeg" alt="Lookbook 2" className="w-full h-full object-cover" />
              </div>
              <div className="lookbook-image relative aspect-[3/4] overflow-hidden bg-light-stone border border-silver-rivet/30 shadow-lg rounded-sm">
                <img src="/24.jpeg" alt="Lookbook 3" className="w-full h-full object-cover" />
              </div>
              <div className="lookbook-image relative aspect-[3/4] overflow-hidden bg-light-stone border border-silver-rivet/30 shadow-lg rounded-sm sm:mt-24">
                <img src="/28.jpeg" alt="Lookbook 4" className="w-full h-full object-cover" />
              </div>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
