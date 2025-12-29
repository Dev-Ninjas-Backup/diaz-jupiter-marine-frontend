import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  message,
  size = 'md',
  fullScreen = true,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const containerClass = fullScreen
    ? 'flex flex-col items-center justify-center p-6 text-center min-h-screen'
    : 'flex flex-col items-center justify-center p-6 text-center';

  return (
    <div className={containerClass}>
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>

        {/* Spinner */}
        <div className="relative">
          <Loader2
            className={`${sizeClasses[size]} animate-spin text-blue-600`}
            strokeWidth={2.5}
          />
        </div>
      </div>

      {message && (
        <p className="mt-4 text-gray-700 font-medium text-base animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
