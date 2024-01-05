import * as Yup from 'yup';

import { AuthFormDto } from './declare';

export const schema = Yup.object<Partial<Record<keyof AuthFormDto, Yup.AnySchema>>>({
  email: Yup.string().required(),
  password: Yup.string().required(),
});
