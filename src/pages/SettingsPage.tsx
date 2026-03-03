import { type ChangeEvent } from 'react';
import clsx from 'clsx';
import { useDarkMode } from '../hooks/useDarkMode';
import { useSettings } from '../hooks/useSettings';
import { useI18n } from '../contexts/useI18n';
import { mapLanguageToLocale, mapLocaleToLanguage } from '../contexts/i18nUtils';

const SettingsPage = () => {
  const { mode, toggle } = useDarkMode();
  const { settings, updateSettings } = useSettings();
  const { t, setLocale, locale } = useI18n();
  const localeOption = mapLocaleToLanguage(locale);

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = event.target.value;
    updateSettings({ ...settings, language: nextLanguage });
    setLocale(mapLanguageToLocale(nextLanguage));
  };

  const updateThemeSetting = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    updateSettings({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-base-500">{t('settings.preferences')}</p>
        <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('settings.title')}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 density-pad lg:grid-cols-2">
        <div className="card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 density-pad shadow-card density-pad">
          <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">{t('settings.appearance')}</h2>
          <p className="text-sm text-base-500">{t('settings.appearanceDesc')}</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-700 dark:text-base-100">{t('settings.darkMode')}</p>
                <p className="text-xs text-base-400">{t('settings.darkModeDesc')}</p>
              </div>
              <button
                onClick={toggle}
                className="rounded-full border border-base-200 dark:border-base-700 px-4 py-2 text-sm"
              >
                {mode === 'dark' ? t('settings.on') : t('settings.off')}
              </button>
            </div>

            <div>
              <label className="text-sm text-base-500">{t('settings.languageLabel')}</label>
              <select
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                value={localeOption}
                onChange={handleLanguageChange}
              >
                <option value="en-US">{t('common.languageEnglish')}</option>
                <option value="zh-CN">{t('common.languageChinese')}</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-base-500">{t('settings.accentColor')}</label>
              <div className="mt-2 grid grid-cols-2 gap-2 density-pad sm:grid-cols-4">
                {([
                  { value: 'blue', label: t('settings.accentBlue'), color: 'bg-brand-500' },
                  { value: 'emerald', label: t('settings.accentEmerald'), color: 'bg-success' },
                  { value: 'violet', label: t('settings.accentViolet'), color: 'bg-violet-500' },
                  { value: 'rose', label: t('settings.accentRose'), color: 'bg-rose-500' },
                ] as const).map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateThemeSetting('accent', option.value)}
                    className={clsx(
                      'flex items-center justify-between gap-2 density-pad rounded-xl border px-3 py-2 text-xs font-semibold',
                      settings.accent === option.value
                        ? 'border-brand-500 text-brand-600 dark:text-brand-300'
                        : 'border-base-200 dark:border-base-700 text-base-500'
                    )}
                  >
                    <span>{option.label}</span>
                    <span className={clsx('h-3 w-3 rounded-full', option.color)} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 density-pad sm:grid-cols-2">
              <div>
                <label className="text-sm text-base-500">{t('settings.cornerRadius')}</label>
                <select
                  className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                  value={settings.radius}
                  onChange={(event) => updateThemeSetting('radius', event.target.value as typeof settings.radius)}
                >
                  <option value="rounded">{t('settings.radiusRounded')}</option>
                  <option value="soft">{t('settings.radiusSoft')}</option>
                  <option value="square">{t('settings.radiusSquare')}</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-base-500">{t('settings.density')}</label>
                <select
                  className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                  value={settings.density}
                  onChange={(event) => updateThemeSetting('density', event.target.value as typeof settings.density)}
                >
                  <option value="comfortable">{t('settings.densityComfortable')}</option>
                  <option value="compact">{t('settings.densityCompact')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card-shell border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 density-pad shadow-card density-pad">
          <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">{t('settings.profile')}</h2>
          <p className="text-sm text-base-500">{t('settings.profileDesc')}</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4 density-pad">
              <img
                src={settings.avatarUrl}
                alt="Avatar"
                className="h-16 w-16 card-shell object-cover"
              />
              <input
                className="flex-1 rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                value={settings.avatarUrl}
                onChange={(event) => updateSettings({ ...settings, avatarUrl: event.target.value })}
              />
            </div>

            <div>
              <label className="text-sm text-base-500">{t('settings.displayName')}</label>
              <input
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                value={settings.displayName}
                onChange={(event) => updateSettings({ ...settings, displayName: event.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
