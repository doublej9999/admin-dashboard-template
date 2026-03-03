import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getSettings, saveSettings } from '../utils/settings';
import { t as translate, type Locale, translations } from '../i18n/translations';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof translations, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const mapLanguageToLocale = (language: string): Locale => {
  if (language.startsWith('zh')) return 'zh';
  return 'en';
};

export const mapLocaleToLanguage = (locale: Locale): string => (locale === 'zh' ? 'zh-CN' : 'en-US');

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const stored = getSettings();
  const [locale, setLocaleState] = useState<Locale>(mapLanguageToLocale(stored.language));

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      const settings = getSettings();
      saveSettings({ ...settings, language: mapLocaleToLanguage(next) });
    },
    []
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, params) => {
        const base = translate(key, locale);
        if (!params) return base;
        return Object.entries(params).reduce((acc, [paramKey, value]) => {
          return acc.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(value));
        }, base);
      },
    }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
