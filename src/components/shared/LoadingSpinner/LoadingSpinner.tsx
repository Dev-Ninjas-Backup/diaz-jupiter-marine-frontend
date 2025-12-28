import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center min-h-screen">
      <Loader2 className="w-6 h-6 animate-spin mx-auto text-red-600" />
      {message && <p className="mt-2 text-gray-600">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
