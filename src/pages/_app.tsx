import 'reflect-metadata';
import '@/styles/globals.scss';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ROOT_LAYOUT_TYPE, RootContainer } from '@/containers/root';
import { AxiosProvider } from '@/providers/axios';
import { NotificationProvider } from '@/providers/notification';
import { ReactQueryProvider } from '@/providers/reactQuery';
import { TranslateProvider } from '@/providers/translate';
import { persistor, storeGlobal } from '@/store';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  layoutType: ROOT_LAYOUT_TYPE;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider store={storeGlobal}>
      <PersistGate persistor={persistor}>
        <TranslateProvider>
          <NotificationProvider>
            <ReactQueryProvider>
              <AxiosProvider>
                <RootContainer layoutType={Component.layoutType ?? ROOT_LAYOUT_TYPE.GUEST}>
                  <Component {...pageProps} />
                </RootContainer>
              </AxiosProvider>
            </ReactQueryProvider>
          </NotificationProvider>
        </TranslateProvider>
      </PersistGate>
    </Provider>
  );
}
