import { HasQueryPaginate } from '@/dto/request/template';
import { convertDataToInstance } from '@/utilities/instance';

export class QueryPostReqDto extends HasQueryPaginate {
  title?: string;

  constructor(data?: Partial<QueryPostReqDto>) {
    super();
    convertDataToInstance(data, this);
  }
}
