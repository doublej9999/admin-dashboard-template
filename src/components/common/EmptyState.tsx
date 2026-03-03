import { Inbox } from 'lucide-react';
import { useI18n } from '../../contexts/useI18n';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => {
  const { t } = useI18n();
  return (
    <div className="card-shell border border-dashed border-base-300 dark:border-base-700 bg-white dark:bg-base-800 p-8 text-center shadow-card density-pad">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-base-100 dark:bg-base-700/60 text-base-400">
        <Inbox size={20} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-base-900 dark:text-base-100">{title ?? t('state.emptyTitle')}</h3>
      <p className="mt-2 text-sm text-base-500">
        {description ?? t('state.emptyDescription')}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
