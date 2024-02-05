import { Exclude } from 'class-transformer';

import { AlertMessageProps } from '@/components/custom/alertMessage';
import { convertDataToInstance } from '@/utilities/instance';

export class AuthFormDto {
  email: string;
  password: string;

  @Exclude()
  isRemember: boolean;

  constructor(data?: Partial<AuthFormDto>) {
    convertDataToInstance(data, this);
  }
}

export interface Props {
  notice?: AlertMessageProps;
  onLogin: (data: AuthFormDto) => void;
}
