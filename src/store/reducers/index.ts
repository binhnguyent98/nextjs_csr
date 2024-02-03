import { combineReducers } from '@reduxjs/toolkit';

import { appReducer } from './app';
import { authenticationReducer } from './authentication';

export const rootReducer = combineReducers({
  auth: authenticationReducer,
  app: appReducer,
});
