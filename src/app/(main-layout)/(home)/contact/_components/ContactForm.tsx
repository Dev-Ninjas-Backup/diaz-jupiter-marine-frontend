'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    boatInfo: '',
    comments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    if (!formData.boatInfo.trim()) {
      toast.error('Please enter boat information');
      return;
    }
    if (!formData.comments.trim()) {
      toast.error('Please enter your comments');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully!');
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        boatInfo: '',
        comments: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium  mb-2">
          Full Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="John Doe"
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
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
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="123******"
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium  mb-2">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Boat Information */}
      <div>
        <label htmlFor="boatInfo" className="block text-sm font-medium  mb-2">
          Boat Information:
        </label>
        <textarea
          id="boatInfo"
          name="boatInfo"
          value={formData.boatInfo}
          onChange={handleInputChange}
          placeholder="Type your message..."
          rows={3}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        />
      </div>

      {/* Comments */}
      <div>
        <label htmlFor="comments" className="block text-sm font-medium  mb-2">
          Comments
        </label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleInputChange}
          placeholder="Type your message..."
          rows={5}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg  placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        />
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
