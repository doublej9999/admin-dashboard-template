import { BarChart2, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import OrdersTable from '../components/dashboard/OrdersTable';
import SalesLineChart from '../components/dashboard/SalesLineChart';
import StatCard from '../components/dashboard/StatCard';
import { stats } from '../data/mock';
import { useI18n } from '../contexts/I18nContext';

const icons = [
  <TrendingUp size={20} key="sales" />,
  <ShoppingCart size={20} key="orders" />,
  <Users size={20} key="users" />,
  <BarChart2 size={20} key="conversion" />,
];

const DashboardPage = () => {
  const { t } = useI18n();
  const statLabels = [
    t('stats.totalSales'),
    t('stats.orders'),
    t('stats.users'),
    t('stats.conversion'),
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-base-500">{t('dashboard.welcome')}</p>
        <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('dashboard.overview')}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} label={statLabels[index]} icon={icons[index]} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
        <SalesLineChart />
        <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white p-6 shadow-card">
          <p className="text-sm text-white/80">{t('dashboard.teamPerformance')}</p>
          <h3 className="mt-2 text-2xl font-semibold">{t('dashboard.growth')}</h3>
          <p className="mt-4 text-sm text-white/70">
            {t('dashboard.teamDesc')}
          </p>
          <button className="mt-6 rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold">{t('dashboard.viewReport')}</button>
        </div>
      </div>

      <OrdersTable />
    </div>
  );
};

export default DashboardPage;
