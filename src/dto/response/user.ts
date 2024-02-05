import { Expose, Transform, Type } from 'class-transformer';

import { convertDataToInstance } from '@/utilities/instance';

import { PaginationRes } from '.';

export class UserResDto {
  name?: string;
  id?: string;

  @Expose()
  @Transform(({ obj }) => obj.id)
  email?: string;

  constructor(data?: Partial<UserResDto>) {
    convertDataToInstance(data, this);
  }
}

export class UserResListDto extends PaginationRes<UserResDto> {
  @Type(() => UserResDto)
  items: UserResDto[];
}
