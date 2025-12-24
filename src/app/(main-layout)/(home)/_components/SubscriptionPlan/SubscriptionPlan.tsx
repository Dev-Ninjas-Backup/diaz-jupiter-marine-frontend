import Image from 'next/image';
import React from 'react';
import subsImg from '@/assets/yacht-images/subscription.png';
import { subscriptionPlans } from '@/assets/demo-datas/demodata';
import SubscriptionCard from '@/components/SubscriptionPlan/SubscriptionCard';

const SubscriptionPlan = () => {
  return (
    <div className="min-h-screen px-5">
      <div className="h-full md:h-[1850px]  relative bg-[#00384D] rounded-2xl">
        <div className="md:h-[1215px] relative">
          <Image
            src={subsImg}
            alt="Subscription Plan"
            width={1200}
            height={900}
            className="w-full"
          />
          <div className="absolute bottom-[3%] md:bottom-0 px-[5%] md:px-[30%] flex flex-col items-center justify-center w-full text-center text-white space-y-3 md:space-y-10 ">
            <h1 className="text-xl sm:text-4xl md:text-6xl font-bold">
              Looking to Sell Your Boat? Pick your perfect plan.
            </h1>
            <p className="text-sm md:text-xl">
              Reach thousands of qualified buyers in Florida’s most active yacht
              marketplace.
            </p>
          </div>
        </div>
        <div className="md:absolute md:bottom-[15%] md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 w-full max-w-7xl px-4 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {subscriptionPlans.map((plan, idx) => (
              <SubscriptionCard key={idx} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
