import UsersTable from '../components/users/UsersTable';

const UsersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-base-500">Team</p>
        <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">User Management</h1>
      </div>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
