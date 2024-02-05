import { QueryPostReqDto } from '@/dto/request';
import { PostListResDto } from '@/dto/response';

export interface Props {
  onLogout: () => void;
  post: {
    isLoading: boolean;
    data?: PostListResDto;
    onSearch: (param?: QueryPostReqDto) => void;
  };
}
