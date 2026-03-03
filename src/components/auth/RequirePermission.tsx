import { Navigate } from 'react-router-dom';
import type { PermissionKey } from '../../data/roles';
import { hasPermission } from '../../utils/rbac';

interface RequirePermissionProps {
  permission: PermissionKey;
  children: React.ReactElement;
  redirectTo?: string;
}

const RequirePermission = ({ permission, children, redirectTo = '/dashboard' }: RequirePermissionProps) => {
  if (!hasPermission(permission)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default RequirePermission;
