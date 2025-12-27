import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import PrivacyPolicyBanner from './_components/PrivacyPolicyBanner';
import PrivacyPolicyContent from './_components/PrivacyPolicyContent';

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

