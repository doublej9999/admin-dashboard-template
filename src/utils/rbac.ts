import type { PermissionKey, RoleRecord } from '../data/roles';
import { mockRoles } from '../data/roles';

const ROLE_KEY = 'admin-dashboard-role';
const ROLE_DATA_KEY = 'admin-dashboard-roles';

export const getRoles = (): RoleRecord[] => {
  const stored = localStorage.getItem(ROLE_DATA_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as RoleRecord[];
    } catch {
      return mockRoles;
    }
  }
  return mockRoles;
};

export const setRoles = (roles: RoleRecord[]) => {
  localStorage.setItem(ROLE_DATA_KEY, JSON.stringify(roles));
};

export const getCurrentRole = (): RoleRecord => {
  const stored = localStorage.getItem(ROLE_KEY) as RoleRecord['name'] | null;
  const roles = getRoles();
  const role = roles.find((item) => item.name === stored);
  return role ?? roles[0];
};

export const setCurrentRole = (roleName: RoleRecord['name']) => {
  localStorage.setItem(ROLE_KEY, roleName);
};

export const hasPermission = (permission: PermissionKey) => {
  const role = getCurrentRole();
  return role.permissions.includes(permission);
};
