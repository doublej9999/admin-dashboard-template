import type { PermissionKey } from '../data/roles';

export type MenuKey = 'dashboard' | 'analytics' | 'users' | 'roles' | 'settings';

export const menuPermissionMap: Record<MenuKey, PermissionKey> = {
  dashboard: 'dashboard:view',
  analytics: 'analytics:view',
  users: 'users:view',
  roles: 'users:edit',
  settings: 'settings:view',
};
