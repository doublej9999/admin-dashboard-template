import UsersTable from '../components/users/UsersTable';
import { useI18n } from '../contexts/useI18n';

const UsersPage = () => {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-base-500">{t('users.team')}</p>
        <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('users.title')}</h1>
      </div>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
