'use client';

import Image from 'next/image';
import Link from 'next/link';

interface AppStoreBadgeProps {
  className?: string;
}

export const AppStoreBadge = ({ className = '' }: AppStoreBadgeProps) => {
  return (
    <Link
      href="https://apps.apple.com/us/app/jupiter-marine-sales/id6765932719"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block transition-transform hover:scale-105 active:scale-95 duration-200 select-none ${className}`}
    >
      <Image
        src="/assets/app-store-badge.svg"
        alt="Download on the App Store"
        width={135}
        height={40}
        className="w-[140px] sm:w-[155px] h-auto object-contain"
        priority
      />
    </Link>
  );
};

export default AppStoreBadge;
