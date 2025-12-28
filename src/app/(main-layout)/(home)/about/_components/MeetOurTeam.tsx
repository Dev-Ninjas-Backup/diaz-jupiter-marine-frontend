import { teamDescription, teamMembers } from '../_data/teamData';

const MeetOurTeam = () => {
  return (
    <section className="py-10 md:py-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
        MEET OUR DEDICATED TEAM
      </h2>

      <div className="max-w-3xl mx-auto mb-10 md:mb-16">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center">
          {teamDescription}
        </p>
      </div>

      {/* Team Members - Light Blue Background */}
      <div className="bg-[#DCFCFF] rounded-2xl p-6 md:p-10 lg:p-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {teamMembers.map((member, index) => {
            const isMiddle = index === 2; // Nicolas Chakma (Founder & CEO)
            return (
              <div
                key={member.id}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`relative mb-4 rounded-full overflow-hidden border-4 border-white/50 ${
                    isMiddle
                      ? 'w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48'
                      : 'w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36'
                  }`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover ${
                      isMiddle ? 'brightness-110 contrast-110' : ''
                    }`}
                  />
                </div>
                <h3 className="font-bold mb-1 text-gray-800 text-base md:text-lg">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {member.role}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
