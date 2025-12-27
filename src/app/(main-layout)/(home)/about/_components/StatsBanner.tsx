import React from 'react';

interface StatItem {
  id: number;
  number: string;
  label: string;
}

const StatsBanner: React.FC = () => {
  const stats: StatItem[] = [
    {
      id: 1,
      number: '24',
      label: 'Years of Yachting Excellence',
    },
    {
      id: 2,
      number: '2000',
      label: 'Boats Sold in 2024',
    },
    {
      id: 3,
      number: "1000'S",
      label: 'of Listings viewed monthly',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* মেইন কন্টেইনার */}
      <div className="bg-[#DCFCFF] rounded-[40px] py-12 px-6 flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center flex flex-col items-center">
            {/* সংখ্যা */}
            <h2 className="text-4xl md:text-5xl font-bold text-[#002127] mb-2">
              {stat.number}
            </h2>
            {/* নিচের লেখা */}
            <p className="text-gray-600 text-sm md:text-base max-w-[180px] leading-snug">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBanner;