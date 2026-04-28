'use client';

import yachtImg from '@/assets/ship.png';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { MdOutlineRequestPage } from 'react-icons/md';

interface AskMoreDetailsButtonProps {
  boatId: string;
  boatTitle: string;
  /** URL path segment before the ID, e.g. "featured-boats" | "florida-yacht-trader-mls" | "search-listing" */
  productUrlPath: string;
}

interface UserFormData {
  name: string;
  email: string;
}

const generateUserId = (): string => {
  const randomNum = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, '0');
  return `FY${randomNum}`;
};

const sendLead = async (
  userId: string,
  name: string,
  email: string,
  boatId: string,
  boatTitle: string,
  productUrlPath: string,
) => {
  const baseApiUrl =
    process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8000/api';
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://jupitermarinesales.com';

  await fetch(`${baseApiUrl}/daily_leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      name,
      email,
      product: boatTitle,
      product_url: `${baseUrl}/${productUrlPath}/${boatId}`,
    }),
  });
};

const AskMoreDetailsButton: React.FC<AskMoreDetailsButtonProps> = ({
  boatId,
  boatTitle,
  productUrlPath,
}) => {
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  const handleClick = async () => {
    if (typeof window === 'undefined') return;

    const name = localStorage.getItem('USER_NAME');
    const email = localStorage.getItem('USER_EMAIL');

    if (!name || !email) {
      setIsUserFormOpen(true);
      return;
    }

    setIsSending(true);
    try {
      const newUserId = generateUserId();
      localStorage.setItem('GENERATED_UID', newUserId);
      await sendLead(newUserId, name, email, boatId, boatTitle, productUrlPath);
      toast.success(
        'Your request has been submitted! Our team will contact you shortly.',
        { position: 'top-center' },
      );
    } catch {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const onSubmitUserForm = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      const newUserId = generateUserId();
      localStorage.setItem('GENERATED_UID', newUserId);
      localStorage.setItem('USER_NAME', data.name);
      localStorage.setItem('USER_EMAIL', data.email);
      localStorage.setItem('PLATFORM', 'Jupiter_Marine_Sales');

      await sendLead(
        newUserId,
        data.name,
        data.email,
        boatId,
        boatTitle,
        productUrlPath,
      );

      setIsUserFormOpen(false);
      toast.success(
        'Your request has been submitted! Our team will contact you shortly.',
        { position: 'top-center' },
      );
    } catch {
      setIsUserFormOpen(false);
      toast.success(
        'Your request has been submitted! Our team will contact you shortly.',
        { position: 'top-center' },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="px-1 md:px-4 py-4">
        <button
          type="button"
          onClick={handleClick}
          disabled={isSending}
          className="flex items-center gap-2 bg-secondary hover:bg-[#0052CC] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-md text-sm md:text-base"
        >
          <MdOutlineRequestPage size={20} />
          {isSending ? 'Submitting...' : 'Ask for More Details'}
        </button>
      </div>

      {/* User Info Form Modal */}
      {isUserFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-xl p-8 md:p-10 relative border border-blue-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-2xl z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-center">
                <Image
                  src={yachtImg}
                  alt="Jupiter Marine Sales"
                  width={70}
                  height={70}
                />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Welcome to Jupiter Marine Sales
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-2">
                  For your{' '}
                  <span className="font-semibold text-blue-600">privacy</span>{' '}
                  and a{' '}
                  <span className="font-semibold text-blue-600">
                    better engaging experience
                  </span>
                  , we need some information.
                </p>
                <p className="text-sm text-gray-500">
                  Your information helps us provide personalized assistance
                  through our AI-powered platform.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmitUserForm)}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="ask-name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    <span className="text-blue-600">👤</span> Full Name
                  </label>
                  <input
                    id="ask-name"
                    type="text"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="ask-email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    <span className="text-blue-600">✉️</span> Email Address
                  </label>
                  <input
                    id="ask-email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all hover:border-gray-300 bg-gray-50 focus:bg-white"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span>⚠️</span> {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Website</span>
                        <span className="text-xl">→</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  🔒 Your information is secure and will only be used to
                  enhance your experience.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AskMoreDetailsButton;
