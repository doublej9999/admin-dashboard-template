import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { mockUsers } from '../../data/users';
import type { UserRecord } from '../../data/users';
import { usePagination } from '../../hooks/usePagination';
import UserFormModal from './UserFormModal';

const statusStyles: Record<UserRecord['status'], string> = {
  active: 'bg-success/10 text-success',
  invited: 'bg-warning/10 text-warning',
  suspended: 'bg-danger/10 text-danger',
};

const UsersTable = () => {
  const [users, setUsers] = useState<UserRecord[]>(mockUsers);
  const [query, setQuery] = useState('');
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return users.filter(
      (user) => user.name.toLowerCase().includes(lower) || user.email.toLowerCase().includes(lower)
    );
  }, [users, query]);

  const { page, setPage, totalPages, pageData } = usePagination(filtered, 6);

  const handleCreate = () => {
    setEditingUser(null);
    setOpenModal(true);
  };

  const handleEdit = (user: UserRecord) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  const handleDelete = (user: UserRecord) => {
    const confirmed = window.confirm(`Delete ${user.name}?`);
    if (!confirmed) return;
    setUsers((prev) => prev.filter((item) => item.id !== user.id));
  };

  const handleSubmit = (values: Omit<UserRecord, 'id'>) => {
    if (editingUser) {
      setUsers((prev) => prev.map((item) => (item.id === editingUser.id ? { ...item, ...values } : item)));
    } else {
      const nextId = `U-${Math.floor(Math.random() * 9000) + 1000}`;
      setUsers((prev) => [{ id: nextId, ...values }, ...prev]);
    }
    setOpenModal(false);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-base-800 border border-base-200 dark:border-base-700 p-6 shadow-card">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">Users</h2>
          <p className="text-sm text-base-500">Manage your team members.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            placeholder="Search name or email"
            className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            onClick={handleCreate}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Add user
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase text-base-400 border-b border-base-200 dark:border-base-700">
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Role</th>
              <th className="py-3">Status</th>
              <th className="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((user) => (
              <tr key={user.id} className="border-b border-base-100 dark:border-base-700/60">
                <td className="py-3">
                  <p className="font-semibold text-base-800 dark:text-base-100">{user.name}</p>
                  <p className="text-xs text-base-400">{user.id}</p>
                </td>
                <td className="py-3 text-base-500">{user.email}</td>
                <td className="py-3 text-base-500">{user.role}</td>
                <td className="py-3">
                  <span className={clsx('inline-flex rounded-full px-2 py-1 text-xs font-semibold', statusStyles[user.status])}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="rounded-lg border border-base-200 dark:border-base-700 px-3 py-1 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="rounded-lg border border-danger/40 text-danger px-3 py-1 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-base-400">Page {page} of {totalPages}</p>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={clsx(
                  'rounded-lg px-3 py-1 text-xs',
                  pageNumber === page
                    ? 'bg-brand-500 text-white'
                    : 'border border-base-200 dark:border-base-700 text-base-500'
                )}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>

      <UserFormModal
        open={openModal}
        initial={editingUser}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UsersTable;
