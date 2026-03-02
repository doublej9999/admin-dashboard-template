import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { mockAuditLogs } from '../data/auditLogs';
import { usePagination } from '../hooks/usePagination';

const AuditLogsPage = () => {
  const [user, setUser] = useState('');
  const [action, setAction] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const filtered = useMemo(() => {
    return mockAuditLogs.filter((log) => {
      const matchUser = user ? log.user.toLowerCase().includes(user.toLowerCase()) : true;
      const matchAction = action ? log.action.toLowerCase().includes(action.toLowerCase()) : true;
      const logDate = log.time.split(' ')[0];
      const matchStart = start ? logDate >= start : true;
      const matchEnd = end ? logDate <= end : true;
      return matchUser && matchAction && matchStart && matchEnd;
    });
  }, [user, action, start, end]);

  const { page, setPage, totalPages, pageData } = usePagination(filtered, 5);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-base-500">Security</p>
        <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">Audit Logs</h1>
      </div>

      <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-5 shadow-card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            placeholder="Filter by user"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
          <input
            className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            placeholder="Filter by action"
            value={action}
            onChange={(event) => setAction(event.target.value)}
          />
          <input
            type="date"
            className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            value={start}
            onChange={(event) => setStart(event.target.value)}
          />
          <input
            type="date"
            className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase text-base-400 border-b border-base-200 dark:border-base-700">
                <th className="py-3">Time</th>
                <th className="py-3">User</th>
                <th className="py-3">Action</th>
                <th className="py-3">Target</th>
                <th className="py-3">Result</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((log) => (
                <tr key={log.id} className="border-b border-base-100 dark:border-base-700/60">
                  <td className="py-3 text-base-500">{log.time}</td>
                  <td className="py-3 text-base-700 dark:text-base-200">{log.user}</td>
                  <td className="py-3 text-base-500">{log.action}</td>
                  <td className="py-3 text-base-500">{log.target}</td>
                  <td className="py-3">
                    <span
                      className={clsx(
                        'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
                        log.result === 'Success'
                          ? 'bg-success/10 text-success'
                          : 'bg-danger/10 text-danger'
                      )}
                    >
                      {log.result}
                    </span>
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
      </div>
    </div>
  );
};

export default AuditLogsPage;
