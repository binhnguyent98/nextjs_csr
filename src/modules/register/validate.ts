import { Translate } from 'next-translate';
import { AnySchema } from 'yup';

import Yup from '@/libs/yup';

import { RegisterFormDto } from './declare';

export const schema = (t: Translate) => {
  return Yup.object<Partial<Record<keyof RegisterFormDto, AnySchema>>>({
    email: Yup.string().isRequired({ field: t('fields.email'), t }),
    password: Yup.string().isRequired({ field: t('fields.password'), t }),
  });
};
