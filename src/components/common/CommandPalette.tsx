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

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette = ({ open, onClose }: CommandPaletteProps) => {
  const navigate = useNavigate();
  const { mode, toggle } = useDarkMode();
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
      { label: 'Dashboard', description: 'Overview and KPIs', icon: LayoutGrid, action: () => navigate('/dashboard') },
      { label: 'Analytics', description: 'Charts and insights', icon: LineChart, action: () => navigate('/analytics') },
      { label: 'Users', description: 'User management', icon: Users, action: () => navigate('/users') },
      { label: 'Roles', description: 'Roles & permissions', icon: Shield, action: () => navigate('/roles') },
      { label: 'Notifications', description: 'Alerts and updates', icon: Bell, action: () => navigate('/notifications') },
      { label: 'Files', description: 'File manager', icon: FolderOpen, action: () => navigate('/files') },
      { label: 'Audit Logs', description: 'Recent activity', icon: ClipboardList, action: () => navigate('/audit-logs') },
      { label: 'Settings', description: 'Workspace settings', icon: Settings, action: () => navigate('/settings') },
      {
        label: mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        description: 'Toggle appearance',
        icon: mode === 'dark' ? Sun : Moon,
        action: () => toggle(),
      },
    ],
    [navigate, mode, toggle]
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
      <div className="w-full max-w-2xl rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-900 shadow-card">
        <div className="border-b border-base-200 dark:border-base-700 px-5 py-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search or type a command"
            className="w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-800 px-4 py-2 text-sm text-base-700 dark:text-base-100 outline-none focus:border-brand-500"
          />
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-3">
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-sm text-base-500">No commands found.</div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleRun(index)}
                  className={clsx(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition',
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
