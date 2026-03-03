import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useI18n } from '../contexts/I18nContext';

interface Member {
  id: string;
  name: string;
  title: string;
  team: string;
  location: string;
  status: 'Active' | 'Onboarding' | 'Leave';
}

interface OrgNode {
  id: string;
  name: string;
  role: string;
  reports?: OrgNode[];
}

const orgData: OrgNode = {
  id: 'ceo',
  name: 'Jordan Lee',
  role: 'CEO',
  reports: [
    {
      id: 'vp-product',
      name: 'Lina Patel',
      role: 'VP Product',
      reports: [
        { id: 'pm-1', name: 'Emily Davis', role: 'Product Manager' },
        { id: 'pm-2', name: 'Ryan Chen', role: 'Product Manager' },
      ],
    },
    {
      id: 'vp-engineering',
      name: 'James Wilson',
      role: 'VP Engineering',
      reports: [
        { id: 'eng-1', name: 'Sophia Johnson', role: 'Frontend Lead' },
        { id: 'eng-2', name: 'Noah Patel', role: 'Backend Lead' },
      ],
    },
    {
      id: 'vp-ops',
      name: 'Mia Garcia',
      role: 'VP Operations',
      reports: [
        { id: 'ops-1', name: 'Olivia Brown', role: 'People Ops' },
        { id: 'ops-2', name: 'Lucas Martin', role: 'Finance Lead' },
      ],
    },
  ],
};

const members: Member[] = [
  {
    id: 'MB-2001',
    name: 'Sophia Johnson',
    title: 'Frontend Lead',
    team: 'Engineering',
    location: 'Shanghai',
    status: 'Active',
  },
  {
    id: 'MB-2002',
    name: 'Noah Patel',
    title: 'Backend Lead',
    team: 'Engineering',
    location: 'Singapore',
    status: 'Active',
  },
  {
    id: 'MB-2003',
    name: 'Emily Davis',
    title: 'Product Manager',
    team: 'Product',
    location: 'Shenzhen',
    status: 'Onboarding',
  },
  {
    id: 'MB-2004',
    name: 'Olivia Brown',
    title: 'People Ops',
    team: 'Operations',
    location: 'Hangzhou',
    status: 'Leave',
  },
];

const OrgStructurePage = () => {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesQuery = query
        ? `${member.name} ${member.title}`.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchesTeam = teamFilter === 'all' ? true : member.team === teamFilter;
      return matchesQuery && matchesTeam;
    });
  }, [query, teamFilter]);

  const renderNode = (node: OrgNode) => (
    <div key={node.id} className="flex flex-col items-center">
      <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 px-4 py-3 shadow-sm">
        <p className="text-sm font-semibold text-base-900 dark:text-base-100">{node.name}</p>
        <p className="text-xs text-base-400">{node.role}</p>
      </div>
      {node.reports && (
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {node.reports.map((child) => renderNode(child))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-base-500">{t('org.section')}</p>
          <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('org.title')}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            placeholder={t('org.searchPlaceholder')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            value={teamFilter}
            onChange={(event) => setTeamFilter(event.target.value)}
          >
            <option value="all">{t('org.teamAll')}</option>
            <option value="Engineering">{t('org.teamEngineering')}</option>
            <option value="Product">{t('org.teamProduct')}</option>
            <option value="Operations">{t('org.teamOps')}</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
        <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">{t('org.treeTitle')}</h2>
        <div className="mt-6 flex flex-col items-center gap-6">
          {renderNode(orgData)}
        </div>
      </div>

      <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">{t('org.membersTitle')}</h2>
            <p className="text-sm text-base-500">{t('org.membersSubtitle', { count: filteredMembers.length })}</p>
          </div>
          <button className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">
            {t('org.addMember')}
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-base-900 dark:text-base-100">{member.name}</p>
                  <p className="text-xs text-base-400">{member.title}</p>
                </div>
                <span
                  className={clsx(
                    'rounded-full px-3 py-1 text-xs font-semibold',
                    member.status === 'Active'
                      ? 'bg-success/10 text-success'
                      : member.status === 'Onboarding'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-base-100 dark:bg-base-700/60 text-base-500'
                  )}
                >
                  {t(`org.status.${member.status}` as const)}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-base-400">
                <span>{member.team}</span>
                <span>•</span>
                <span>{member.location}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button className="rounded-lg border border-base-200 dark:border-base-700 px-3 py-1 text-xs">
                  {t('org.edit')}
                </button>
                <button className="rounded-lg border border-base-200 dark:border-base-700 px-3 py-1 text-xs text-danger">
                  {t('org.remove')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgStructurePage;
