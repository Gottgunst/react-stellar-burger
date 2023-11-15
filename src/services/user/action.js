import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setAuthChecked } from './reducer';
import { POINT, burgerApi } from '../../utils/data';

export const getUser = () => {
  return (dispatch) => {
    console.log('getUser');
    const body = {
      token: localStorage.getItem('refreshToken'),
    };

    return burgerApi.makeRequest(POINT.TOKEN, 'POST', body).then((res) => {
      dispatch(setUser(res.user));
    });
    // .catch((err) => {
    //   console.warn('## GET USER ERR ##', err);
    // });
  };
};

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
  'user/profile',
  async (body, { rejectWithValue, dispatch }) => {
    return burgerApi.makeRequest(POINT.USER, 'PATCH', body).then((res) => {
      if (!res.success) {
        if (res.message === 'jwt expired') {
          dispatch(getUser());
          dispatch(patchProfile(body));
        }

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
