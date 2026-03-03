import type { PermissionKey } from '../data/roles';

export type MenuKey =
  | 'dashboard'
  | 'analytics'
  | 'users'
  | 'roles'
  | 'notifications'
  | 'messages'
  | 'files'
  | 'audit-logs'
  | 'settings';

export const menuPermissionMap: Record<MenuKey, PermissionKey> = {
  dashboard: 'dashboard:view',
  analytics: 'analytics:view',
  users: 'users:view',
  roles: 'users:edit',
  notifications: 'dashboard:view',
  messages: 'dashboard:view',
  files: 'dashboard:view',
  'audit-logs': 'users:edit',
  settings: 'settings:view',
};
