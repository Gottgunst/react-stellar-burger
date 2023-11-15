import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  patchProfile,
  passwordForgot,
  passwordReset,
} from './action';

const initialState = {
  user: null,
  isAuthChecked: false,
  resetMode: false,
  loading: false,
  error: null,
  success: false,
};

const pending = (state) => {
  state.resetMode = false;
  state.loading = true;
  state.success = false;
  state.error = null;
};
const rejected = (state, { payload }) => {
  console.log(payload);
  state.error = payload;
  state.loading = false;
  state.success = false;
};
const fulfilled = (state) => {
  state.loading = false;
  state.error = null;
  state.success = true;
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
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, pending)
      .addCase(login.rejected, rejected)
      .addCase(login.fulfilled, (state, { payload }) => {
        fulfilled(state);

        state.user = payload.user;
        state.isAuthChecked = true;
        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(logout.pending, pending)
      .addCase(logout.rejected, rejected)
      .addCase(logout.fulfilled, (state) => {
        fulfilled(state);

        state.user = null;
      })
      .addCase(patchProfile.pending, pending)
      .addCase(patchProfile.rejected, rejected)
      .addCase(patchProfile.fulfilled, (state, { payload }) => {
        fulfilled(state);
        state.user = { ...state.user, ...payload.user };
      })
      .addCase(passwordForgot.pending, pending)
      .addCase(passwordForgot.rejected, rejected)
      .addCase(passwordForgot.fulfilled, (state, { payload }) => {
        fulfilled(state);

        state.resetMode = true;
        alert(payload.message);
      })

      .addCase(passwordReset.pending, pending)
      .addCase(passwordReset.rejected, rejected)
      .addCase(passwordReset.fulfilled, (state, { payload }) => {
        fulfilled(state);

        state.resetMode = false;
        alert(payload.message);
      });
  },
});

export const reducer = userSlice.reducer;
export const { resetError, setAuthChecked, setUser, setPassword } =
  userSlice.actions;
