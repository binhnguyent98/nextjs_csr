import { Translate } from 'next-translate';

import Schema from '@/libs/schema';

import { AuthFormDto } from './declare';

export const schema = (t: Translate) => {
  return Schema.validate<AuthFormDto>({
    email: Schema.string()
      .isRequired({ field: t('fields.email'), t })
      .isEmailCustom({ field: t('fields.email'), t }),
    password: Schema.string().isRequired({ field: t('fields.password'), t }),
  });
};
