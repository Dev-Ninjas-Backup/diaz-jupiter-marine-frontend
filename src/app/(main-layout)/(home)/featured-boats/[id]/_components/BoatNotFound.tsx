'use client';
import { useRouter } from 'next/navigation';
import { FaAnchor, FaSearch, FaHome, FaArrowLeft } from 'react-icons/fa';
import { MdOutlineDirectionsBoat } from 'react-icons/md';

interface BoatNotFoundProps {
  error?: string;
}

const BoatNotFound = ({ error }: BoatNotFoundProps) => {
  const router = useRouter();

  const isNotFound = !error || error === 'Boat not found';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col items-center justify-center px-4">
      {/* Animated boat icon */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
          <MdOutlineDirectionsBoat className="text-6xl text-blue-400" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center border-2 border-white">
          <span className="text-red-500 font-bold text-lg">!</span>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-300"
            style={{
              animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          {isNotFound ? 'Vessel Not Found' : 'Something Went Wrong'}
        </h1>
        <p className="text-slate-500 text-lg mb-2">
          {isNotFound
            ? "This listing may have been sold, removed, or the ID is incorrect."
            : "We couldn't load this listing. Please try again."}
        </p>
        <p className="text-slate-400 text-sm mb-8">
          {isNotFound
            ? "Don't worry — there are thousands of other vessels waiting for you."
            : error}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm font-medium"
          >
            <FaArrowLeft className="text-sm" />
            Go Back
          </button>

          <button
            onClick={() => router.push('/search-listing')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-sm font-medium"
          >
            <FaSearch className="text-sm" />
            Browse All Listings
          </button>

          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm font-medium"
          >
            <FaHome className="text-sm" />
            Home
          </button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        {[
          {
            icon: <FaSearch className="text-blue-500 text-xl" />,
            title: 'Search Listings',
            desc: 'Find boats from Boats.com & YachtBroker',
            href: '/search-listing',
          },
          {
            icon: <MdOutlineDirectionsBoat className="text-cyan-500 text-xl" />,
            title: 'Featured Boats',
            desc: 'Browse our curated selection',
            href: '/featured-boats',
          },
          {
            icon: <FaAnchor className="text-teal-500 text-xl" />,
            title: 'MLS Listings',
            desc: 'Florida Yacht Trader MLS',
            href: '/florida-yacht-trader-mls',
          },
        ].map((item) => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
              {item.icon}
            </div>
            <p className="font-semibold text-slate-700 text-sm">{item.title}</p>
            <p className="text-slate-400 text-xs">{item.desc}</p>
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default BoatNotFound;
