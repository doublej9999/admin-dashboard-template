import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { usePagination } from '../../hooks/usePagination';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
}

interface DataTableProps<T> {
  data: T[];
  columns: Array<DataTableColumn<T>>;
  pageSize?: number;
  emptyText?: string;
}

const DataTable = <T,>({ data, columns, pageSize = 5, emptyText = 'No data' }: DataTableProps<T>) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const column = columns.find((col) => col.key === sortKey);
    if (!column?.sortValue) return data;
    return [...data].sort((a, b) => {
      const aValue = column.sortValue?.(a) ?? 0;
      const bValue = column.sortValue?.(b) ?? 0;
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [columns, data, direction, sortKey]);

  const { page, setPage, totalPages, pageData } = usePagination(sorted, pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setDirection('desc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-xs uppercase text-base-400 border-b border-base-200 dark:border-base-700">
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx('py-3', col.sortable && 'cursor-pointer')}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {sortKey === col.key && (
                    <span className="text-base-400">{direction === 'asc' ? '▲' : '▼'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-6 text-center text-base-400">
                {emptyText}
              </td>
            </tr>
          )}
          {pageData.map((row, index) => (
            <tr key={index} className="border-b border-base-100 dark:border-base-700/60">
              {columns.map((col) => (
                <td key={col.key} className="py-3">
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
};

export default DataTable;
