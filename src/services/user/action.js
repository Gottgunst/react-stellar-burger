import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setAuthChecked } from './reducer';
import { POINT, burgerApi } from '../../utils/data';

export const getUser = () => {
  console.log('getUSer');
  //   return (dispatch) => {
  //     return burgerApi.makeRequest().then((res) => {
  //       dispatch(setUser(res.user));
  //     });
  //   };
};

export const login = createAsyncThunk('user/login', async () => {
  // const res = await burgerApi.makeRequest(POINT.LOGIN);
  // return res.user;
});

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
