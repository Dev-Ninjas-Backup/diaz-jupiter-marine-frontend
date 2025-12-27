import {
  missionText,
  visionText,
  yachtImages,
} from '../_data/missionVisionData';

const MissionVision = () => {
  return (
    <section className="py-10 md:py-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
        MISSION & VISION
      </h2>

      {/* White Card Container */}
      <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Side - Overlapping Yacht Images */}
          <div className="relative">
            <div className="relative min-h-[500px] md:min-h-[600px]">
              {/* First image - base layer */}
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden z-10">
                <img
                  src={yachtImages[0].src}
                  alt={yachtImages[0].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Second image - overlapping from right */}
              <div className="absolute top-12 md:top-16 left-8 md:left-12 w-[85%] aspect-[16/10] rounded-lg overflow-hidden z-20 shadow-lg">
                <img
                  src={yachtImages[1].src}
                  alt={yachtImages[1].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Third image - overlapping from right */}
              <div className="absolute top-24 md:top-32 left-4 md:left-6 w-[75%] aspect-[16/10] rounded-lg overflow-hidden z-30 shadow-lg">
                <img
                  src={yachtImages[2].src}
                  alt={yachtImages[2].alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Mission & Vision */}
          <div className="space-y-8 md:space-y-12">
            {/* Mission */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                Mission
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {missionText}
              </p>
            </div>

            {/* Vision */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                Vision
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {visionText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
