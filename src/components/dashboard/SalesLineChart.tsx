import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { salesTrend } from '../../data/mock';
import { useI18n } from '../../contexts/I18nContext';

const SalesLineChart = () => {
  const { t } = useI18n();
  const [range, setRange] = useState<'6' | '12'>('12');
  const data = useMemo(() => {
    const size = range === '6' ? 6 : 12;
    return salesTrend.slice(-size);
  }, [range]);

  return (
    <div className="rounded-2xl bg-white dark:bg-base-800 border border-base-200 dark:border-base-700 p-5 shadow-card">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-base-500">{t('reports.salesTrend')}</p>
          <p className="text-lg font-semibold text-base-900 dark:text-base-100">
            {range === '6' ? t('reports.last6Months') : t('reports.last12Months')}
          </p>
        </div>
        <select
          className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-3 py-2 text-sm"
          value={range}
          onChange={(event) => setRange(event.target.value as typeof range)}
        >
          <option value="6">{t('reports.range6')}</option>
          <option value="12">{t('reports.range12')}</option>
        </select>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: 'none',
                borderRadius: 12,
                color: '#f8fafc',
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesLineChart;
