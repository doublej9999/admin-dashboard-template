import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useNotifications } from '../hooks/useNotifications';
import { saveNotifications } from '../utils/notifications';
import { useI18n } from '../contexts/I18nContext';
import EmptyState from '../components/common/EmptyState';

const NotificationsPage = () => {
  const items = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { t } = useI18n();

  const filtered = useMemo(() => {
    if (filter === 'unread') return items.filter((item) => !item.read);
    return items;
  }, [items, filter]);

  const markAllRead = () => {
    const next = items.map((item) => ({ ...item, read: true }));
    saveNotifications(next);
  };

  const markRead = (id: string) => {
    const next = items.map((item) => (item.id === id ? { ...item, read: true } : item));
    saveNotifications(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 density-pad md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-base-500">{t('notifications.inbox')}</p>
          <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('notifications.title')}</h1>
        </div>
        <div className="flex items-center gap-3 density-pad">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'rounded-xl px-4 py-2 text-sm',
              filter === 'all'
                ? 'bg-brand-500 text-white'
                : 'border border-base-200 dark:border-base-700 text-base-500'
            )}
          >
            {t('notifications.all')}
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={clsx(
              'rounded-xl px-4 py-2 text-sm',
              filter === 'unread'
                ? 'bg-brand-500 text-white'
                : 'border border-base-200 dark:border-base-700 text-base-500'
            )}
          >
            {t('notifications.unread')}
          </button>
          <button
            onClick={markAllRead}
            className="rounded-xl border border-base-200 dark:border-base-700 px-4 py-2 text-sm"
          >
            {t('notifications.markAllRead')}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <EmptyState
            title={t('state.emptyTitle')}
            description={t('state.emptyDescription')}
            actionLabel={t('state.emptyAction')}
            onAction={() => setFilter('all')}
          />
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={clsx(
                'card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-5 density-pad shadow-card',
                !item.read && 'ring-1 ring-brand-500/40'
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-base-900 dark:text-base-100">{item.title}</h3>
                  <p className="text-sm text-base-500">{item.detail}</p>
                </div>
                {!item.read && (
                  <button
                    onClick={() => markRead(item.id)}
                    className="rounded-xl border border-base-200 dark:border-base-700 px-3 py-1 text-xs"
                  >
                    {t('notifications.markRead')}
                  </button>
                )}
              </div>
              <p className="mt-3 text-xs text-base-400">{item.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
