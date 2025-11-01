import Image from 'next/image';
import profilePhoto from '@/assets/seller-dashboard/profileAvatar.svg';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import icon1 from '@/assets/seller-dashboard/states/icon1.svg';
import icon2 from '@/assets/seller-dashboard/states/icon2.svg';
import icon3 from '@/assets/seller-dashboard/states/icon3.svg';

const ProfileStates = () => {
  return (
    <div className="">
      <CustomContainer>
        {/* Back button */}
        {/* <div className="mt-28">
          <Link
            href="/"
            className="flex items-center bg-[#F8F9FA] border border-[#D9D9D9]/30 rounded-[10px] text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-8 w-fit px-4 py-2"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home Page
          </Link>
        </div> */}

        {/* Card */}
        <div className="w-full flex lg:flex-row flex-col gap-10 justify-between flex-wrap">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-200 shadow-md">
                <Image
                  src={profilePhoto}
                  alt="Esther Howard"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-grow text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Esther Howard
              </h2>
              <p className="text-gray-600">San Francisco, CA</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center bg-[#F4F4F4] rounded-lg p-4 text-center shadow-sm">
              <Image
                src={icon1}
                alt="icon"
                width={80}
                height={80}
                className="w-11 h-11"
              />
              <span className="text-2xl mt-3 font-bold text-primary-txt">
                12
              </span>
              <span className="text-base text-primary-txt">Boat Listed</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#F4F4F4] rounded-lg p-4 text-center shadow-sm">
              <Image
                src={icon2}
                alt="icon"
                width={80}
                height={80}
                className="w-11 h-11"
              />
              <span className="text-2xl mt-3 font-bold text-primary-txt">
                03
              </span>
              <span className="text-base text-primary-txt">Active Listing</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-[#F4F4F4] rounded-lg p-4 text-center shadow-sm">
              <Image
                src={icon3}
                alt="icon"
                width={80}
                height={80}
                className="w-11 h-11"
              />
              <span className="text-2xl mt-3 font-bold text-primary-txt">
                08
              </span>
              <span className="text-base text-primary-txt">Lead Generated</span>
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default ProfileStates;
