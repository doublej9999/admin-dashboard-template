import { useState } from 'react';
import RoleCard from '../components/roles/RoleCard';
import type { PermissionKey, RoleRecord } from '../data/roles';
import { mockRoles } from '../data/roles';
import { getRoles, setCurrentRole, setRoles as persistRoles } from '../utils/rbac';
import { usePermissions } from '../hooks/usePermissions';
import { useI18n } from '../contexts/I18nContext';

const RolesPage = () => {
  const [roles, setRoles] = useState<RoleRecord[]>(getRoles() ?? mockRoles);
  const [activeRole, setActiveRole] = useState<RoleRecord['name']>('Editor');
  const { can } = usePermissions();
  const { t } = useI18n();

  const handleToggle = (roleName: RoleRecord['name'], permission: PermissionKey) => {
    setRoles((prev) => {
      const next = prev.map((role) => {
        if (role.name !== roleName) return role;
        const exists = role.permissions.includes(permission);
        return {
          ...role,
          permissions: exists
            ? role.permissions.filter((item) => item !== permission)
            : [...role.permissions, permission],
        };
      });
      persistRoles(next);
      return next;
    });
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roleName = event.target.value as RoleRecord['name'];
    setActiveRole(roleName);
    setCurrentRole(roleName);
    window.dispatchEvent(new Event('role-change'));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-base-500">{t('audit.security')}</p>
          <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('roles.title')}</h1>
        </div>
        <div className="rounded-xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 px-4 py-2 text-sm text-base-500">
          {t('roles.currentRole')}
          <select
            className="ml-2 bg-transparent text-base-700 dark:text-base-100"
            onChange={handleRoleChange}
            value={activeRole}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
        <p className="text-sm text-base-500">{t('roles.permissionPreview')}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            disabled={!can('users:create')}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              can('users:create')
                ? 'bg-brand-500 text-white'
                : 'bg-base-100 text-base-400 cursor-not-allowed'
            }`}
          >
            {t('roles.createUser')}
          </button>
          <span className="text-xs text-base-400">{t('roles.buttonDisabledInfo')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} onToggle={handleToggle} />
        ))}
      </div>
    </div>
  );
};

export default RolesPage;
