import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';

const i18n = createI18n({
  fallbackLocale: 'en',
  legacy: false,
  locale: 'en',
  messages: {
    en,
  },
  warnHtmlInMessage: false,
});

export default i18n;
