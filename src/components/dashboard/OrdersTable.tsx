import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { orders } from '../../data/mock';
import DataTable, { type DataTableColumn } from '../common/DataTable';
import { useI18n } from '../../contexts/useI18n';
import { exportToCsv } from '../../utils/csv';

const OrdersTable = () => {
  const { t } = useI18n();
  const [statusFilter, setStatusFilter] = useState<'all' | 'Paid' | 'Pending' | 'Refunded'>('all');
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'all' ? true : order.status === statusFilter;
      const matchesQuery = query
        ? `${order.id} ${order.customer}`.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesStart = startDate ? order.date >= startDate : true;
      const matchesEnd = endDate ? order.date <= endDate : true;
      return matchesStatus && matchesQuery && matchesStart && matchesEnd;
    });
  }, [statusFilter, query, startDate, endDate]);

  const columns: Array<DataTableColumn<(typeof orders)[number]>> = [
    {
      key: 'order',
      header: t('orders.headerOrder'),
      render: (order) => (
        <span className="font-semibold text-base-700 dark:text-base-200">{order.id}</span>
      ),
    },
    {
      key: 'customer',
      header: t('orders.headerCustomer'),
      render: (order) => <span className="text-base-500">{order.customer}</span>,
    },
    {
      key: 'amount',
      header: t('orders.headerAmount'),
      sortable: true,
      sortValue: (order) => order.amount,
      render: (order) => (
        <span className="text-base-700 dark:text-base-200">${order.amount.toFixed(2)}</span>
      ),
    },
    {
      key: 'status',
      header: t('orders.headerStatus'),
      render: (order) => (
        <span
          className={clsx(
            'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
            order.status === 'Paid'
              ? 'bg-success/10 text-success'
              : order.status === 'Pending'
              ? 'bg-warning/10 text-warning'
              : 'bg-danger/10 text-danger'
          )}
        >
          {t(`orders.status.${order.status}` as const)}
        </span>
      ),
    },
    {
      key: 'date',
      header: t('orders.headerDate'),
      sortable: true,
      sortValue: (order) => new Date(order.date).getTime(),
      render: (order) => <span className="text-base-500">{order.date}</span>,
    },
  ];

  return (
    <div className="card-shell bg-white dark:bg-base-800 border border-base-200 dark:border-base-700 p-5 density-pad shadow-card density-pad">
      <div className="mb-4 flex flex-col gap-4 density-pad lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-base-500">{t('orders.title')}</p>
          <p className="text-lg font-semibold text-base-900 dark:text-base-100">{t('orders.subtitle')}</p>
        </div>
        <div className="text-xs text-base-400">
          {t('orders.showing', { count: filteredOrders.length, total: orders.length })}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 density-pad md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_auto]">
        <input
          className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
          placeholder={t('orders.searchPlaceholder')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
        >
          <option value="all">{t('orders.statusAll')}</option>
          <option value="Paid">{t('orders.status.Paid')}</option>
          <option value="Pending">{t('orders.status.Pending')}</option>
          <option value="Refunded">{t('orders.status.Refunded')}</option>
        </select>
        <div className="flex flex-col gap-2 density-pad sm:flex-row">
          <input
            type="date"
            className="flex-1 rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <input
            type="date"
            className="flex-1 rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
        <button
          onClick={() =>
            exportToCsv(
              filteredOrders.map((order) => ({
                id: order.id,
                customer: order.customer,
                amount: order.amount,
                status: order.status,
                date: order.date,
              })),
              'orders-export.csv'
            )
          }
          className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
        >
          {t('orders.exportCsv')}
        </button>
      </div>

      <DataTable data={filteredOrders} columns={columns} />
    </div>
  );
};

export default OrdersTable;
