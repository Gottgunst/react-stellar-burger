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

// export const checkSuccess = (res, point) => {
//   if (!res.success) {
//
//     return Promise.reject({ ...res, point });
//   }
//   return res;
// };

// export const checkJWT = (res, rejectWithValue, point, dispatch, repeat) => {
//   if (!res.success) {
//     if (res.message === 'jwt expired') {
//       dispatch(updateToken()).then((res) => dispatch(repeat));
//     } else {
//       return rejectWithValue({ ...res, point });
//     }
//   }
//   return res;
// };

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    return burgerApi.makeRequest(POINT.USER, 'GET').then((res) => {
      if (!res.success) {
        return rejectWithValue({ ...res, point: POINT.USER });
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
          dispatch(updateToken()).then((res) => {
            dispatch(patchProfile(body));
          });
        } else {
          return rejectWithValue({ ...res, point: POINT.USER });
        }
      }
      return res;
    });
  },
);

export const updateToken = createAsyncThunk(
  'user/updateToken',
  async (_, { rejectWithValue }) => {
    const body = {
      token: localStorage.getItem('refreshToken'),
    };

    return burgerApi.makeRequest(POINT.TOKEN, 'POST', body).then((res) => {
      if (!res.success) {
        return rejectWithValue({ ...res, point: POINT.TOKEN });
      }
      return res;
    });
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const body = {
      token: localStorage.getItem('refreshToken'),
    };

    return burgerApi.makeRequest(POINT.LOGOUT, 'POST', body).then((res) => {
      if (!res.success) {
        return rejectWithValue({ ...res, point: POINT.LOGOUT });
      }
      return res;
    });
  },
);
