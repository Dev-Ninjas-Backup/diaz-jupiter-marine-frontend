import logo from '@/assets/florida-yacht-logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <Image
            src={logo}
            alt="Jupiter Marine"
            fill
            className="object-contain opacity-50"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-8xl font-bold text-blue-600 mb-4">404</div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>

          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            href="/"
            className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Back to Homepage
          </Link>

          <Link
            href="/search-listing"
            className="inline-block w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Browse Boats
          </Link>
        </div>
      </div>
    </div>
  );
}
