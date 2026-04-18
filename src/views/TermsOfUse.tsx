import { Helmet } from 'react-helmet-async';

export default function TermsOfUse() {
  return (
    <div className="w-full pt-32 pb-24 bg-off-white denim-texture-light min-h-screen">
      <Helmet>
        <title>Terms of Use | Motley Minds</title>
      </Helmet>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tighter mb-8 text-raw-black">Terms of Use</h1>
        <div className="prose prose-indigo text-washed-blue space-y-6">
          <p>Last Updated: April 18, 2026</p>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-raw-black mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using motleyminds.com, you agree to be bound by these Terms of Use and all applicable laws and regulations.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-raw-black mb-2">2. Intellectual Property</h2>
            <p>All content on this site, including but not limited to text, graphics, logos, images, and software, is the property of Motley Minds and is protected by international copyright laws.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-raw-black mb-2">3. Product Descriptions</h2>
            <p>We attempt to be as accurate as possible with our product descriptions. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-raw-black mb-2">4. Limitation of Liability</h2>
            <p>Motley Minds shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
