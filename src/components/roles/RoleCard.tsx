import type { PermissionKey, RoleRecord } from '../../data/roles';
import { permissionGroups } from '../../data/roles';
import clsx from 'clsx';

interface RoleCardProps {
  role: RoleRecord;
  onToggle: (roleName: RoleRecord['name'], permission: PermissionKey) => void;
}

const RoleCard = ({ role, onToggle }: RoleCardProps) => {
  return (
    <div className="card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 density-pad shadow-card density-pad">
      <div className="mb-4">
        <p className="text-sm text-base-500">Role</p>
        <h3 className="text-lg font-semibold text-base-900 dark:text-base-100">{role.name}</h3>
      </div>
      <div className="space-y-4">
        {permissionGroups.map((group) => (
          <div key={group.label}>
            <p className="text-xs uppercase tracking-wide text-base-400">{group.label}</p>
            <div className="mt-2 space-y-2">
              {group.items.map((item) => {
                const checked = role.permissions.includes(item.key);
                return (
                  <label key={item.key} className="flex items-center justify-between text-sm text-base-600">
                    <span>{item.label}</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(role.name, item.key)}
                      className={clsx(
                        'h-4 w-4 rounded border-base-300 text-brand-500',
                        checked ? 'bg-brand-500' : 'bg-base-100'
                      )}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleCard;
