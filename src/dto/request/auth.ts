import { convertDataToInstance } from '@/utilities/instance';

export class AuthReqDto {
  email!: string;
  password!: string;

  constructor(data?: Partial<AuthReqDto>) {
    convertDataToInstance(data, this);
  }
}
