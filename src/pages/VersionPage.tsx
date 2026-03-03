import { useI18n } from '../contexts/useI18n';

const releases = [
  {
    version: 'v1.12.0',
    date: '2026-03-01',
    highlights: [
      'New command palette and onboarding tour',
      'Kanban board and message center',
      'Theme customization and i18n',
    ],
  },
  {
    version: 'v1.11.0',
    date: '2026-02-15',
    highlights: ['Dashboard filters + CSV export', 'Roles & permissions updates'],
  },
  {
    version: 'v1.10.0',
    date: '2026-02-01',
    highlights: ['Audit logs enhancements', 'Improved file management'],
  },
];

const VersionPage = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-base-500">{t('version.section')}</p>
        <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('version.title')}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_2fr]">
        <div className="card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card density-pad">
          <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">{t('version.current')}</h2>
          <p className="mt-2 text-3xl font-semibold text-brand-600">v1.12.0</p>
          <p className="mt-2 text-sm text-base-500">{t('version.updated')} 2026-03-01</p>
          <div className="mt-6 space-y-3">
            {[
              t('version.statFeatures'),
              t('version.statFixes'),
              t('version.statPerf'),
            ].map((item) => (
              <div key={item} className="rounded-xl border border-base-200 dark:border-base-700 px-4 py-2 text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card density-pad">
          <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">{t('version.changelog')}</h2>
          <div className="mt-4 space-y-4">
            {releases.map((release) => (
              <div key={release.version} className="rounded-xl border border-base-200 dark:border-base-700 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-base font-semibold text-base-900 dark:text-base-100">{release.version}</p>
                    <p className="text-xs text-base-400">{release.date}</p>
                  </div>
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs text-brand-600">{t('version.release')}</span>
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-base-500">
                  {release.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionPage;
