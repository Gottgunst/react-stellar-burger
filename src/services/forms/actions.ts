import { createAsyncThunk } from '@reduxjs/toolkit';
import { PATH, POINT } from '../../utils/data';
import { login, passwordForgot, passwordReset } from '../user/action';
import { IFormsSlice } from 'types';

export const formSubmit = createAsyncThunk<
  keyof IFormsSlice,
  keyof IFormsSlice,
  { state: { forms: IFormsSlice } }
>('forms/formSubmit', (form, { dispatch, getState }) => {
  const { forms } = getState();

  switch (form) {
    case PATH.LOGIN:
      dispatch(login({ point: POINT.LOGIN, body: forms[form] }));
      break;
    case PATH.REGISTER:
      dispatch(login({ point: POINT.REGISTER, body: forms[form] }));
      break;
    case PATH.FORGOT:
      dispatch(passwordForgot(forms[form]));
      break;
    case PATH.RESET:
      dispatch(passwordReset(forms[form]));
      break;
    default:
      console.warn('default form case');
      break;
  }
  return form;
});
