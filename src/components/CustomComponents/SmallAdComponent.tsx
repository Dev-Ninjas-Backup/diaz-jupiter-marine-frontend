import adimg from '@/assets/blogs/adimg.png';
import Image from 'next/image';
import Link from 'next/link';

const SmallAdComponent = () => {
  return (
    <div className="relative bg-linear-to-b from-[#006EF0] to-[#00CABE] rounded-2xl flex items-center justify-center w-full pt-24 overflow-hidden">
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
        <Link
          href="/contact"
          className="bg-black px-5 py-3 rounded-xl w-full mt-3 block"
        >
          List Your Boat For Sale
        </Link>
      </div>
    </div>
  );
};

export default SmallAdComponent;
