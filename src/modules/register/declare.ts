import { Exclude } from 'class-transformer';

import { AlertMessageProps } from '@/components/custom/alertMessage';
import { convertDataToInstance } from '@/utilities/instance';

export class RegisterFormDto {
  name: string;
  email: string;
  password: string;

  @Exclude()
  isRemember: boolean;

  constructor(data?: Partial<RegisterFormDto>) {
    convertDataToInstance(data, this);
  }
}

export interface Props {
  notice?: AlertMessageProps;
  handleResetNotice: () => void;
  onRegister: (data: RegisterFormDto) => void;
}
