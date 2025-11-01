import return_policy_icon from '@/assets/contact/return_policy_icon.svg';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import Image from 'next/image';
import GetInTouch from './_components/GetInTouch';
import ContactForm from './_components/ContactForm';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';

const ContactPage = () => {
  return (
    <div>
      <GradientBannerCustom>
        <h1 className="text-white text-xl md:text-4xl lg:text-6xl uppercase font-bold md:tracking-[5px] text-center leading-normal">
          Get in Touch with <br /> Florida Yacht Traders
        </h1>
      </GradientBannerCustom>
      <CustomContainer>
        <div className="py-10 md:py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-white w-full  md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold  mb-6 md:mb-8">
                Contact Us
              </h2>
              <ContactForm />
            </div>

            <div className=" w-full md:w-1/3">
              {/* Return Policy */}
              <div className="bg-gray-50 rounded-2xl p-8 md:p-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-6">
                  <Image
                    src={return_policy_icon}
                    alt="Return Policy"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold  mb-6">
                  Return Policy
                </h3>

                <p className="text-gray-600 leading-relaxed text-justify text-sm md:text-base">
                  All vessels purchased through Jupiter Marine Sales are advised
                  to go through a survey, sea trial, and mechanical inspection.
                  Once these inspections have happened and the vessel is checked
                  to the buyers satisfaction we will send out a form called
                  vessel acceptance for closing. After vessel acceptance is
                  signed by the buyer or buyers there are no returns, exchanges.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10">
          <GetInTouch />
        </div>
      </CustomContainer>
    </div>
  );
};

export default ContactPage;
