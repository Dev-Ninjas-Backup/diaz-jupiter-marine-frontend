'use client';

import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';
import { getTeamMembers, TeamMember } from '@/services/about/about';
import { useEffect, useState } from 'react';

const MeetOurTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTeamMembers();
        if (data && data.length > 0) {
          // Filter active members and sort by order
          const activeMembers = data
            .filter((member) => member.isActive)
            .sort((a, b) => a.order - b.order);

          // Find CEO and place in middle
          const ceoIndex = activeMembers.findIndex((member) =>
            member.designation.toLowerCase().includes('ceo'),
          );

          if (ceoIndex !== -1) {
            const ceo = activeMembers[ceoIndex];
            const otherMembers = activeMembers.filter(
              (_, index) => index !== ceoIndex,
            );

            // Calculate middle position
            const middleIndex = Math.floor(otherMembers.length / 2);
            const arrangedMembers = [
              ...otherMembers.slice(0, middleIndex),
              ceo,
              ...otherMembers.slice(middleIndex),
            ];

            setTeamMembers(arrangedMembers);
          } else {
            setTeamMembers(activeMembers);
          }
        } else {
          setError('No team members found');
        }
      } catch (err) {
        setError('Error loading team members');
        console.error('Error fetching team members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const teamDescription =
    'our success is built upon the expertise, dedication, and collaborative spirit of our talented team. Meet the individuals who bring passion and professionalism to every project:';

  if (loading) {
    return (
      <section className="py-10 md:py-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
          MEET OUR DEDICATED TEAM
        </h2>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner message="Loading team members..." />
        </div>
      </section>
    );
  }

  if (error || !teamMembers || teamMembers.length === 0) {
    return (
      <section className="py-10 md:py-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
          MEET OUR DEDICATED TEAM
        </h2>
        <NoDataFound
          dataTitle="team members"
          noDataText={error || 'No team members found.'}
        />
      </section>
    );
  }

  // Find CEO index in arranged array
  const ceoIndex = teamMembers.findIndex((member) =>
    member.designation.toLowerCase().includes('ceo'),
  );

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
            const isMiddle = index === ceoIndex;
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
                    src={member.image?.url || ''}
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
                  {member.designation}
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
