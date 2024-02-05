import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { AlertMessageProps } from '@/components/custom/alertMessage';
import { AuthReqDto } from '@/dto/request/';
import { AuthResDto } from '@/dto/response';
import { useAction } from '@/hooks';
import { register } from '@/services';

import { Props, RegisterFormDto } from './declare';

export const useLogic = (): Props => {
  const { t } = useTranslation();
  const [notice, setNotice] = useState<AlertMessageProps>();
  const registerAction = useAction<AuthReqDto, AuthResDto>({
    apiConfig: register,
    onFinally({ type, data }) {
      const message =
        type === 'success'
          ? t('register:message.register_success')
          : t(`register:message.error.${data?.error?.errorKey}`, undefined, { fallback: t('register:message.error.fail') });

      setNotice({ type, message });
    },
  });

  const onRegister = async (data: RegisterFormDto) => {
    registerAction.mutateAsync(data);
  };

  return {
    notice,
    handleResetNotice: () => setNotice(undefined),
    onRegister,
  };
};
