import type { UserRecord } from '../../data/users';
import { useEffect, useRef } from 'react';

interface UserFormModalProps {
  open: boolean;
  initial?: UserRecord | null;
  onClose: () => void;
  onSubmit: (values: Omit<UserRecord, 'id'>) => void;
}

const UserFormModal = ({ open, initial, onClose, onSubmit }: UserFormModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const next = {
      name: initial?.name ?? '',
      email: initial?.email ?? '',
      role: initial?.role ?? 'Viewer',
      status: initial?.status ?? 'active',
    };

    if (nameRef.current) nameRef.current.value = next.name;
    if (emailRef.current) emailRef.current.value = next.email;
    if (roleRef.current) roleRef.current.value = next.role;
    if (statusRef.current) statusRef.current.value = next.status;
  }, [initial, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg card-shell bg-white dark:bg-base-800 p-6 density-pad shadow-card density-pad border border-base-200 dark:border-base-700">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-base-900 dark:text-base-100">
            {initial ? 'Edit user' : 'Add new user'}
          </h3>
          <p className="text-sm text-base-500">Fill in the details below.</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-base-500">Name</label>
            <input
              ref={nameRef}
              className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
              defaultValue={initial?.name ?? ''}
            />
          </div>
          <div>
            <label className="text-sm text-base-500">Email</label>
            <input
              ref={emailRef}
              className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
              defaultValue={initial?.email ?? ''}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 density-pad md:grid-cols-2">
            <div>
              <label className="text-sm text-base-500">Role</label>
              <select
                ref={roleRef}
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                defaultValue={initial?.role ?? 'Viewer'}
              >
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-base-500">Status</label>
              <select
                ref={statusRef}
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                defaultValue={initial?.status ?? 'active'}
              >
                <option value="active">Active</option>
                <option value="invited">Invited</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3 density-pad">
          <button
            onClick={onClose}
            className="rounded-xl border border-base-200 dark:border-base-700 px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSubmit({
                name: nameRef.current?.value ?? '',
                email: emailRef.current?.value ?? '',
                role: (roleRef.current?.value as UserRecord['role']) ?? 'Viewer',
                status: (statusRef.current?.value as UserRecord['status']) ?? 'active',
              })
            }
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
