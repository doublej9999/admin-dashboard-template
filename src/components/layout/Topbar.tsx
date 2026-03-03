import { Bell, LogOut, Moon, Search, Settings, Sun, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useNotifications } from '../../hooks/useNotifications';
import { logout } from '../../utils/auth';
import clsx from 'clsx';

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between gap-4 border-b border-base-200 dark:border-base-700 bg-white/80 dark:bg-base-900/80 backdrop-blur px-4 py-3 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-base-200 dark:border-base-700"
          aria-label="Open menu"
        >
          <span className="text-lg">☰</span>
        </button>
        <button
          onClick={onCommandClick}
          className="hidden md:flex items-center gap-2 rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-800 px-3 py-2 text-sm text-base-400 hover:text-base-600 dark:hover:text-base-200"
          aria-label="Open command palette"
        >
          <Search className="h-4 w-4" />
          <span className="text-base-500">Search or type a command</span>
          <span className="ml-6 rounded-md border border-base-200 dark:border-base-700 bg-white/70 dark:bg-base-900/70 px-2 py-0.5 text-xs text-base-400">
            ⌘K
          </span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onCommandClick}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-200 dark:border-base-700"
          aria-label="Open command palette"
        >
          <Search size={18} />
        </button>
        <button
          onClick={toggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-200 dark:border-base-700"
          aria-label="Toggle dark mode"
        >
          {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button
            onClick={() => navigate('/notifications')}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-200 dark:border-base-700"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
            )}
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu((prev) => !prev)}
            className="flex items-center gap-3 rounded-xl border border-base-200 dark:border-base-700 px-3 py-2"
            aria-label="User menu"
          >
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="User"
              className="h-8 w-8 rounded-full"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-base-800 dark:text-base-100">Jordan Lee</p>
              <p className="text-xs text-base-400">Admin</p>
            </div>
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 shadow-card p-2 z-20">
              {[
                { label: 'Profile', icon: User, action: () => navigate('/settings') },
                { label: 'Settings', icon: Settings, action: () => navigate('/settings') },
                { label: 'Logout', icon: LogOut, danger: true, action: handleLogout },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className={clsx(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm',
                      item.danger
                        ? 'text-danger hover:bg-danger/10'
                        : 'text-base-600 hover:bg-base-100 dark:hover:bg-base-700/60'
                    )}
                  >
                    <Icon size={16} />
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
