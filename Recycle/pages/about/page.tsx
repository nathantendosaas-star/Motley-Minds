'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function About() {
  const craftRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const materialsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: craftProgress } = useScroll({
    target: craftRef,
    offset: ["start end", "end start"]
  });
  const craftY = useTransform(craftProgress, [0, 1], [-50, 50]);

  const { scrollYProgress: identityProgress } = useScroll({
    target: identityRef,
    offset: ["start end", "end start"]
  });
  const identityY = useTransform(identityProgress, [0, 1], [-50, 50]);

  const { scrollYProgress: materialsProgress } = useScroll({
    target: materialsRef,
    offset: ["start end", "end start"]
  });
  const materialsY = useTransform(materialsProgress, [0, 1], [-100, 100]);

  return (
    <div className="w-full pt-20 bg-off-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-bold text-raw-black uppercase tracking-tighter mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-washed-blue max-w-2xl mx-auto font-light"
          >
            Motley Minds is a creative denim fashion brand born from the desire to reconstruct the ordinary into the extraordinary. We believe in craftsmanship, identity, and the raw beauty of denim.
          </motion.p>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section ref={craftRef} className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] shadow-2xl border border-silver-rivet/30 rounded-sm overflow-hidden"
            >
              <motion.div style={{ y: craftY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <Image src="/10.jpeg" alt="Sewing Denim" fill className="object-cover rounded-sm" />
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-raw-black uppercase tracking-tight mb-6">The Craft</h2>
              <p className="text-washed-blue text-lg font-light leading-relaxed mb-6">
                Every stitch is intentional. We source high-quality raw denim and meticulously construct each piece by hand. Our process is a blend of traditional tailoring and avant-garde streetwear design.
              </p>
              <p className="text-washed-blue text-lg font-light leading-relaxed">
                We don&apos;t just make clothes; we build them. The texture, the weight, the way the fabric fades over time—these are the details that make a Motley Minds piece unique to its wearer.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Identity Section */}
      <section ref={identityRef} className="py-24 bg-indigo-deep text-off-white denim-texture relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-col-reverse md:flex-row-reverse">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] shadow-2xl border-4 border-washed-blue/30 rounded-sm overflow-hidden"
            >
              <motion.div style={{ y: identityY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <Image src="/4.jpeg" alt="Creative Identity" fill className="object-cover rounded-sm" />
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6">Originality & Identity</h2>
              <p className="text-light-stone text-lg font-light leading-relaxed mb-6">
                Motley Minds is for those who think differently. Our designs are inspired by the chaos of modern culture, distilled into clean, striking silhouettes. We embrace the raw, the unfinished, and the imperfect.
              </p>
              <p className="text-light-stone text-lg font-light leading-relaxed">
                Fashion is a language, and we speak in indigo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section ref={materialsRef} className="py-24 bg-off-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-raw-black uppercase tracking-tight mb-12">Raw Materials</h2>
          <div className="relative w-full max-w-4xl mx-auto aspect-[21/9] shadow-xl overflow-hidden border border-silver-rivet/30 rounded-sm">
            <motion.div style={{ y: materialsY }} className="absolute inset-[-20%] w-[140%] h-[140%]">
              <Image src="/3.jpeg" alt="Rolled Denim Fabric" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
