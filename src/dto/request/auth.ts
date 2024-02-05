import { convertDataToInstance } from '@/utilities/instance';

export class AuthReqDto {
  email!: string;
  password!: string;

  constructor(data?: Partial<AuthReqDto>) {
    convertDataToInstance(data, this);
  }
}

export class TokenReqDto {
  token!: string;

  constructor(data?: Partial<TokenReqDto>) {
    convertDataToInstance(data, this);
  }
}
