'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BriefcaseBusiness,
  CreditCard,
  LayoutDashboard,
  LogOut,
  UserRoundPen,
} from 'lucide-react';
import CustomContainer from '@/components/CustomComponents/CustomContainer';

const navItems = [
  {
    label: 'My Listing',
    href: '/seller-dashboard/my-listing',
    icon: LayoutDashboard,
  },
  {
    label: 'Leads',
    href: '/seller-dashboard/leads',
    icon: BriefcaseBusiness,
  },
  {
    label: 'My Profile',
    href: '/seller-dashboard/my-profile',
    icon: UserRoundPen,
  },
  { label: 'Invoices', href: '/seller-dashboard/invoices', icon: CreditCard },
];

const ProfileHeader = () => {
  const pathname = usePathname();

  return (
    //  className=" sticky top-50 sm:top-60 z-10"
    <div>
      <CustomContainer>
        <div className="mt-8 flex items-center gap-5 flex-nowrap overflow-x-auto p-4 space-x-2 md:space-x-4">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex-shrink-0 flex items-center justify-center px-4 py-2 space-x-2 text-sm md:text-lg font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-[#F4F4F4] text-black hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
          <span className="flex-shrink-0 flex items-center justify-center px-4 py-2 space-x-2 text-sm md:text-lg font-medium rounded-lg transition-colors duration-200 bg-[#F4F4F4] text-red-500 hover:bg-gray-200 gap-1.5">
            <LogOut size={18} /> Logout
          </span>
        </div>
      </CustomContainer>
    </div>
  );
};
export default ProfileHeader;
