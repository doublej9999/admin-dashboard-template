import { useEffect } from 'react';
import { getSettings } from '../utils/settings';

const ACCENT_MAP: Record<string, { primary: string; primaryDark: string }> = {
  blue: { primary: '#3b82f6', primaryDark: '#1d4ed8' },
  emerald: { primary: '#10b981', primaryDark: '#059669' },
  violet: { primary: '#8b5cf6', primaryDark: '#6d28d9' },
  rose: { primary: '#f43f5e', primaryDark: '#e11d48' },
};

const radiusTokens: Record<string, string> = {
  rounded: '1.25rem',
  soft: '0.9rem',
  square: '0.5rem',
};

export const useThemeSettings = () => {
  useEffect(() => {
    const apply = () => {
      const settings = getSettings();
      const root = document.documentElement;
      const accent = ACCENT_MAP[settings.accent] ?? ACCENT_MAP.blue;
      root.style.setProperty('--color-brand-500', accent.primary);
      root.style.setProperty('--color-brand-600', accent.primaryDark);
      root.style.setProperty('--radius-card', radiusTokens[settings.radius] ?? radiusTokens.soft);
      root.setAttribute('data-density', settings.density);

      if (settings.theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    apply();
    window.addEventListener('storage', apply);
    window.addEventListener('settings-change', apply);
    return () => {
      window.removeEventListener('storage', apply);
      window.removeEventListener('settings-change', apply);
    };
  }, []);
};
