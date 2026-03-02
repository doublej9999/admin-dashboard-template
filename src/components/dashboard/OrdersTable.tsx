import clsx from 'clsx';
import { orders } from '../../data/mock';
import DataTable, { type DataTableColumn } from '../common/DataTable';

const OrdersTable = () => {
  const columns: Array<DataTableColumn<(typeof orders)[number]>> = [
    {
      key: 'order',
      header: 'Order',
      render: (order) => (
        <span className="font-semibold text-base-700 dark:text-base-200">{order.id}</span>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (order) => <span className="text-base-500">{order.customer}</span>,
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      sortValue: (order) => order.amount,
      render: (order) => (
        <span className="text-base-700 dark:text-base-200">${order.amount.toFixed(2)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
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
          {order.status}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      sortValue: (order) => new Date(order.date).getTime(),
      render: (order) => <span className="text-base-500">{order.date}</span>,
    },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-base-800 border border-base-200 dark:border-base-700 p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-base-500">Orders</p>
          <p className="text-lg font-semibold text-base-900 dark:text-base-100">Latest Orders</p>
        </div>
        <div className="text-xs text-base-400">Showing {orders.length} total</div>
      </div>
      <DataTable data={orders} columns={columns} />
    </div>
  );
};

export default OrdersTable;
