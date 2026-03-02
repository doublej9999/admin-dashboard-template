import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const StatCard = ({ label, value, delta, trend, icon }: StatCardProps) => {
  return (
    <div className="rounded-2xl bg-white dark:bg-base-800 border border-base-200 dark:border-base-700 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm text-base-500">{label}</p>
        <div className="h-10 w-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300 grid place-items-center">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <p className="text-2xl font-semibold text-base-900 dark:text-base-100">{value}</p>
        <div
          className={clsx(
            'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold',
            trend === 'up'
              ? 'bg-success/10 text-success'
              : 'bg-danger/10 text-danger'
          )}
        >
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {delta}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
