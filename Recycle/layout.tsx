import type {Metadata} from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import CartPopup from '@/components/CartPopup';
import ProductDetailPopup from '@/components/ProductDetailPopup';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Motley Minds | Premium Denim Fashion',
  description: 'Motley Minds is a creative denim fashion brand focusing on craftsmanship, identity, and style.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased bg-off-white text-raw-black selection:bg-indigo-deep selection:text-off-white flex flex-col min-h-screen" suppressHydrationWarning>
        <CartProvider>
          <SmoothScroll>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <CartPopup />
            <ProductDetailPopup />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
