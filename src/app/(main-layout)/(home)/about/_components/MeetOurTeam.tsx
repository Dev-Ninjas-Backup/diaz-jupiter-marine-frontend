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
      <div className="bg-[#E6F2FF] rounded-2xl p-6 md:p-10 lg:p-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 mb-4 rounded-full overflow-hidden border-4 border-white/50">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-base md:text-lg mb-1 text-gray-800">
                {member.name}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;

