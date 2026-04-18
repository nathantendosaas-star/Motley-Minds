import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-indigo-deep text-light-stone py-16 denim-texture border-t-4 border-washed-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-display text-3xl font-bold tracking-tighter text-off-white uppercase mb-4 block">
              Motley Minds
            </Link>
            <p className="text-faded-stitch max-w-sm mt-4 font-light leading-relaxed">
              A premium denim-focused fashion brand blending raw fabric, stitched texture, and modern streetwear culture.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-off-white uppercase tracking-widest mb-4 stitch-border-light inline-block pb-1 border-t-0 border-l-0 border-r-0">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/shop" className="hover:text-off-white transition-colors text-sm">Shop Collections</Link></li>
              <li><Link to="/lookbook" className="hover:text-off-white transition-colors text-sm">Lookbook</Link></li>
              <li><Link to="/about" className="hover:text-off-white transition-colors text-sm">Brand Story</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-off-white uppercase tracking-widest mb-4 stitch-border-light inline-block pb-1 border-t-0 border-l-0 border-r-0">Connect</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="hover:text-off-white transition-colors text-sm">Contact Us</Link></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-off-white transition-colors text-sm">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-off-white transition-colors text-sm">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-washed-blue/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-faded-stitch">&copy; {new Date().getFullYear()} Motley Minds. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-xs text-faded-stitch hover:text-off-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-faded-stitch hover:text-off-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
