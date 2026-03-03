import { NavLink } from 'react-router-dom';
import {
  Bell,
  ClipboardList,
  FolderOpen,
  LayoutGrid,
  LineChart,
  MessageCircle,
  Settings,
  Shield,
  Users,
  User,
} from 'lucide-react';
import clsx from 'clsx';
import { hasPermission } from '../../utils/rbac';
import { menuPermissionMap, type MenuKey } from '../../utils/permissions';
import { useRole } from '../../hooks/useRole';
import { useI18n } from '../../contexts/I18nContext';
import { translations } from '../../i18n/translations';

const navItems: Array<{ label: string; to: string; icon: typeof LayoutGrid; key: MenuKey }> = [
  { label: 'nav.dashboard', to: '/dashboard', icon: LayoutGrid, key: 'dashboard' },
  { label: 'nav.analytics', to: '/analytics', icon: LineChart, key: 'analytics' },
  { label: 'nav.users', to: '/users', icon: Users, key: 'users' },
  { label: 'nav.roles', to: '/roles', icon: Shield, key: 'roles' },
  { label: 'nav.notifications', to: '/notifications', icon: Bell, key: 'notifications' },
  { label: 'nav.messages', to: '/messages', icon: MessageCircle, key: 'messages' },
  { label: 'nav.profile', to: '/profile', icon: User, key: 'profile' },
  { label: 'nav.org', to: '/org', icon: ClipboardList, key: 'org' },
  { label: 'nav.files', to: '/files', icon: FolderOpen, key: 'files' },
  { label: 'nav.auditLogs', to: '/audit-logs', icon: ClipboardList, key: 'audit-logs' },
  { label: 'nav.kanban', to: '/kanban', icon: LayoutGrid, key: 'analytics' },
  { label: 'nav.settings', to: '/settings', icon: Settings, key: 'settings' },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
}

const Sidebar = ({ collapsed, onCollapse }: SidebarProps) => {
  useRole();
  const { t } = useI18n();
  return (
    <aside
      className={clsx(
        'h-full bg-white dark:bg-base-800 border-r border-base-200 dark:border-base-700 flex flex-col transition-all duration-200',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 grid place-items-center font-semibold">
            AD
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-base-900 dark:text-base-100">AdminKit</p>
              <p className="text-xs text-base-400">Modern Console</p>
            </div>
          )}
        </div>
        <button
          onClick={onCollapse}
          className="hidden lg:flex h-9 w-9 items-center justify-center rounded-lg border border-base-200 dark:border-base-700 text-base-500 hover:text-base-900 dark:hover:text-base-100"
          aria-label="Toggle sidebar"
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {navItems
          .filter((item) => hasPermission(menuPermissionMap[item.key]))
          .map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300'
                      : 'text-base-500 hover:bg-base-100 dark:hover:bg-base-700/60'
                  )
                }
              >
                <Icon size={20} aria-hidden="true" />
                {!collapsed && <span>{t(item.label as keyof typeof translations)}</span>}
              </NavLink>
            );
          })}
      </nav>

      <div className="px-4 py-4">
        <div className="rounded-xl bg-base-100 dark:bg-base-700/60 p-3 text-xs text-base-500">
          {!collapsed ? (
            <div>
              <p className="font-semibold text-base-700 dark:text-base-200">Storage</p>
              <p>68% used</p>
            </div>
          ) : (
            <p className="text-center">68%</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
