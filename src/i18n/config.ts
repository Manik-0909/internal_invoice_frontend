import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './en/common.json';
import deCommon from './de/common.json';
import frCommon from './fr/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  de: {
    common: deCommon,
  },
  fr: {
    common: frCommon,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
});

export default i18n;
