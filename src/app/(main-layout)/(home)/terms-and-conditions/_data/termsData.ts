export interface TermsSection {
  id: number;
  title: string;
  subsections?: {
    title: string;
    items: string[];
  }[];
  content?: string;
}

export const termsData: TermsSection[] = [
  {
    id: 1,
    title: 'Use of the Website',
    content:
      'By accessing and using the Florida Yacht Trader website, you agree to comply with and be bound by these Terms and Conditions. The website is provided for informational and transactional purposes related to yacht sales and listings. You must be at least 18 years old to use our services.',
  },
  {
    id: 2,
    title: 'User Accounts and Listings',
    content:
      'To create listings or access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. All listings must be accurate, lawful, and comply with applicable regulations. We reserve the right to remove any listing that violates these terms.',
  },
  {
    id: 3,
    title: 'Prohibited Activities',
    subsections: [
      {
        title: 'You agree not to:',
        items: [
          'Post false, misleading, or fraudulent information',
          'Violate any applicable laws or regulations',
          'Infringe on intellectual property rights',
          'Harass, abuse, or harm other users',
          'Use automated systems to access the website without permission',
          'Attempt to gain unauthorized access to our systems',
          'Transmit viruses, malware, or other harmful code',
          'Interfere with or disrupt the website or servers',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Intellectual Property',
    content:
      'All content on this website, including text, graphics, logos, images, and software, is the property of Florida Yacht Trader LLC or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
  },
  {
    id: 5,
    title: 'User-Generated Content',
    content:
      'By submitting content (including listings, reviews, comments, or images), you grant us a non-exclusive, royalty-free, perpetual license to use, modify, and display such content on our website and in our marketing materials. You represent that you have the right to grant this license and that your content does not violate any third-party rights.',
  },
  {
    id: 6,
    title: 'Transactions and Payments',
    content:
      'Florida Yacht Trader facilitates connections between buyers and sellers but is not a party to any transaction. All transactions are between the buyer and seller directly. We are not responsible for the quality, condition, or legality of listed vessels. Payment terms and conditions are to be negotiated directly between parties.',
  },
  {
    id: 7,
    title: 'Disclaimers and Limitations of Liability',
    content:
      'The website and its content are provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any information on the website. To the fullest extent permitted by law, we disclaim all warranties and shall not be liable for any damages arising from your use of the website.',
  },
  {
    id: 8,
    title: 'Indemnification',
    content:
      'You agree to indemnify, defend, and hold harmless Florida Yacht Trader LLC, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the website, violation of these terms, or infringement of any rights of another party.',
  },
  {
    id: 9,
    title: 'Termination',
    content:
      'We reserve the right to suspend or terminate your account and access to the website at any time, with or without cause or notice, for any reason including violation of these Terms and Conditions. Upon termination, your right to use the website will immediately cease.',
  },
  {
    id: 10,
    title: 'Modifications to Terms',
    content:
      'We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after changes are posted constitutes acceptance of the modified terms. We encourage you to review these terms periodically.',
  },
  {
    id: 11,
    title: 'Governing Law and Dispute Resolution',
    content:
      'These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of Florida, United States. Any disputes arising from these terms or your use of the website shall be resolved through binding arbitration in Florida, except where prohibited by law.',
  },
  {
    id: 12,
    title: 'Severability',
    content:
      'If any provision of these Terms and Conditions is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.',
  },
  {
    id: 13,
    title: 'Contact Information',
    content:
      'If you have any questions about these Terms and Conditions, please contact us at monica@floridayachttrader.com or call us at 954-672-7700. Our address is 11072 164th Court N Jupiter, FL 33478.',
  },
];

export const termsIntro = {
  effectiveDate: '6/1/2025',
  lastUpdated: '6/3/2025',
  introText:
    'Welcome to Florida Yacht Trader. These Terms and Conditions govern your access to and use of our website and services. Please read these terms carefully before using our platform. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.',
};

