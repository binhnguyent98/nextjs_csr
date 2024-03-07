import { convertDataToInstance } from '@/utilities/instance';

export class VerifyAccountReqDto {
  token: string;

  constructor(data?: Partial<VerifyAccountReqDto>) {
    convertDataToInstance(data, this);
  }
}
