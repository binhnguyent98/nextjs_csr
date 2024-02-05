import { Expose, Type } from 'class-transformer';

export class TError {
  errorKey: string;
  constraints: string[];
}

export class ResponseTemplate<TData = unknown> {
  status: boolean;
  data?: TData;

  @Type(() => TError)
  error?: TError;
}

export class PaginationRes<TData> {
  items: TData[];

  @Expose({ name: 'paginate' })
  pagination: {
    page: number;
    perPage: number;
    total: number;
  };
}

export const convertDtoToTemplateDto = <TData>(dto: any) => {
  class ResponseTemplateData extends ResponseTemplate<TData> {
    @Type(() => dto)
    data?: TData;
  }

  return ResponseTemplateData;
};

export class HasIdResDto {
  id: string;
}
