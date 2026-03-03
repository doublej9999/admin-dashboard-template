import type { UserRecord } from '../../data/users';
import { useEffect, useState } from 'react';

interface UserFormModalProps {
  open: boolean;
  initial?: UserRecord | null;
  onClose: () => void;
  onSubmit: (values: Omit<UserRecord, 'id'>) => void;
}

const UserFormModal = ({ open, initial, onClose, onSubmit }: UserFormModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRecord['role']>('Viewer');
  const [status, setStatus] = useState<UserRecord['status']>('active');

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setEmail(initial.email);
      setRole(initial.role);
      setStatus(initial.status);
    } else {
      setName('');
      setEmail('');
      setRole('Viewer');
      setStatus('active');
    }
  }, [initial]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-base-800 p-6 shadow-card border border-base-200 dark:border-base-700">
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
              className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-base-500">Email</label>
            <input
              className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-base-500">Role</label>
              <select
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                value={role}
                onChange={(event) => setRole(event.target.value as UserRecord['role'])}
              >
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-base-500">Status</label>
              <select
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                value={status}
                onChange={(event) => setStatus(event.target.value as UserRecord['status'])}
              >
                <option value="active">Active</option>
                <option value="invited">Invited</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-base-200 dark:border-base-700 px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit({ name, email, role, status })}
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
