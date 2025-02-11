import { XCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, className = '', onRetry }: ErrorMessageProps) => {
  return (
    <div className={`bg-red-500/10 border border-red-500/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
        <div className="flex-1">
          <p className="text-red-400">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-red-400 hover:text-red-300 underline underline-offset-2"
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { ErrorMessage };
export type { ErrorMessageProps }; 