import { Bell, LogOut, Moon, Search, Settings, Sun, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useNotifications } from '../../hooks/useNotifications';
import { logout } from '../../utils/auth';
import clsx from 'clsx';
import { useI18n } from '../../contexts/useI18n';

interface TopbarProps {
  onMenuClick: () => void;
  onCommandClick: () => void;
}

const Topbar = ({ onMenuClick, onCommandClick }: TopbarProps) => {
  const navigate = useNavigate();
  const { mode, toggle } = useDarkMode();
  const notifications = useNotifications();
  const unreadCount = notifications.filter((item) => !item.read).length;
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between gap-4 density-pad border-b border-base-200 dark:border-base-700 bg-white/80 dark:bg-base-900/80 backdrop-blur px-4 py-3 lg:px-6">
      <div className="flex items-center gap-3 density-pad">
        <button
          onClick={onMenuClick}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-base-200 dark:border-base-700"
          aria-label="Open menu"
        >
          <span className="text-lg" aria-hidden="true">☰</span>
        </button>
        <button
          onClick={onCommandClick}
          className="hidden md:flex items-center gap-2 density-pad rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-800 px-3 py-2 text-sm text-base-400 hover:text-base-600 dark:hover:text-base-200"
          aria-label={t('common.openCommandPalette')}
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="text-base-500">{t('common.searchPlaceholder')}</span>
          <span className="ml-6 rounded-md border border-base-200 dark:border-base-700 bg-white/70 dark:bg-base-900/70 px-2 py-0.5 text-xs text-base-400">
            ⌘K
          </span>
        </button>
      </div>

      <div className="flex items-center gap-3 density-pad">
        <button
          onClick={onCommandClick}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-200 dark:border-base-700"
          aria-label={t('common.openCommandPalette')}
        >
          <Search size={18} aria-hidden="true" />
        </button>
        <button
          onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-base-200 dark:border-base-700 px-3 text-xs font-semibold text-base-500"
          aria-label={t('common.language')}
        >
          {locale === 'zh' ? 'EN' : '中文'}
        </button>
        <button
          onClick={toggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-200 dark:border-base-700"
          aria-label={t('common.toggleDark')}
        >
          {mode === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>

        <div className="relative">
          <button
            onClick={() => navigate('/messages')}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-200 dark:border-base-700"
            aria-label="Notifications"
          >
            <Bell size={18} aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 density-pad h-2 w-2 rounded-full bg-danger" />
            )}
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu((prev) => !prev)}
            className="flex items-center gap-3 density-pad rounded-xl border border-base-200 dark:border-base-700 px-3 py-2"
            aria-label="User menu"
          >
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="Jordan Lee"
              className="h-8 w-8 rounded-full"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-base-800 dark:text-base-100">Jordan Lee</p>
              <p className="text-xs text-base-400">Admin</p>
            </div>
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 shadow-card density-pad p-2 z-20" role="menu" aria-label="User menu">
              {[
                { label: 'Profile', icon: User, action: () => navigate('/profile') },
                { label: 'Settings', icon: Settings, action: () => navigate('/settings') },
                { label: 'Logout', icon: LogOut, danger: true, action: handleLogout },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    role="menuitem"
                    className={clsx(
                      'flex w-full items-center gap-3 density-pad rounded-lg px-3 py-2 text-sm',
                      item.danger
                        ? 'text-danger hover:bg-danger/10'
                        : 'text-base-600 hover:bg-base-100 dark:hover:bg-base-700/60'
                    )}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
