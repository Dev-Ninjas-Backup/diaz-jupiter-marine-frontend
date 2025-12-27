import {
  featurePoints,
  statistics,
  yachtImages,
} from '../_data/whatSetsUsApartData';

const WhatSetsUsApart = () => {
  return (
    <section className="py-10 md:py-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
        WHAT SETS US APART
      </h2>

      {/* Feature Points - Bullet Format */}
      <div className="max-w-4xl mx-auto mb-10 md:mb-16">
        <div className="space-y-4 md:space-y-5 text-left">
          {featurePoints.map((point) => (
            <div key={point.id} className="flex gap-3">
              <span className="text-primary font-bold text-xl mt-1">•</span>
              <div>
                <h3 className="font-bold text-lg md:text-xl mb-1 text-gray-900">
                  {point.title}
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Yacht Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
        {yachtImages.map((image) => (
          <div
            key={image.id}
            className="relative aspect-[16/10] rounded-lg overflow-hidden"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Statistics Banner - Light Blue with Dark Grey Text */}
      <div className="bg-[#E6F2FF] rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          {statistics.map((stat, index) => (
            <div key={index} className="text-gray-800">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 text-gray-800">
                {stat.number}
              </div>
              <div className="text-base md:text-lg lg:text-xl text-gray-600 whitespace-pre-line">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;

