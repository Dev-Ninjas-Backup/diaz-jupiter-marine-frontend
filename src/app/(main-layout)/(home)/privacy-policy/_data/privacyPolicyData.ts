export interface PrivacyPolicySection {
  id: number;
  title: string;
  subsections?: {
    title: string;
    items: string[];
  }[];
  content?: string;
}

export const privacyPolicyData: PrivacyPolicySection[] = [
  {
    id: 1,
    title: 'Information We Collect',
    subsections: [
      {
        title: 'a. Personal Information',
        items: [
          'Name',
          'Email address',
          'Phone number',
          'Location',
          'Yacht or vessel details and descriptions',
        ],
      },
      {
        title: 'b. Non-Personal Information',
        items: [
          'IP address',
          'Browser type and version',
          'Device type',
          'Pages visited and time spent',
          'Referring URLs',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'How We Use Your Information',
    content:
      'We use the information we collect to respond to inquiries, provide customer support, enable communication between buyers and sellers, improve our website, send updates and marketing communications, and monitor website performance.',
  },
  {
    id: 3,
    title: 'Sharing Your Information',
    content:
      'We may share your information with service providers, law enforcement when required, and prospective buyers or sellers as part of our platform services.',
  },
  {
    id: 4,
    title: 'Cookies and Tracking Technologies',
    content:
      'We use cookies and similar technologies to enhance your experience, remember your preferences, customize content, and analyze website traffic. You can modify your browser settings to control cookies.',
  },
  {
    id: 5,
    title: 'Third-Party Links',
    content:
      'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.',
  },
  {
    id: 6,
    title: 'Data Security',
    content:
      'We take reasonable steps to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet is 100% secure.',
  },
  {
    id: 7,
    title: 'Your Rights and Choices',
    content:
      'You have the right to request access to your personal information, request deletion of your data, opt-out of marketing communications, and adjust cookie preferences.',
  },
  {
    id: 8,
    title: "Children's Privacy",
    content:
      'Our website is not intended for individuals under the age of 13. We do not knowingly collect personal information from children.',
  },
  {
    id: 9,
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.',
  },
];

export const privacyPolicyIntro = {
  companyName: 'Florida Yacht Trader LLC',
  effectiveDate: '6/1/2025',
  lastUpdated: '6/1/2025',
  introText:
    'At Florida Yacht Trader LLC, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.',
};

