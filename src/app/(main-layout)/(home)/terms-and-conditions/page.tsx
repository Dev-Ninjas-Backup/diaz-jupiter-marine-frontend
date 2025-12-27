import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import TermsBanner from './_components/TermsBanner';
import TermsContent from './_components/TermsContent';

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
