import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';

import { LANGUAGE_CONFIG } from '@/constants';

export const useLanguage = () => {
  const { t, lang } = useTranslation('common');
  const changeLang = (lang: LANGUAGE_CONFIG) => {
    setLanguage(lang);
  };

  const getLangOptions = () => [
    {
      label: t('lang.en'),
      value: LANGUAGE_CONFIG.EN,
    },
    {
      label: t('lang.ja'),
      value: LANGUAGE_CONFIG.JA,
    },
  ];

  return {
    defaultLang: lang,
    changeLang,
    getLangOptions,
  };
};
