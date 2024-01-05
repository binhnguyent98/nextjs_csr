import { configureStore, Middleware, Tuple } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useDispatchRoot, useSelector as useSelectorRoot } from 'react-redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';

import { PERSIS_AUTH_KEY } from '@/constants/redux';
import { storage } from '@/libs/cookies';

import { appAction } from './action';
import { rootReducer } from './reducers';
import { AuthKey } from './reducers/authentication';

const persistConfig = {
  key: PERSIS_AUTH_KEY,
  storage,
  whitelist: [AuthKey],
  keyPrefix: 'auth_',
};

const modeDev = process.env.NEXT_PUBLIC_MODE;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: modeDev === 'dev',
    middleware: () => {
      if (modeDev) {
        return new Tuple(logger as Middleware);
      }

      return new Tuple();
    },
  });

  return store;
};

export const storeGlobal = makeStore();
export const persistor = persistStore(storeGlobal, null, () => {
  setTimeout(() => {
    // set loading app
    storeGlobal.dispatch(appAction.setLoader({ appLoader: true }));
  }, 500);
});

export type AppDispatch = typeof storeGlobal.dispatch;
export type RootState = ReturnType<typeof storeGlobal.getState>;

export const useDispatch = () => useDispatchRoot<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRoot;
