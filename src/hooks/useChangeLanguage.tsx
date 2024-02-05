import setLanguage from 'next-translate/setLanguage';

import { LANGUAGE_CONFIG } from '@/constants';

export const useChangeLanguage = () => {
  const changeLang = (lang: LANGUAGE_CONFIG) => {
    setLanguage(lang);
  };

  return {
    changeLang,
  };
};
