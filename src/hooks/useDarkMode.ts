import { useEffect, useState } from 'react';
import { getSettings, saveSettings } from '../utils/settings';

type ThemeMode = 'light' | 'dark';

export const useDarkMode = () => {
  const [mode, setMode] = useState<ThemeMode>(() => getSettings().theme);

  useEffect(() => {
    const sync = () => {
      const settings = getSettings();
      setMode(settings.theme);
    };
    window.addEventListener('storage', sync);
    window.addEventListener('settings-change', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('settings-change', sync);
    };
  }, []);

  const toggle = () => {
    const settings = getSettings();
    const next = settings.theme === 'dark' ? 'light' : 'dark';
    saveSettings({ ...settings, theme: next });
  };

  return { mode, toggle };
};
