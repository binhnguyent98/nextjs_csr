import { METHOD_API } from '@/constants';
import { APIConfig } from '@/types';

export const getPost: APIConfig = {
  method: METHOD_API.GET,
  url: '/posts',
  key: ['get_post'],
};
