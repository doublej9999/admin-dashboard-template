import { useState } from 'react';
import { getSettings, saveSettings, type ProfileSettings } from '../utils/settings';

export const useSettings = () => {
  const [settings, setSettings] = useState<ProfileSettings>(getSettings());

  const updateSettings = (next: ProfileSettings) => {
    setSettings(next);
    saveSettings(next);
  };

  return { settings, updateSettings };
};
