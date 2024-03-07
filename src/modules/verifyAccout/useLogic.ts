import { VerifyAccountReqDto } from '@/dto/request/verifyAccount';
import { useQuery } from '@/hooks';
import { useRouteState } from '@/hooks/useRouteState';
import { verifyAccount } from '@/services';

import { Props } from './declare';

export const useLogic = (): Props => {
  const { query } = useRouteState<VerifyAccountReqDto>();

  const { data, isLoading } = useQuery<unknown, VerifyAccountReqDto>({
    apiConfig: verifyAccount,
    param: query,
  });

  return {
    isLoading,
    isVerify: data?.status || false,
    errorKey: data?.error?.errorKey,
  };
};
