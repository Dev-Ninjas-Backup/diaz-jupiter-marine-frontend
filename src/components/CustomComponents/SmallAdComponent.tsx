import adimg from '@/assets/blogs/adimg.png';
import Image from 'next/image';
import Link from 'next/link';

const SmallAdComponent = () => {
  return (
    <div className="bg-linear-to-b from-[#006EF0] to-[#00CABE] rounded-2xl overflow-hidden w-full">
      {/* Text section */}
      <div className="flex flex-col items-center justify-center p-6 text-white text-center gap-3">
        <h1 className="text-2xl font-semibold">Ready to Sell?</h1>
        <p className="text-lg font-semibold">Reach the Right Buyers Today</p>
        <Link
          href="/contact"
          className="bg-black px-5 py-3 rounded-xl w-full mt-2 block text-center"
        >
          List Your Boat For Sale
        </Link>
      </div>
      {/* Image section */}
      <div className="w-full flex items-end justify-center">
        <Image
          src={adimg}
          alt="adimg"
          width={300}
          height={300}
          className="object-contain scale-110 w-full"
        />
      </div>
    </div>
  );
};

export default SmallAdComponent;
