import type { Locale } from '../i18n/translations';

export const mapLanguageToLocale = (language: string): Locale => {
  if (language.startsWith('zh')) return 'zh';
  return 'en';
};

export const mapLocaleToLanguage = (locale: Locale): string => (locale === 'zh' ? 'zh-CN' : 'en-US');
