import { useMemo } from 'react';
import type { PermissionKey } from '../data/roles';
import { hasPermission } from '../utils/rbac';

export const usePermissions = () => {
  return useMemo(
    () => ({
      can: (permission: PermissionKey) => hasPermission(permission),
    }),
    []
  );
};
