import 'reflect-metadata';
import '@/styles/globals.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ROOT_LAYOUT_TYPE, RootContainer } from '@/containers/root';
import { AxiosProvider } from '@/providers/axios';
import { NotificationProvider } from '@/providers/notification';
import { TranslateProvider } from '@/providers/translate';
import { persistor, storeGlobal } from '@/store';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  layoutType: ROOT_LAYOUT_TYPE;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();

  return (
    <Provider store={storeGlobal}>
      <PersistGate persistor={persistor}>
        <TranslateProvider>
          <NotificationProvider>
            <AxiosProvider>
              <QueryClientProvider client={queryClient}>
                <RootContainer layoutType={Component.layoutType ?? ROOT_LAYOUT_TYPE.GUEST}>
                  <Component {...pageProps} />
                </RootContainer>
              </QueryClientProvider>
            </AxiosProvider>
          </NotificationProvider>
        </TranslateProvider>
      </PersistGate>
    </Provider>
  );
}
