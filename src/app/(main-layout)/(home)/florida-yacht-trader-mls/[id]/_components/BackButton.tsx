'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const router = useRouter();

  return (
    <FaArrowLeft className="cursor-pointer" onClick={() => router.back()} />
  );
};

export default BackButton;
