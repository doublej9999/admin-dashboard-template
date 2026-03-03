import { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { useSettings } from '../hooks/useSettings';

const activity = [
  { id: 'AC-01', label: 'Updated team permissions', time: '2 hours ago' },
  { id: 'AC-02', label: 'Uploaded Q1 report', time: 'Yesterday' },
  { id: 'AC-03', label: 'Approved new vendor', time: '2 days ago' },
];

const ProfilePage = () => {
  const { t } = useI18n();
  const { settings, updateSettings } = useSettings();
  const [status, setStatus] = useState('Available');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-base-500">{t('profile.section')}</p>
          <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('profile.title')}</h1>
        </div>
        <div className="flex items-center gap-3">
          <input
            className="rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            placeholder={t('profile.statusPlaceholder')}
          />
          <button className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">
            {t('profile.updateStatus')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_2fr]">
        <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
          <div className="flex items-center gap-4">
            <img
              src={settings.avatarUrl}
              alt="Profile"
              className="h-16 w-16 rounded-2xl object-cover"
            />
            <div>
              <p className="text-lg font-semibold text-base-900 dark:text-base-100">{settings.displayName}</p>
              <p className="text-sm text-base-400">{t('profile.role')}</p>
              <span className="mt-2 inline-flex rounded-full bg-success/10 px-3 py-1 text-xs text-success">
                {status}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-base-500">{t('profile.displayName')}</label>
              <input
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                value={settings.displayName}
                onChange={(event) => updateSettings({ ...settings, displayName: event.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-base-500">{t('profile.email')}</label>
              <input
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                value="jordan.lee@adminkit.io"
                readOnly
              />
            </div>
            <div>
              <label className="text-sm text-base-500">{t('profile.location')}</label>
              <input
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                value="Shanghai, China"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
            <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">{t('profile.metrics')}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: t('profile.metricProjects'), value: '18' },
                { label: t('profile.metricTasks'), value: '124' },
                { label: t('profile.metricReports'), value: '32' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-base-200 dark:border-base-700 px-4 py-3">
                  <p className="text-xs text-base-500">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold text-base-900 dark:text-base-100">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
            <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">{t('profile.activity')}</h2>
            <div className="mt-4 space-y-3">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-base-200 dark:border-base-700 px-4 py-3 text-sm"
                >
                  <span className="text-base-600 dark:text-base-200">{item.label}</span>
                  <span className="text-xs text-base-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
