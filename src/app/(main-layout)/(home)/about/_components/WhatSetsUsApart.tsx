import { yachtImages } from '../_data/whatSetsUsApartData';

const WhatSetsUsApart = () => {
  return (
    <section className="py-10 md:py-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
        What Sets Us Apart
      </h2>

      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-6xl mx-auto text-center">
        Florida Focused – Local knowledge, regional exposure, and access to the
        largest boating community in the U.S. Premium Listings – From sleek
        center consoles to luxury motor yachts, every vessel is showcased to
        attract the right buyer. Verified Sellers – We partner only with
        reputable owners, brokers, and dealerships for total peace of mind.
        Seamless Experience – Powerful search tools, clear pricing, and no
        hidden fees — just smooth transactions from start to finish.
      </p>

      {/* Yacht Images */}

      <div className="grid grid-cols-12 gap-4 md:gap-6 h-[300px]">
        <div className="col-span-7  rounded-lg overflow-hidden">
          <img
            src={yachtImages[0].src}
            alt={yachtImages[0].alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
          />
        </div>

        {/* Top Right - Aerial view yacht */}
        <div className="col-span-5 rounded-lg overflow-hidden">
          <img
            src={yachtImages[1].src}
            alt={yachtImages[1].alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
