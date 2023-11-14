import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setAuthChecked } from './reducer';
import { PATH, POINT, burgerApi } from '../../utils/data';
import { setForm } from '../forms/reducer';

export const getUser = () => {
  console.log('getUser');

  const body = {
    token: localStorage.getItem('refreshToken'),
  };

  return (dispatch) => {
    return burgerApi
      .makeRequest(POINT.TOKEN, 'POST', body)
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        console.warn('## GET USER ERR ##', err);
      });
  };
};

export const login = createAsyncThunk(
  'user/login',
  async ({ point, body }, { rejectWithValue }) => {
    return burgerApi.makeRequest(point, 'POST', body).then((res) => {
      if (!res.success) {
        console.warn('STATUS', res.status, '#######', res);
        return rejectWithValue({ err: res, point });
      }

      //дополняем профиль паролем из формы
      res.user.password = body.password;
      return res;
    });
  },
);

export const patchProfile = createAsyncThunk(
  'user/profile',
  async (body, { rejectWithValue, dispatch }) => {
    return burgerApi.makeRequest(POINT.USER, 'PATCH', body).then((res) => {
      if (!res.success) {
        console.warn('STATUS', res.status, '#######', res);
        return rejectWithValue({ err: res });
      }
      return res;
    });
  },
);

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const logout = createAsyncThunk('user/logout', async () => {
  const body = {
    token: localStorage.getItem('refreshToken'),
  };

  burgerApi.makeRequest(POINT.LOGOUT, 'POST', body).then((res) => {
    console.log('Logout', res, body);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
