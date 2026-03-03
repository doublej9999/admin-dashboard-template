import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  Bell,
  ClipboardList,
  FolderOpen,
  LayoutGrid,
  LineChart,
  Moon,
  Settings,
  Shield,
  Sun,
  Users,
} from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useI18n } from '../../contexts/I18nContext';

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette = ({ open, onClose }: CommandPaletteProps) => {
  const navigate = useNavigate();
  const { mode, toggle } = useDarkMode();
  const { locale, setLocale, t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const items = useMemo(
    () => [
      { label: t('nav.dashboard'), description: t('dashboard.overview'), icon: LayoutGrid, action: () => navigate('/dashboard') },
      { label: t('nav.analytics'), description: 'Charts & KPIs', icon: LineChart, action: () => navigate('/analytics') },
      { label: t('nav.users'), description: t('users.title'), icon: Users, action: () => navigate('/users') },
      { label: t('nav.roles'), description: t('roles.title'), icon: Shield, action: () => navigate('/roles') },
      { label: t('nav.notifications'), description: t('notifications.title'), icon: Bell, action: () => navigate('/notifications') },
      { label: t('nav.files'), description: t('files.title'), icon: FolderOpen, action: () => navigate('/files') },
      { label: t('nav.auditLogs'), description: t('audit.title'), icon: ClipboardList, action: () => navigate('/audit-logs') },
      { label: t('nav.settings'), description: t('settings.title'), icon: Settings, action: () => navigate('/settings') },
      {
        label: locale === 'zh' ? t('common.switchToEnglish') : t('common.switchToChinese'),
        description: t('common.language'),
        icon: locale === 'zh' ? Sun : Moon,
        action: () => setLocale(locale === 'zh' ? 'en' : 'zh'),
      },
      {
        label: mode === 'dark' ? t('common.switchToEnglish') : t('common.switchToChinese'),
        description: t('common.toggleDark'),
        icon: mode === 'dark' ? Sun : Moon,
        action: () => toggle(),
      },
    ],
    [navigate, mode, toggle, t, setLocale, locale]
  );

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return items;
    return items.filter((item) => item.label.toLowerCase().includes(value) || item.description?.toLowerCase().includes(value));
  }, [items, query]);

  const handleRun = (index: number) => {
    const item = filtered[index];
    if (!item) return;
    item.action();
    onClose();
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      handleRun(activeIndex);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-24 sm:pt-28">
      <div className="w-full max-w-2xl card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-900 shadow-card density-pad">
        <div className="border-b border-base-200 dark:border-base-700 px-5 py-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={t('common.searchPlaceholder')}
            className="w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-800 px-4 py-2 text-sm text-base-700 dark:text-base-100 outline-none focus:border-brand-500"
          />
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-3 density-pad">
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-sm text-base-500">{t('common.noCommands')}</div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleRun(index)}
                  className={clsx(
                    'flex w-full items-center gap-3 density-pad rounded-xl px-4 py-3 text-left text-sm transition',
                    index === activeIndex
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300'
                      : 'text-base-600 hover:bg-base-100 dark:hover:bg-base-800'
                  )}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-base-100 dark:bg-base-800">
                    <Icon size={18} />
                  </span>
                  <span className="flex-1">
                    <span className="font-medium">{item.label}</span>
                    {item.description && (
                      <span className="mt-0.5 block text-xs text-base-400">{item.description}</span>
                    )}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
