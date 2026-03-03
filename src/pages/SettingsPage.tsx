import { type ChangeEvent } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useSettings } from '../hooks/useSettings';
import { useI18n, mapLanguageToLocale, mapLocaleToLanguage } from '../contexts/I18nContext';

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

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-base-500">{t('settings.preferences')}</p>
        <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">{t('settings.title')}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
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
          </div>
        </div>

        <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
          <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">{t('settings.profile')}</h2>
          <p className="text-sm text-base-500">{t('settings.profileDesc')}</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={settings.avatarUrl}
                alt="Avatar"
                className="h-16 w-16 rounded-2xl object-cover"
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
