'use client';

import React, { useEffect, useState } from 'react';
import {
  privacyPolicyData,
  privacyPolicyIntro,
} from '../_data/privacyPolicyData';

const PrivacyPolicyContent = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const scrollToSection = (id: number) => {
    setActiveSection(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = privacyPolicyData.map((section) => ({
        id: section.id,
        element: document.getElementById(`section-${section.id}`),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 py-10 md:py-16">
      {/* Left Column - Main Content */}
      <div className="lg:col-span-3 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Privacy Policy
          </h2>
          <div className="text-gray-600 space-y-1">
            <p>
              <span className="font-semibold">Effective Date:</span>{' '}
              {privacyPolicyIntro.effectiveDate}
            </p>
            <p>
              <span className="font-semibold">Last Updated:</span>{' '}
              {privacyPolicyIntro.lastUpdated}
            </p>
          </div>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {privacyPolicyIntro.introText}
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {privacyPolicyData.map((section) => (
            <div
              key={section.id}
              id={`section-${section.id}`}
              className="scroll-mt-20"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {section.id}. {section.title}
              </h3>

              {section.subsections ? (
                <div className="space-y-6">
                  {section.subsections.map((subsection, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="text-xl font-semibold text-gray-800">
                        {subsection.title}
                      </h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="ml-4">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Table of Contents */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Table of Contents
          </h3>
          <nav className="space-y-2">
            {privacyPolicyData.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-2 py-2 transition-colors ${
                  activeSection === section.id
                    ? 'font-bold text-gray-900'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {section.id}. {section.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;
