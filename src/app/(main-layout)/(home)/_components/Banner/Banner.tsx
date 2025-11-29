import React from 'react';
import SearchComponent from './SearchComponent';
import CustomContainer from '@/components/CustomComponents/CustomContainer';

const Banner = () => {
  return (
    <section className="relative h-[380px] md:min-h-screen w-full flex items-center justify-center overflow-hidden rounded-2xl  md:py-10">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-[380px] md:h-full object-cover rounded-2xl"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://floridayt.s3.eu-north-1.amazonaws.com/Video+with+watermark+-+1761573915968.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 px-3 md:px-5 h-full">
        <CustomContainer>
          <div className="flex flex-col items-center justify-between  gap-5 h-full space-y-5">
            <div className="text-white space-y-3 xl:space-y-[15%] 2xl:space-y-[17%] pt-[20%] md:pt-[10%]">
              <h1 className="text-2xl md:text-6xl xl:text-7xl 2xl:text-[115px] font-bold text-left uppercase tracking-[1px] md:tracking-[5px]">
                Jupiter Marine Sales
              </h1>
            </div>
            <div className="md:mt-5 w-full ">
              <SearchComponent />
            </div>
          </div>
        </CustomContainer>
      </div>
    </section>
  );
};

export default Banner;
