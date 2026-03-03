import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { mockUsers } from '../../data/users';
import type { UserRecord } from '../../data/users';
import { useI18n } from '../../contexts/I18nContext';
import DataTable, { type DataTableColumn } from '../common/DataTable';
import UserFormModal from './UserFormModal';

const statusStyles: Record<UserRecord['status'], string> = {
  active: 'bg-success/10 text-success',
  invited: 'bg-warning/10 text-warning',
  suspended: 'bg-danger/10 text-danger',
};

const UsersTable = () => {
  const { t } = useI18n();
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

  const columns: Array<DataTableColumn<UserRecord>> = [
    {
      key: 'name',
      header: t('users.headerName'),
      render: (user) => (
        <div>
          <p className="font-semibold text-base-800 dark:text-base-100">{user.name}</p>
          <p className="text-xs text-base-400">{user.id}</p>
        </div>
      ),
      sortValue: (user) => user.name,
      sortable: true,
    },
    {
      key: 'email',
      header: t('users.headerEmail'),
      render: (user) => <span className="text-base-500">{user.email}</span>,
      sortValue: (user) => user.email,
      sortable: true,
    },
    {
      key: 'role',
      header: t('users.headerRole'),
      render: (user) => <span className="text-base-500">{user.role}</span>,
    },
    {
      key: 'status',
      header: t('users.headerStatus'),
      render: (user) => (
        <span className={clsx('inline-flex rounded-full px-2 py-1 text-xs font-semibold', statusStyles[user.status])}>
          {user.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t('users.headerActions'),
      render: (user) => (
        <div className="flex items-center justify-end gap-2 density-pad">
          <button
            onClick={() => handleEdit(user)}
            className="rounded-lg border border-base-200 dark:border-base-700 px-3 py-1 text-xs"
          >
            {t('users.edit')}
          </button>
          <button
            onClick={() => handleDelete(user)}
            className="rounded-lg border border-danger/40 text-danger px-3 py-1 text-xs"
          >
            {t('users.delete')}
          </button>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    setEditingUser(null);
    setOpenModal(true);
  };

  const handleEdit = (user: UserRecord) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  const handleDelete = (user: UserRecord) => {
    const confirmed = window.confirm(t('users.confirmDelete', { name: user.name }));
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
    <div className="card-shell bg-white dark:bg-base-800 border border-base-200 dark:border-base-700 p-6 density-pad shadow-card density-pad">
      <div className="flex flex-col gap-4 density-pad md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">{t('users.tableTitle')}</h2>
          <p className="text-sm text-base-500">{t('users.tableDesc')}</p>
        </div>
        <div className="flex flex-col gap-3 density-pad sm:flex-row sm:items-center">
          <input
            placeholder={t('users.searchPlaceholder')}
            className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            onClick={handleCreate}
            className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
          >
            {t('users.addUser')}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <DataTable
          data={filtered}
          columns={columns}
          pageSize={6}
          getRowKey={(user) => user.id}
          emptyText={t('users.empty')}
        />
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
