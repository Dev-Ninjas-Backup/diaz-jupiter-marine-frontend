import { Metadata } from 'next';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import TermsBanner from './_components/TermsBanner';
import TermsContent from './_components/TermsContent';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Jupiter Marine Sales',
  description: 'Review the terms and conditions for using Jupiter Marine Sales services and purchasing boats through our platform.',
};

const TermsAndConditionsPage = () => {
  return (
    <div>
      {/* Banner */}
      <TermsBanner />
      {/* Main Content */}
      <CustomContainer>
        <TermsContent />
        {/* Footer - Get In Touch */}
        <GetInTouch />
      </CustomContainer>
    </div>
  );
};

export default TermsAndConditionsPage;
