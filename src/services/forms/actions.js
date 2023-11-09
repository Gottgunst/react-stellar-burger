import { createAsyncThunk } from '@reduxjs/toolkit';
import { burgerApi, PATH, TARGET_POINT } from '../../utils/data';
import { setUser } from '../user/reducer';
import { setForm } from './reducer';

export const formSubmit = createAsyncThunk(
  'forms/formSubmit',
  async ({ form }, { rejectWithValue, dispatch, getState }) => {
    const { forms } = getState();

    return burgerApi
      .makeRequest(TARGET_POINT.get(form), 'POST', forms[form])
      .then((res) => {
        if (!res.success) {
          console.warn('STATUS', res.status, '#######', res);
          return rejectWithValue({ err: res, form });
        }
        // отправляем данные
        console.log(form, 'formSubmit', res);

        switch (form) {
          case PATH.LOGIN:
          case PATH.REGISTER:
            dispatch(setUser(res));
            dispatch(
              setForm({
                form: PATH.PROFILE,
                formData: { ...res.user, password: forms[form].password },
              }),
            );
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            break;

          default:
            break;
        }
        return { res, form };
      });
  },
);
