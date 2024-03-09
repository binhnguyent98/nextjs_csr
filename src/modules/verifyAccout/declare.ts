import { VerifyAccountReqDto } from '@/dto/request/verifyAccount';

export type Props = {
  isLoading: boolean;
  isVerify: boolean;
  errorKey?: string;
  resendVerify: {
    isLoading: boolean;
    onAction: (data: VerifyAccountReqDto) => void;
  };
};

export const ErrorKeyTokenExpired = 'token_expired';
