import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './action';

const initialState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, { payload }) => {
      state.isAuthChecked = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const reducer = userSlice.reducer;
export const { setAuthChecked, setUser } = userSlice.actions;
