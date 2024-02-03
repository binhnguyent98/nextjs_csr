import I18nProvider from 'next-translate/I18nProvider';
import { PropsWithChildren } from 'react';

import { defaultLanguage } from '@/constants';

import i18nConfig from '../../i18n';

export const TranslateProvider = ({ children }: PropsWithChildren) => {
  return (
    <I18nProvider lang={defaultLanguage} config={i18nConfig}>
      {children}
    </I18nProvider>
  );
};
