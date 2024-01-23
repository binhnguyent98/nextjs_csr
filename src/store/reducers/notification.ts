import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const NotificationKey = 'notification';

interface NotificationState {
  key: string;
  loading: boolean;
}

const initialState: NotificationState = {
  key: '',
  loading: false,
};

const notificationSlice = createSlice({
  name: NotificationKey,
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<NotificationState>) => {
      const newState = { ...state, ...action.payload };

      return newState;
    },
  },
});

export const loadingReducer = notificationSlice.reducer;
export const loadingAction = notificationSlice.actions;
