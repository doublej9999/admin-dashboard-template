import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useI18n } from '../contexts/useI18n';

interface KanbanCard {
  id: string;
  title: string;
  description: string;
  assignee: string;
  tags: string[];
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cards: KanbanCard[];
}

const initialColumns: KanbanColumn[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: 'bg-base-100 dark:bg-base-700/60',
    cards: [
      {
        id: 'KB-1001',
        title: 'Research onboarding flow',
        description: 'Audit the current onboarding funnel and identify gaps.',
        assignee: 'Jordan Lee',
        tags: ['Discovery', 'UX'],
      },
      {
        id: 'KB-1002',
        title: 'Design email templates',
        description: 'Update transactional email styling for consistency.',
        assignee: 'Lina Patel',
        tags: ['Design'],
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'bg-brand-50/80 dark:bg-brand-500/10',
    cards: [
      {
        id: 'KB-1003',
        title: 'Build analytics widgets',
        description: 'Ship the new KPI widgets for the dashboard.',
        assignee: 'James Wilson',
        tags: ['Frontend'],
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-warning/10',
    cards: [
      {
        id: 'KB-1004',
        title: 'QA regression pass',
        description: 'Run smoke tests for the March release.',
        assignee: 'Emily Davis',
        tags: ['QA'],
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-success/10',
    cards: [
      {
        id: 'KB-1005',
        title: 'Finalize pricing page',
        description: 'Publish the updated pricing copy and FAQ.',
        assignee: 'Mia Garcia',
        tags: ['Content'],
      },
    ],
  },
];

const KanbanPage = () => {
  const { t } = useI18n();
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [dragged, setDragged] = useState<{ card: KanbanCard; fromColumn: string } | null>(null);

  const summary = useMemo(() => {
    const total = columns.reduce((sum, col) => sum + col.cards.length, 0);
    return {
      total,
      inProgress: columns.find((col) => col.id === 'in-progress')?.cards.length ?? 0,
      review: columns.find((col) => col.id === 'review')?.cards.length ?? 0,
    };
  }, [columns]);

  const handleDragStart = (card: KanbanCard, columnId: string) => {
    setDragged({ card, fromColumn: columnId });
  };

  const handleDrop = (columnId: string) => {
    if (!dragged) return;
    if (dragged.fromColumn === columnId) return;
    setColumns((prev) => {
      const next = prev.map((column) => {
        if (column.id === dragged.fromColumn) {
          return { ...column, cards: column.cards.filter((item) => item.id !== dragged.card.id) };
        }
        if (column.id === columnId) {
          return { ...column, cards: [dragged.card, ...column.cards] };
        }
        return column;
      });
      return next;
    });
    setDragged(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 density-pad md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-base-500">{t('kanban.section')}</p>
          <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('kanban.title')}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 density-pad">
          <div className="rounded-xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 px-4 py-2 text-sm">
            {t('kanban.summaryTotal', { count: summary.total })}
          </div>
          <div className="rounded-xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 px-4 py-2 text-sm">
            {t('kanban.summaryProgress', { count: summary.inProgress })}
          </div>
          <div className="rounded-xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 px-4 py-2 text-sm">
            {t('kanban.summaryReview', { count: summary.review })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 density-pad lg:grid-cols-4">
        {columns.map((column) => (
          <div
            key={column.id}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => handleDrop(column.id)}
            className="card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-4 density-pad shadow-card density-pad"
          >
            <div className={clsx('rounded-xl px-3 py-2 text-sm font-semibold', column.color)}>
              {t(`kanban.column.${column.id}` as const)}
            </div>
            <div className="mt-4 space-y-3">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card, column.id)}
                  className="card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-900 p-4 density-pad shadow-sm cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-base-900 dark:text-base-100">{card.title}</p>
                    <span className="text-xs text-base-400">{card.id}</span>
                  </div>
                  <p className="mt-2 text-xs text-base-500">{card.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 density-pad">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-base-100 dark:bg-base-700/60 px-2 py-1 text-[11px] text-base-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-base-400">
                    <span>{card.assignee}</span>
                    <span className="rounded-full border border-base-200 dark:border-base-700 px-2 py-1">{t('kanban.dragHint')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanPage;
