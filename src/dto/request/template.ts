import { Transform } from 'class-transformer';

export class HasQueryPaginate {
  @Transform(({ value }) => Number(value))
  page?: number;

  @Transform(({ value }) => Number(value))
  perPage?: number;
}
