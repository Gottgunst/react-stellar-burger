import { createAsyncThunk } from '@reduxjs/toolkit';
import { POINT, burgerApi } from '../../utils/data';
import { checkExpired, checkSuccess } from '../check';
import { setAuthChecked } from './reducer';

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser());
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  const point = POINT.USER;

  return burgerApi
    .makeRequest(point, 'GET')
    .then((res) => checkExpired(res, point, getUser(), thunkAPI));
});

export const login = createAsyncThunk(
  'user/login',
  async ({ point, body }, thunkAPI) => {
    return burgerApi
      .makeRequest(point, 'POST', body)
      .then((res) => checkSuccess(res, point, thunkAPI))
      .then((res) => {
        //дополняем профиль паролем из формы
        res.user.password = body.password;
        return res;
      });
  },
);

export const passwordForgot = createAsyncThunk(
  'user/passwordForgot',
  async (body, thunkAPI) => {
    const point = POINT.FORGOT;

    return burgerApi
      .makeRequest(point, 'POST', body)
      .then((res) => checkSuccess(res, point, thunkAPI));
  },
);

export const passwordReset = createAsyncThunk(
  'user/passwordReset',
  async (body, thunkAPI) => {
    const point = POINT.RESET;

    return burgerApi
      .makeRequest(point, 'POST', body)
      .then((res) => checkSuccess(res, point, thunkAPI));
  },
);

export const patchProfile = createAsyncThunk(
  'user/patchProfile',
  async (body, thunkAPI) => {
    const point = POINT.USER;

    return burgerApi
      .makeRequest(point, 'PATCH', body)
      .then((res) => checkExpired(res, point, patchProfile(body), thunkAPI));
  },
);

export const updateToken = createAsyncThunk(
  'user/updateToken',
  async (_, thunkAPI) => {
    const point = POINT.TOKEN;
    const body = {
      token: localStorage.getItem('refreshToken'),
    };

    return burgerApi
      .makeRequest(point, 'POST', body)
      .then((res) => checkSuccess(res, point, thunkAPI));
  },
);

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  const point = POINT.LOGOUT;
  const body = {
    token: localStorage.getItem('refreshToken'),
  };

  return burgerApi
    .makeRequest(point, 'POST', body)
    .then((res) => checkSuccess(res, point, thunkAPI));
});
