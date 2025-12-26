'use client';
import { submitContactUs } from '@/services/contact/contact';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  boatInformation: string;
  comments: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      boatInformation: '',
      comments: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await submitContactUs({
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        boatInformation: data.boatInformation.trim(),
        comments: data.comments.trim(),
      });


      if (response.success) {
        toast.success(response.message || 'Message sent successfully!');
        reset();
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again.',
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium  mb-2">
          Full Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          {...register('fullName', {
            required: 'Please enter your full name',
            minLength: {
              value: 2,
              message: 'Full name must be at least 2 characters',
            },
          })}
          placeholder="John Doe"
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            errors.fullName ? 'ring-2 ring-red-500' : ''
          }`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Phone and Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium  mb-2">
            Phone<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone', {
              required: 'Please enter your phone number',
              pattern: {
                value:
                  /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                message: 'Please enter a valid phone number',
              },
            })}
            placeholder="123******"
            className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.phone ? 'ring-2 ring-red-500' : ''
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium  mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Please enter your email',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
            placeholder="john@example.com"
            className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.email ? 'ring-2 ring-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Boat Information */}
      <div>
        <label
          htmlFor="boatInformation"
          className="block text-sm font-medium  mb-2"
        >
          Boat Information<span className="text-red-500">*</span>
        </label>
        <textarea
          id="boatInformation"
          {...register('boatInformation', {
            required: 'Please enter boat information',
            minLength: {
              value: 10,
              message: 'Boat information must be at least 10 characters',
            },
          })}
          placeholder="Interested in a 2020 Sea Ray Sundancer"
          rows={3}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
            errors.boatInformation ? 'ring-2 ring-red-500' : ''
          }`}
        />
        {errors.boatInformation && (
          <p className="text-red-500 text-sm mt-1">
            {errors.boatInformation.message}
          </p>
        )}
      </div>

      {/* Comments */}
      <div>
        <label htmlFor="comments" className="block text-sm font-medium  mb-2">
          Comments<span className="text-red-500">*</span>
        </label>
        <textarea
          id="comments"
          {...register('comments', {
            required: 'Please enter your comments',
            minLength: {
              value: 10,
              message: 'Comments must be at least 10 characters',
            },
          })}
          placeholder="I would like to schedule a viewing."
          rows={5}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
            errors.comments ? 'ring-2 ring-red-500' : ''
          }`}
        />
        {errors.comments && (
          <p className="text-red-500 text-sm mt-1">{errors.comments.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-secondary hover:bg-[#0052CC] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
