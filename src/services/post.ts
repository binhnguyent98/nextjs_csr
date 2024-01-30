import { METHOD_API } from '@/constants';
import { APIConfig } from '@/types';

export const getPost: APIConfig = {
  method: METHOD_API.GET,
  url: '/posts',
  key: ['get_post'],
};

export const deletePost: APIConfig = {
  method: METHOD_API.DELETE,
  url: '/delete-posts/{id}',
  key: ['delete_post'],
};
