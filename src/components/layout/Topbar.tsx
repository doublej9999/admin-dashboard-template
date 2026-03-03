import { Bell, LogOut, Moon, Search, Settings, Sun, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../../data/mock';
import { useDarkMode } from '../../hooks/useDarkMode';
import { logout } from '../../utils/auth';
import clsx from 'clsx';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
  const navigate = useNavigate();
  const { mode, toggle } = useDarkMode();
  const [showNotifications, setShowNotifications] = useState(false);
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
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-400" />
          <input
            className="w-72 rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-800 px-9 py-2 text-sm outline-none focus:border-brand-500"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-200 dark:border-base-700"
          aria-label="Toggle dark mode"
        >
          {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-base-200 dark:border-base-700"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 shadow-card p-3 z-20">
              <p className="text-xs font-semibold text-base-500 uppercase tracking-wide">Notifications</p>
              <div className="mt-3 space-y-3">
                {notifications.map((item) => (
                  <div key={item.id} className="text-sm">
                    <p className="text-base-700 dark:text-base-200">{item.title}</p>
                    <p className="text-xs text-base-400">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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
