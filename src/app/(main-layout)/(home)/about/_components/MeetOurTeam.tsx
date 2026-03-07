'use client';

import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';
import { getTeamMembers, TeamMember } from '@/services/about/about';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const MeetOurTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

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
                className="flex flex-col items-center text-center cursor-pointer group"
                onClick={() => setSelectedMember(member)}
              >
                <div
                  className={`relative mb-4 rounded-full overflow-hidden border-4 border-white/50 transition-transform group-hover:scale-105 ${
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
                <h3 className="font-bold mb-1 text-gray-800 text-base md:text-lg group-hover:text-blue-600 transition-colors">
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

      {/* Member Details Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={selectedMember.image?.url || ''}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="pt-20 px-6 pb-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedMember.name}
                </h3>
                <p className="text-blue-600 font-medium text-lg">
                  {selectedMember.designation}
                </p>
              </div>

              {selectedMember.bio && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Biography
                  </h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              {!selectedMember.bio && (
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">
                    No biography available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MeetOurTeam;
