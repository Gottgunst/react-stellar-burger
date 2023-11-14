import { createSlice } from '@reduxjs/toolkit';
import { login, logout, patchProfile } from './action';

const initialState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null,
  success: false,
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
    setPassword: (state, { payload }) => {
      state.user.password = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.rejected, (state, props) => {
        console.warn('Login rejected', props);
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthChecked = true;

        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(patchProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(patchProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.user = { ...state.user, ...payload.user };
      });
  },
});

export const reducer = userSlice.reducer;
export const { setAuthChecked, setUser, setPassword } = userSlice.actions;
