import { METHOD_API } from '@/constants';
import { APIConfig } from '@/types';

export const login: APIConfig = {
  method: METHOD_API.POST,
  url: '/auth/login',
  key: ['login'],
};
