import { AlertTriangle } from 'lucide-react';
import { useI18n } from '../../contexts/useI18n';

interface ErrorStateProps {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
}

const ErrorState = ({ title, description, retryLabel, onRetry }: ErrorStateProps) => {
  const { t } = useI18n();
  return (
    <div className="card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-8 text-center shadow-card density-pad">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-danger/10 text-danger">
        <AlertTriangle size={20} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-base-900 dark:text-base-100">{title ?? t('state.errorTitle')}</h3>
      <p className="mt-2 text-sm text-base-500">
        {description ?? t('state.errorDescription')}
      </p>
      {retryLabel && onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-xl border border-base-200 dark:border-base-700 px-4 py-2 text-sm"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
