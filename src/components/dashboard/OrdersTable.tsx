import { ArrowDown, ArrowUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { orders } from '../../data/mock';
import { usePagination } from '../../hooks/usePagination';
import clsx from 'clsx';

type SortKey = 'amount' | 'date';

const OrdersTable = () => {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortedOrders = useMemo(() => {
    const sorted = [...orders].sort((a, b) => {
      if (sortKey === 'amount') {
        return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      return sortDirection === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return sorted;
  }, [sortKey, sortDirection]);

  const { page, setPage, totalPages, pageData, next, prev } = usePagination(sortedOrders, 5);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDirection('desc');
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-base-800 border border-base-200 dark:border-base-700 p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-base-500">Orders</p>
          <p className="text-lg font-semibold text-base-900 dark:text-base-100">Latest Orders</p>
        </div>
        <div className="text-xs text-base-400">Showing {pageData.length} of {orders.length}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase text-base-400 border-b border-base-200 dark:border-base-700">
              <th className="py-3">Order</th>
              <th className="py-3">Customer</th>
              <th className="py-3 cursor-pointer" onClick={() => handleSort('amount')}>
                <div className="flex items-center gap-1">
                  Amount
                  {sortKey === 'amount' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
              <th className="py-3">Status</th>
              <th className="py-3 cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1">
                  Date
                  {sortKey === 'date' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((order) => (
              <tr key={order.id} className="border-b border-base-100 dark:border-base-700/60">
                <td className="py-3 font-semibold text-base-700 dark:text-base-200">{order.id}</td>
                <td className="py-3 text-base-500">{order.customer}</td>
                <td className="py-3 text-base-700 dark:text-base-200">${order.amount.toFixed(2)}</td>
                <td className="py-3">
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
                </td>
                <td className="py-3 text-base-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-base-400">Page {page} of {totalPages}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="rounded-lg border border-base-200 dark:border-base-700 px-3 py-1 text-xs"
          >
            Previous
          </button>
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
          <button
            onClick={next}
            className="rounded-lg border border-base-200 dark:border-base-700 px-3 py-1 text-xs"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
