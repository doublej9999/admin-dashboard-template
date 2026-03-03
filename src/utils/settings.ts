export interface ProfileSettings {
  displayName: string;
  avatarUrl: string;
  language: string;
  theme: 'light' | 'dark';
  accent: 'blue' | 'emerald' | 'violet' | 'rose';
  radius: 'rounded' | 'soft' | 'square';
  density: 'comfortable' | 'compact';
}

const SETTINGS_KEY = 'admin-dashboard-settings';

const defaultSettings: ProfileSettings = {
  displayName: 'Jordan Lee',
  avatarUrl: 'https://i.pravatar.cc/80?img=3',
  language: 'en-US',
  theme: 'light',
  accent: 'blue',
  radius: 'soft',
  density: 'comfortable',
};

export const getSettings = (): ProfileSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (stored) {
    try {
      return { ...defaultSettings, ...JSON.parse(stored) } as ProfileSettings;
    } catch {
      return defaultSettings;
    }
  }
  return defaultSettings;
};

export const saveSettings = (settings: ProfileSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event('settings-change'));
};
