import { createSelector } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';

import { AppLoading } from '@/components/loading/appLoading';
import { PATH } from '@/constants/path';
import { RootState, useSelector } from '@/store';

interface Props {
  children?: React.ReactNode;
}

const authSelector = (state: RootState) => state.auth;
const appLoaderSelector = (state: RootState) => state.app.appLoader;

const combinedSelector = createSelector([authSelector, appLoaderSelector], (auth, appLoader) => ({ auth, appLoader }));

export const withGuest = <T extends Props = Props>(Component: React.ComponentType<T>) => {
  const HOC: React.FC<T> = (props: T) => {
    const router = useRouter();
    const { auth, appLoader } = useSelector(combinedSelector);
    const { accessToken, refreshToken } = auth;

    if (!appLoader) {
      return <AppLoading />;
    }

    if (accessToken && refreshToken) {
      router.replace(PATH.HOME);

      return <></>;
    }

    return <Component {...props} />;
  };

  return HOC;
};
