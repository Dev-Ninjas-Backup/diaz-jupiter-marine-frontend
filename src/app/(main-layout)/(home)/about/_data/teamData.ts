export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export const teamDescription =
  'our success is built upon the expertise, dedication, and collaborative spirit of our talented team. Meet the individuals who bring passion and professionalism to every project:';

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Jane Smith',
    role: 'Financial Controller',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Project Manager',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: 3,
    name: 'Nicolas Chakma',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    role: 'Construction Foreman',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
  {
    id: 5,
    name: 'David Brown',
    role: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  },
];
