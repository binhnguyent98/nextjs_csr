import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const AppKey = 'app';

interface AppState {
  appLoader: boolean;
}

const initialState: AppState = {
  appLoader: false,
};

const authSlice = createSlice({
  name: AppKey,
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<AppState>) => {
      const newState = { ...state, ...action.payload };

      return newState;
    },
  },
});

export const appReducer = authSlice.reducer;
export const appAction = authSlice.actions;
