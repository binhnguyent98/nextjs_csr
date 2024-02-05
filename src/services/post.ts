import { METHOD_API } from '@/constants';
import { PostListResDto } from '@/dto/response';
import { EndPointConfig } from '@/types';

export const getListPost: EndPointConfig<PostListResDto> = {
  method: METHOD_API.GET,
  dataResDto: PostListResDto,
  url: '/posts/list',
  key: ['post-list'],
};
