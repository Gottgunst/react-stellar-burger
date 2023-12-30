import { PayloadAction, UnknownAction, createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  patchProfile,
  passwordForgot,
  passwordReset,
  getUser,
  updateToken,
} from './action';
import { burgerApi } from 'utils/data';
import { IUser, IUserSlice } from 'types';
import { IResponse } from 'types/api';

const initialState: IUserSlice = {
  user: null,
  isAuthChecked: false,
  resetMode: false,
  loading: false,
  error: null,
  success: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthChecked = payload;
    },
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
      state.isAuthChecked = true;
    },
    setPassword: (state, { payload }: PayloadAction<string>) => {
      if (state.user) state.user.password = payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.rejected, (state, { payload }) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('password');

        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;

        state.user = {
          ...state.user,
          ...payload.user,
          password: localStorage.getItem('password')!,
        };
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthChecked = true;

        burgerApi.updateToken(payload.accessToken);
        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
        localStorage.setItem('password', payload.user.password!);
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        state.user = null;
      })
      .addCase(patchProfile.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload.user };
      })
      .addCase(passwordForgot.fulfilled, (state, { payload }) => {
        state.resetMode = true;
        alert(payload.message);
      })
      .addCase(passwordReset.fulfilled, (state, { payload }) => {
        state.resetMode = false;
        alert(payload.message);
      })
      .addCase(updateToken.fulfilled, (state, { payload }) => {
        console.log('update token');

        burgerApi.updateToken(payload.accessToken);
        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addMatcher(
        (action: UnknownAction) => isThis(action, 'pending'),
        (state) => {
          state.resetMode = false;
          state.loading = true;
          state.success = false;
          state.error = null;
        },
      )
      .addMatcher(
        (action: UnknownAction) => isThis(action, 'rejected'),
        (state, action: IResponse) => {
          state.error = action.payload;
          state.error.extra = action.error;
          state.loading = false;
          state.success = false;
        },
      )
      .addMatcher(
        (action: UnknownAction) => isThis(action, 'fulfilled'),
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.success = true;
        },
      );
  },
});

export const reducer = userSlice.reducer;
export const { resetError, setAuthChecked, setUser, setPassword } =
  userSlice.actions;

function isThis(
  action: UnknownAction,
  type: 'fulfilled' | 'rejected' | 'pending',
) {
  return action.type.endsWith(type);
}

/*#########################
------Типизация-------
#########################*/
type TActionsCreators = typeof userSlice.actions;
export type TUserActions = ReturnType<TActionsCreators[keyof TActionsCreators]>;
