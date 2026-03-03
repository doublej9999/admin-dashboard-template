import { useDarkMode } from '../hooks/useDarkMode';
import { useSettings } from '../hooks/useSettings';

const SettingsPage = () => {
  const { mode, toggle } = useDarkMode();
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-base-500">Preferences</p>
        <h1 className="text-2xl font-semibold text-base-900 dark:text-base-100">System Settings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
          <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">Appearance</h2>
          <p className="text-sm text-base-500">Customize theme and language.</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-700 dark:text-base-100">Dark mode</p>
                <p className="text-xs text-base-400">Toggle the UI theme</p>
              </div>
              <button
                onClick={toggle}
                className="rounded-full border border-base-200 dark:border-base-700 px-4 py-2 text-sm"
              >
                {mode === 'dark' ? 'On' : 'Off'}
              </button>
            </div>

            <div>
              <label className="text-sm text-base-500">Language (i18n placeholder)</label>
              <select
                className="mt-2 w-full rounded-xl border border-base-200 dark:border-base-700 bg-base-50 dark:bg-base-900 px-4 py-2 text-sm"
                value={settings.language}
                onChange={(event) => updateSettings({ ...settings, language: event.target.value })}
              >
                <option value="en-US">English (US)</option>
                <option value="zh-CN">中文（简体）</option>
                <option value="ja-JP">日本語</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-base-200 dark:border-base-700 bg-white dark:bg-base-800 p-6 shadow-card">
          <h2 className="text-lg font-semibold text-base-900 dark:text-base-100">Profile</h2>
          <p className="text-sm text-base-500">Update your personal information.</p>

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
              <label className="text-sm text-base-500">Display name</label>
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
