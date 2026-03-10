import { Metadata } from 'next';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import AboutBanner from './_components/AboutBanner';
import AboutDescription from './_components/AboutDescription';
import MeetOurTeam from './_components/MeetOurTeam';
import MissionVision from './_components/MissionVision';
import OurStory from './_components/OurStory';
import WhatSetsUsApart from './_components/WhatSetsUsApart';
// import StatsBanner from './_components/StatsBanner';

export const metadata: Metadata = {
  title: 'About Us - Our Story & Team | Jupiter Marine Sales',
  description:
    'Learn about Jupiter Marine Sales, our mission, vision, and meet our experienced team dedicated to helping you buy or sell boats.',
};

const AboutPage = () => {
  return (
    <div>
      {/* About Us Banner */}
      <AboutBanner />

      <CustomContainer>
        {/* About Us Description */}
        <AboutDescription />

        {/* Our Story Section */}
        <OurStory />

        {/* Mission & Vision Section */}
        <MissionVision />

        {/* What Sets Us Apart Section */}
        <WhatSetsUsApart />

        {/* Stats Banner Section */}
        {/* <StatsBanner /> */}

        {/* Meet Our Team Section */}
        <MeetOurTeam />

        {/* Get In Touch Section */}
        <GetInTouch />
      </CustomContainer>
    </div>
  );
};

export default AboutPage;
