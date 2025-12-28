import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import FAQBanner from './_components/FAQBanner';
import FAQContent from './_components/FAQContent';

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
