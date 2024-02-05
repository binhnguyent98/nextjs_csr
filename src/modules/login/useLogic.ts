import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { AlertMessageProps } from '@/components/custom/alertMessage';
import { AuthReqDto } from '@/dto/request/';
import { AuthResDto } from '@/dto/response';
import { useAction } from '@/hooks';
import { login } from '@/services';
import { useDispatch } from '@/store';
import { authenticationAction } from '@/store/action';
import { formToInstance } from '@/utilities/instance';

import { AuthFormDto, Props } from './declare';

export const useLogic = (): Props => {
  const { t } = useTranslation();
  const [notice, setNotice] = useState<AlertMessageProps>();
  const dispatch = useDispatch();
  const actionLogic = useAction<AuthReqDto, AuthResDto>({
    apiConfig: login,
    onFinally({ type, data }) {
      if (type === 'success') {
        handleOnSuccess(data?.data);
      } else {
        const keyError = data?.error?.errorKey;
        setNotice({
          type: 'error',
          message: t(`login:message.error.${keyError}`, undefined, { fallback: t('login:message.error.login_incorrect') }),
        });
      }
    },
  });

  const handleOnSuccess = (data?: AuthResDto) => {
    const accessToken = data?.accessToken;
    const refreshToken = data?.refreshToken;

    if (accessToken && refreshToken) {
      dispatch(
        authenticationAction.setAuthentication({
          accessToken,
          refreshToken,
          isRemember: false,
        })
      );
    }
  };

  const onLogin = (data: AuthFormDto) => {
    const param = formToInstance<AuthReqDto>({ data: new AuthFormDto(data), instance: AuthReqDto });

    actionLogic.mutateAsync(param);
  };

  return {
    notice,
    onLogin,
  };
};
