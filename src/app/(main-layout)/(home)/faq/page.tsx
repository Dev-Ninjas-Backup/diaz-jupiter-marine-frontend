import { Metadata } from 'next';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import FAQBanner from './_components/FAQBanner';
import FAQContent from './_components/FAQContent';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Jupiter Marine Sales',
  description: 'Find answers to frequently asked questions about buying and selling boats, our services, and more at Jupiter Marine Sales.',
};

const FAQPage = () => {
  return (
    <div>
      {/* Banner */}
      <FAQBanner />

      {/* Main Content */}
      <CustomContainer>
        <FAQContent />

        {/* Footer - Get In Touch */}
        <GetInTouch />
      </CustomContainer>
    </div>
  );
};

export default FAQPage;
