import { TokenReqDto } from '@/dto/request';
import { RenewTokenResDto } from '@/dto/response';
import { useAction } from '@/hooks';
import { axiosCustom } from '@/libs/axios';
import { renewToken } from '@/services';
import { useDispatch, useSelector } from '@/store';
import { authenticationAction } from '@/store/action';

export const useAuthenticate = () => {
  const axios = axiosCustom();

  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const dispatch = useDispatch();
  const actionRenewToken = useAction<TokenReqDto, RenewTokenResDto>({
    apiConfig: renewToken,
    axios,
  });

  const onRenewToken = async (): Promise<string | false> => {
    if (!refreshToken) {
      return false;
    }

    const response = await actionRenewToken.mutateAsync({ token: refreshToken });

    const accessToken = response?.data?.accessToken;

    if (accessToken) {
      dispatch(authenticationAction.setAuthentication({ accessToken }));

      return accessToken;
    }

    return false;
  };

  const onLogout = () => {
    dispatch(authenticationAction.resetAuthentication());
  };

  return {
    onLogout,
    onRenewToken,
  };
};
