import React from 'react';

const CustomContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1540px] mx-auto px-2 w-full h-full">{children}</div>
  );
};

export default CustomContainer;
