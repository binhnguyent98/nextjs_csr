import useTranslation from 'next-translate/useTranslation';

import { VerifyAccountReqDto } from '@/dto/request/verifyAccount';
import { useAction, useQuery } from '@/hooks';
import { useNotification } from '@/hooks/useNotification';
import { useRouteState } from '@/hooks/useRouteState';
import { resendVerify, verifyAccount } from '@/services';

import { Props } from './declare';

export const useLogic = (): Props => {
  const { query } = useRouteState<VerifyAccountReqDto>();
  const { t } = useTranslation('verifyAccount');
  const { notification } = useNotification();

  const { data, isLoading } = useQuery<unknown, VerifyAccountReqDto>({
    apiConfig: verifyAccount,
    param: query,
  });

  const resendAction = useAction<VerifyAccountReqDto, unknown>({
    apiConfig: resendVerify,
    onFinally({ type }) {
      notification({
        title: type === 'success' ? t('message.resend_success') : t('message.resend_error'),
        type,
      });
    },
  });

  const onActionResend = (data: VerifyAccountReqDto) => {
    resendAction.mutateAsync(data);
  };

  return {
    isLoading,
    isVerify: data?.status || false,
    errorKey: data?.error?.errorKey,
    resendVerify: {
      isLoading: resendAction.isLoading,
      onAction: onActionResend,
    },
  };
};
