import Image from 'next/image';
import React from 'react';
import adimg from '@/assets/blogs/adimg.png';

const SmallAdComponent = () => {
  return (
    <div className="relative  bg-gradient-to-b from-[#006EF0] to-[#00CABE] rounded-2xl h-full flex items-center justify-center w-full md:w-max pt-24 overflow-hidden">
      <Image
        src={adimg}
        alt="adimg"
        width={300}
        height={300}
        className="object-bottom  scale-110"
      />
      <div className="absolute top-0 flex flex-col items-center justify-center p-5 text-white text-center gap-3">
        <h1 className="text-2xl font-semibold">Ready to Sell?</h1>
        <p className="text-lg font-semibold">Reach the Right Buyers Today</p>
        <button className="bg-black px-5 py-3 rounded-xl w-full mt-3">
          List Your Boat For Sale
        </button>
      </div>
    </div>
  );
};

export default SmallAdComponent;
