import { Translate } from 'next-translate';

import Schema from '@/libs/schema';

import { RegisterFormDto } from './declare';

export const schema = (t: Translate) => {
  return Schema.validate<RegisterFormDto>({
    email: Schema.string().isRequired({ field: t('fields.email'), t }),
    password: Schema.string().isRequired({ field: t('fields.password'), t }),
  });
};
