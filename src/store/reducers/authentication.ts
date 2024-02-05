import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const AuthKey = 'auth';

interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  isRemember?: boolean;
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  isRemember: false,
};

const authSlice = createSlice({
  name: AuthKey,
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<AuthState>) => {
      const newState = { ...state, ...action.payload };

      return newState;
    },
    resetAuthentication: () => {
      return { ...initialState };
    },
  },
});

export const authenticationReducer = authSlice.reducer;
export const authenticationAction = authSlice.actions;
