import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useNotifications } from '../hooks/useNotifications';
import { saveNotifications } from '../utils/notifications';
import { useI18n } from '../contexts/useI18n';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import Skeleton from '../components/common/Skeleton';

const MessageCenterPage = () => {
  const items = useNotifications();
  const { t } = useI18n();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const list = filter === 'unread' ? items.filter((item) => !item.read) : items;
    if (!query) return list;
    return list.filter((item) =>
      `${item.title} ${item.detail}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, filter, query]);

  const markAllRead = () => {
    const next = items.map((item) => ({ ...item, read: true }));
    saveNotifications(next);
  };

  const toggleRead = (id: string) => {
    const next = items.map((item) => (item.id === id ? { ...item, read: !item.read } : item));
    saveNotifications(next);
  };

  const hasError = query.trim().toLowerCase().includes('error');

  const renderList = () => {
    if (loading) {
      return (
        <div className="card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-5 shadow-card density-pad">
          <Skeleton lines={4} />
        </div>
      );
    }

    if (hasError) {
      return (
        <ErrorState
          title={t('state.errorTitle')}
          description={t('state.errorDescription')}
          retryLabel={t('state.errorAction')}
          onRetry={() => setQuery('')}
        />
      );
    }

    if (filtered.length === 0) {
      return (
        <EmptyState
          description={t('state.emptyDescription')}
          actionLabel={t('state.emptyAction')}
          onAction={() => {
            setQuery('');
            setFilter('all');
          }}
        />
      );
    }

    return filtered.map((item) => (
      <div
        key={item.id}
        className={clsx(
          'card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-5 shadow-card',
          !item.read && 'ring-1 ring-brand-500/40'
        )}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-base font-semibold text-base-900 dark:text-base-100">{item.title}</h3>
            <p className="text-sm text-base-500">{item.detail}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                'rounded-full px-3 py-1 text-xs font-semibold',
                item.read ? 'bg-base-100 dark:bg-base-700/60 text-base-500' : 'bg-brand-500/10 text-brand-600'
              )}
            >
              {item.read ? t('messages.read') : t('messages.unread')}
            </span>
            <button
              onClick={() => toggleRead(item.id)}
              className="rounded-xl border border-base-200 dark:border-base-700 px-3 py-1 text-xs"
            >
              {item.read ? t('messages.markUnread') : t('messages.markRead')}
            </button>
          </div>
        </div>
        <p className="mt-3 text-xs text-base-400">{item.time}</p>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-base-500">{t('messages.section')}</p>
          <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('messages.title')}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setFilter('all')}
            className={clsx(
              'rounded-xl px-4 py-2 text-sm',
              filter === 'all'
                ? 'bg-brand-500 text-white'
                : 'border border-base-200 dark:border-base-700 text-base-500'
            )}
          >
            {t('messages.filterAll')}
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
            {t('messages.filterUnread')}
          </button>
          <button
            onClick={markAllRead}
            className="rounded-xl border border-base-200 dark:border-base-700 px-4 py-2 text-sm"
          >
            {t('messages.markAllRead')}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-4 shadow-card">
        <input
          className="w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
          placeholder={t('messages.searchPlaceholder')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="space-y-4">{renderList()}</div>
    </div>
  );
};

export default MessageCenterPage;
