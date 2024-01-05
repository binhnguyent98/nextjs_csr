import { METHOD_API } from '@/constants';

export type APIConfig = {
  key?: string[];
  url: string;
  method: METHOD_API;
  factoryData?: unknown;
};
