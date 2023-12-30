import { createAsyncThunk } from '@reduxjs/toolkit';
import { POINT, burgerApi } from '../../utils/data';
import { checkExpired, checkSuccess } from '../check';
import { setAuthChecked } from './reducer';
import { AppDispatch } from 'services/store';
import {
  TResponseLogin,
  TResponseProfile,
  TResponseToken,
  TResponseRecovery,
  TResponseLogout,
  TUserAuth,
  TFormForgot,
  TFormReset,
  TRejectValue,
  GSelf,
  TPatchProfile,
} from 'types';

export const checkUserAuth = () => {
  return (dispatch: AppDispatch): void => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser());
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const getUser = createAsyncThunk<
  TResponseLogin,
  void,
  { rejectValue: TRejectValue }
>('user/getUser', async (_, thunkAPI) => {
  const point = POINT.USER;

  return burgerApi
    .makeRequest(point)
    .then((res) => checkExpired({ res, thunkAPI, point }));
});

export const login = createAsyncThunk<
  TResponseLogin,
  TUserAuth,
  { rejectValue: TRejectValue }
>('user/login', async ({ point, body }, thunkAPI) => {
  const extra: GSelf<TResponseLogin> = (res) => {
    res.user.password = body.password;
    return res;
  };

  return burgerApi
    .makeRequest(point, 'POST', body)
    .then((res) => checkSuccess({ res, point, thunkAPI, extra }));
});

export const passwordForgot = createAsyncThunk<
  TResponseRecovery,
  TFormForgot,
  { rejectValue: TRejectValue }
>('user/passwordForgot', async (body, thunkAPI) => {
  const point = POINT.FORGOT;

  return burgerApi
    .makeRequest(point, 'POST', body)
    .then((res) => checkSuccess({ res, point, thunkAPI }));
});

export const passwordReset = createAsyncThunk<
  TResponseRecovery,
  TFormReset,
  { rejectValue: TRejectValue }
>('user/passwordReset', async (body, thunkAPI) => {
  const point = POINT.RESET;

  return burgerApi
    .makeRequest(point, 'POST', body)
    .then((res) => checkSuccess({ res, point, thunkAPI }));
});

export const patchProfile = createAsyncThunk<
  TResponseProfile,
  TPatchProfile,
  { rejectValue: TRejectValue }
>('user/patchProfile', async (body, thunkAPI) => {
  const point = POINT.USER;
  const method = 'PATCH';

  return burgerApi
    .makeRequest(point, method, body)
    .then((res) => checkExpired({ res, thunkAPI, point, method, body }));
});

export const updateToken = createAsyncThunk<
  TResponseToken,
  void,
  { rejectValue: TRejectValue }
>('user/updateToken', async (_, thunkAPI) => {
  const point = POINT.TOKEN;
  const body = {
    token: localStorage.getItem('refreshToken')!,
  };

  return burgerApi
    .makeRequest(point, 'POST', body)
    .then((res) => checkSuccess({ res, point, thunkAPI }));
});

export const logout = createAsyncThunk<
  TResponseLogout,
  void,
  { rejectValue: TRejectValue }
>('user/logout', async (_, thunkAPI) => {
  const point = POINT.LOGOUT;
  const body = {
    token: localStorage.getItem('refreshToken')!,
  };

  return burgerApi
    .makeRequest(point, 'POST', body)
    .then((res) => checkSuccess({ res, point, thunkAPI }));
});
