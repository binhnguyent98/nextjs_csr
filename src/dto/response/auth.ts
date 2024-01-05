import { convertDataToInstance } from '@/utilities/instance';

export class AuthResDto {
  accessToken!: string;
  refreshToken!: string;

  constructor(data?: Partial<AuthResDto>) {
    convertDataToInstance(data, this);
  }
}
