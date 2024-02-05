import { QueryPostReqDto } from '@/dto/request';
import { PostListResDto } from '@/dto/response';
import { useQuery } from '@/hooks';
import { getListPost } from '@/services/post';
import { useDispatch } from '@/store';
import { authenticationAction } from '@/store/action';

import { Props } from './declare';

export const useLogic = (): Props => {
  const dispatch = useDispatch();
  const { data, refetch, isLoading, isFetching } = useQuery<PostListResDto, QueryPostReqDto>({
    apiConfig: getListPost,
  });

  const onLogout = () => {
    dispatch(authenticationAction.resetAuthentication());
  };

  const onSearch = () => {
    refetch();
  };

  return {
    onLogout,
    post: {
      isLoading: isLoading || isFetching,
      data: data?.data,
      onSearch,
    },
  };
};
