import React from 'react';
import { SubscriptionPlan } from '@/types/subscription-types-demo';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ plan }) => {
  return (
    <div
      className={`relative pb-16 px-3 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
        plan.featured ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      {/* Featured Badge */}
      {plan.featured && plan.featuredLabel && (
        <div className="absolute top-4 -right-7 z-10 rotate-45">
          <div className="bg-gradient-to-br from-green-400 to-green-600 text-white text-xs font-bold px-6 py-2 rounded-bl-2xl shadow-lg transform rotate-0">
            {plan.featuredLabel}
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3 border-b border-gray-200 pb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{plan.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-primary">
              ${plan.price}
            </span>
            <span className="text-gray-500 text-base sm:text-lg">
              /{plan.billingCycle}
            </span>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-3 sm:mb-4 space-y-2">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <IoCheckmarkCircle className="text-gray-500 text-xl sm:text-2xl flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-5 left-0  w-full px-3">
          {/* CTA Button */}
          <button
            className={` py-3 px-4 w-full rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
              plan.buttonStyle === 'primary'
                ? 'bg-secondary text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
            }`}
          >
            {plan.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
