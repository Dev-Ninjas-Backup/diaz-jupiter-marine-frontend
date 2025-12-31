import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GetInTouch from '../contact/_components/GetInTouch';
import AboutBanner from './_components/AboutBanner';
import MeetOurTeam from './_components/MeetOurTeam';
import MissionVision from './_components/MissionVision';
import OurStory from './_components/OurStory';
import WhatSetsUsApart from './_components/WhatSetsUsApart';
// import StatsBanner from './_components/StatsBanner';

const AboutPage = () => {
  return (
    <div>
      {/* About Us Banner */}
      <AboutBanner />

      <CustomContainer>
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
