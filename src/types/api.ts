import { ClassConstructor } from 'class-transformer';

import { METHOD_API } from '@/constants';

export type EndPointConfig<T> = {
  key?: string[];
  url: string;
  method: METHOD_API;
  dataResDto?: ClassConstructor<T>;
  factoryData?: unknown;
};
