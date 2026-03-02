export type PermissionKey =
  | 'dashboard:view'
  | 'analytics:view'
  | 'users:view'
  | 'users:create'
  | 'users:edit'
  | 'users:delete'
  | 'settings:view';

export interface RoleRecord {
  id: string;
  name: 'Admin' | 'Editor' | 'Viewer';
  permissions: PermissionKey[];
}

export const permissionGroups: Array<{ label: string; items: { key: PermissionKey; label: string }[] }> = [
  {
    label: 'Dashboard',
    items: [{ key: 'dashboard:view', label: 'View dashboard' }],
  },
  {
    label: 'Analytics',
    items: [{ key: 'analytics:view', label: 'View analytics' }],
  },
  {
    label: 'Users',
    items: [
      { key: 'users:view', label: 'View users' },
      { key: 'users:create', label: 'Create users' },
      { key: 'users:edit', label: 'Edit users' },
      { key: 'users:delete', label: 'Delete users' },
    ],
  },
  {
    label: 'Settings',
    items: [{ key: 'settings:view', label: 'View settings' }],
  },
];

export const mockRoles: RoleRecord[] = [
  {
    id: 'R-1',
    name: 'Admin',
    permissions: [
      'dashboard:view',
      'analytics:view',
      'users:view',
      'users:create',
      'users:edit',
      'users:delete',
      'settings:view',
    ],
  },
  {
    id: 'R-2',
    name: 'Editor',
    permissions: ['dashboard:view', 'analytics:view', 'users:view', 'users:edit'],
  },
  {
    id: 'R-3',
    name: 'Viewer',
    permissions: ['dashboard:view', 'users:view'],
  },
];
