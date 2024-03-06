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
  });

  const onLogin = async (data: AuthFormDto) => {
    const param = formToInstance<AuthReqDto>({ data: new AuthFormDto(data), instance: AuthReqDto });
    const response = await actionLogic.mutateAsync(param);

    if (response?.status) {
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;

      if (accessToken && refreshToken) {
        dispatch(
          authenticationAction.setAuthentication({
            accessToken,
            refreshToken,
            isRemember: data?.isRemember || false,
          })
        );
      }
    } else {
      const keyError = response?.error?.errorKey;
      setNotice({
        type: 'error',
        message: t(`login:message.error.${keyError}`, undefined, { fallback: t('login:message.error.login_incorrect') }),
      });
    }
  };

  return {
    notice,
    onLogin,
  };
};
