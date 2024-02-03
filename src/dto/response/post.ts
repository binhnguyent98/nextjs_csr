import { Expose, Type } from 'class-transformer';

import { HasIdResDto, PaginationRes } from '@/dto/response/template';
import { convertDataToInstance } from '@/utilities/instance';

export class PostResDto extends HasIdResDto {
  title: string;
  description: string;

  @Expose({ name: 'categoryName' })
  category: string;

  constructor(data?: Partial<PostResDto>) {
    super();
    convertDataToInstance(data, this);
  }
}

export class PostListResDto extends PaginationRes<PostResDto> {
  @Type(() => PostResDto)
  items: PostResDto[];
}
