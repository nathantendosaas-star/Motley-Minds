'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { Mail, MapPin, Instagram, Twitter } from 'lucide-react';
import { useRef } from 'react';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div ref={containerRef} className="w-full pt-20 bg-off-white min-h-screen relative overflow-hidden">
      {/* Subtle Parallax Background Element */}
      <motion.div 
        style={{ y: bgY }} 
        className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none z-0"
      >
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-indigo-deep blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-washed-blue blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-raw-black uppercase tracking-tighter mb-6">Get in Touch</h1>
            <p className="text-washed-blue font-light text-lg mb-12 max-w-md">
              Whether you have a question about our collections, sizing, or just want to say hello, we&apos;d love to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-indigo-deep mt-1" />
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-raw-black">Email</h3>
                  <p className="text-washed-blue mt-1">hello@motleyminds.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-indigo-deep mt-1" />
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-raw-black">Studio</h3>
                  <p className="text-washed-blue mt-1">123 Denim District<br/>Fashion City, FC 10001</p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="font-bold uppercase tracking-widest text-sm text-raw-black mb-4 stitch-border inline-block pb-1 border-t-0 border-l-0 border-r-0">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="#" className="text-washed-blue hover:text-indigo-deep transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-washed-blue hover:text-indigo-deep transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 md:p-12 shadow-xl border border-silver-rivet/30 relative rounded-sm"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-deep/5 denim-texture-light" />
            
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-widest text-denim-midtone mb-2">First Name</label>
                  <input type="text" id="firstName" className="w-full border-b border-silver-rivet py-2 bg-transparent focus:outline-none focus:border-indigo-deep transition-colors" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-widest text-denim-midtone mb-2">Last Name</label>
                  <input type="text" id="lastName" className="w-full border-b border-silver-rivet py-2 bg-transparent focus:outline-none focus:border-indigo-deep transition-colors" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-denim-midtone mb-2">Email Address</label>
                <input type="email" id="email" className="w-full border-b border-silver-rivet py-2 bg-transparent focus:outline-none focus:border-indigo-deep transition-colors" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-denim-midtone mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full border-b border-silver-rivet py-2 bg-transparent focus:outline-none focus:border-indigo-deep transition-colors resize-none"></textarea>
              </div>
              
              <button type="button" className="w-full bg-indigo-deep text-off-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-raw-black transition-colors shadow-md mt-4 rounded-md">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
