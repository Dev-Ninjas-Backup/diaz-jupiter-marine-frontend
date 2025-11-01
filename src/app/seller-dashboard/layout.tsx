import { ReactNode } from 'react';
import ProfileStates from './_components/ProfileStates/ProfileStates';
import ProfileHeader from './_components/ProfileHeader/ProfileHeader';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';

const ProvidersLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="my-2 md:my-3 mx-2 md:mx-5 rounded-2xl">
      {/* <Navbar /> */}
      <GradientBannerCustom>
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-center text-white pt-6">
          Welcome To Dashboard
        </h1>
      </GradientBannerCustom>
      <div className="mt-20">
        <ProfileStates />
        <ProfileHeader />
        <CustomContainer>{children}</CustomContainer>
      </div>
    </div>
  );
};

export default ProvidersLayout;
