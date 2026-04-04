export default function Home() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Free Trade Warehousing Zone in India</h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">Welcome to Astromar Free Zone</p>
          <a href="#services" className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold">View Services</a>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-lg"><h3 className="text-2xl font-bold mb-4">📦 Warehousing</h3><p>Duty-free solutions</p></div>
            <div className="bg-blue-50 p-8 rounded-lg"><h3 className="text-2xl font-bold mb-4">✈️ Logistics</h3><p>Global shipping</p></div>
            <div className="bg-blue-50 p-8 rounded-lg"><h3 className="text-2xl font-bold mb-4">📊 Consolidation</h3><p>Bulk solutions</p></div>
            <div className="bg-blue-50 p-8 rounded-lg"><h3 className="text-2xl font-bold mb-4">✅ Customs</h3><p>Expert clearing</p></div>
          </div>
        </div>
      </section>

      <section className="bg-blue-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Capacity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-5xl font-bold">2</div><p>Locations</p></div>
            <div><div className="text-5xl font-bold">1L</div><p>Sqft</p></div>
            <div><div className="text-5xl font-bold">25K</div><p>Storage</p></div>
            <div><div className="text-5xl font-bold">2K+</div><p>Pallets</p></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About</h2>
          <p className="text-lg mb-6">Astromar FTWZ in Chennai - 12,000+ containers, 24,500+ dispatches, 100+ countries served</p>
        </div>
      </section>
    </div>
  );
}
