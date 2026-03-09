import { Metadata } from 'next';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import PrivacyPolicyBanner from './_components/PrivacyPolicyBanner';
import PrivacyPolicyContent from './_components/PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | Jupiter Marine Sales',
  description:
    'Read our privacy policy to understand how Jupiter Marine Sales collects, uses, and protects your personal information.',
};

const PrivacyPolicyPage = () => {
  return (
    <div>
      {/* Banner */}
      <PrivacyPolicyBanner />

      {/* Main Content */}
      <CustomContainer>
        <PrivacyPolicyContent />

        {/* Footer - Get In Touch */}
        <GetInTouch />
      </CustomContainer>
    </div>
  );
};

export default PrivacyPolicyPage;
