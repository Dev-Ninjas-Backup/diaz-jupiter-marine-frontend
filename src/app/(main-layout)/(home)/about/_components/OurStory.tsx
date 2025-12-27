import { ourStoryText, yachtImages } from '../_data/ourStoryData';

const OurStory = () => {
  return (
    <section className="py-10 md:py-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
        OUR STORY
      </h2>

      <div className="max-w-4xl mx-auto mb-10 md:mb-16">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center">
          {ourStoryText}
        </p>
      </div>

      {/* Yacht Images Grid - Image layout matching design */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* Top Left - Large image (spans 2 columns, 2 rows) */}
        <div className="col-span-2 row-span-2 relative aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={yachtImages[0].src}
            alt={yachtImages[0].alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
          />
        </div>

        {/* Top Right - Aerial view yacht */}
        <div className="col-span-2 md:col-span-1 relative aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={yachtImages[1].src}
            alt={yachtImages[1].alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
          />
        </div>

        {/* Bottom Left - Yacht cutting through water */}
        <div className="col-span-1 relative aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={yachtImages[2].src}
            alt={yachtImages[2].alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
          />
        </div>

        {/* Bottom Middle - Superyacht in cove */}
        <div className="col-span-1 relative aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={yachtImages[3].src}
            alt={yachtImages[3].alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
          />
        </div>

        {/* Bottom Right - Catamaran sailboat */}
        <div className="col-span-1 relative aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={yachtImages[4].src}
            alt={yachtImages[4].alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default OurStory;
