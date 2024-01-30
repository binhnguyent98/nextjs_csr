import { AuthReqDto } from '@/dto/request/';
import { AuthResDto } from '@/dto/response';
import { useAction } from '@/hooks';
import { login } from '@/services';
import { useDispatch } from '@/store';
import { authenticationAction } from '@/store/action';
import { formToInstance } from '@/utilities/instance';

import { AuthFormDto, Props } from './declare';

export const useLogic = (): Props => {
  const dispatch = useDispatch();
  const actionLogic = useAction<AuthReqDto, AuthResDto>({
    apiConfig: login,
    dataResDto: AuthResDto,
  });

  const onLogin = async (data: AuthFormDto) => {
    const param = formToInstance<AuthReqDto>({ data: new AuthFormDto(data), instance: AuthReqDto });

    const response = await actionLogic.mutateAsync(param);
    const accessToken = response?.data?.accessToken;
    const refreshToken = response?.data?.refreshToken;

    if (response?.status && accessToken && refreshToken) {
      dispatch(
        authenticationAction.setAuthentication({
          accessToken,
          refreshToken,
          isRemember: data?.isRemember || false,
        })
      );
    }
  };

  return {
    onLogin,
  };
};
