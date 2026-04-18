import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <div className="w-full pt-32 pb-24 bg-off-white denim-texture-light min-h-screen">
      <Helmet>
        <title>Privacy Policy | Motley Minds</title>
      </Helmet>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tighter mb-8 text-raw-black">Privacy Policy</h1>
        <div className="prose prose-indigo text-washed-blue space-y-6">
          <p>Last Updated: April 18, 2026</p>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-raw-black mb-2">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you make a purchase, sign up for our newsletter, or contact us for support. This may include your name, email address, shipping address, and payment information.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-raw-black mb-2">2. How We Use Your Information</h2>
            <p>We use the information we collect to process your orders, communicate with you about your purchase, send you promotional materials (if you've opted in), and improve our services.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-raw-black mb-2">3. Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. Your sensitive credit card information is encrypted and transmitted via Secure Socket Layer (SSL) technology.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-raw-black mb-2">4. Third-Party Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except for those trusted third parties who assist us in operating our website and conducting our business.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
