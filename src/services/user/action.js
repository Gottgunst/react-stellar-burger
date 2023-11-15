import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthChecked } from './reducer';
import { POINT, burgerApi } from '../../utils/data';

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser());
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    return burgerApi.makeRequest(POINT.USER, 'GET').then((res) => {
      if (!res.success) {
        return rejectWithValue(res);
      }
      return res;
    });
  },
);

export const login = createAsyncThunk(
  'user/login',
  async ({ point, body }, { rejectWithValue }) => {
    return burgerApi.makeRequest(point, 'POST', body).then((res) => {
      if (!res.success) {
        return rejectWithValue({ ...res, point });
      }

      //дополняем профиль паролем из формы
      res.user.password = body.password;
      return res;
    });
  },
);

export const passwordForgot = createAsyncThunk(
  'user/passwordForgot',
  async (body, { rejectWithValue, dispatch }) => {
    return burgerApi.makeRequest(POINT.FORGOT, 'POST', body).then((res) => {
      if (!res.success) {
        return rejectWithValue({ ...res, point: POINT.FORGOT });
      }
      return res;
    });
  },
);

export const passwordReset = createAsyncThunk(
  'user/passwordReset',
  async (body, { rejectWithValue, dispatch }) => {
    return burgerApi.makeRequest(POINT.RESET, 'POST', body).then((res) => {
      if (!res.success) {
        return rejectWithValue({ ...res, point: POINT.RESET });
      }
      console.log(res);
      return res;
    });
  },
);

export const patchProfile = createAsyncThunk(
  'user/patchProfile',
  async (body, { rejectWithValue, dispatch }) => {
    return burgerApi.makeRequest(POINT.USER, 'PATCH', body).then((res) => {
      if (!res.success) {
        if (res.message === 'jwt expired') {
          console.log(res.message);
          dispatch(updateToken()).then((res) => {
            console.log('repeat');
            dispatch(patchProfile(body));
          });
        } else {
          console.warn('STATUS', res.status, '#######', res);
          return rejectWithValue({ err: res });
        }
      }
      return res;
    });
  },
);

export const updateToken = createAsyncThunk(
  'user/patchProfile',
  async (_, { dispatch }) => {
    const body = {
      token: localStorage.getItem('refreshToken'),
    };

    return burgerApi
      .makeRequest(POINT.TOKEN, 'POST', body)
      .then((res) => {
        console.log('update locale', res);
        return res;
      })
      .catch((err) => {
        console.warn('## TOKEN  ##', err);
      });
  },
);

export const logout = createAsyncThunk('user/logout', async () => {
  const body = {
    token: localStorage.getItem('refreshToken'),
  };

  burgerApi.makeRequest(POINT.LOGOUT, 'POST', body).then((res) => {
    return res;
  });
});
