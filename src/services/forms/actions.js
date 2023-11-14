import { createAsyncThunk } from '@reduxjs/toolkit';
import { PATH, TARGET_POINT } from '../../utils/data';
import { login } from '../user/action';
import { setForm } from './reducer';

export const formSubmit = createAsyncThunk(
  'forms/formSubmit',
  async ({ form }, { dispatch, getState }) => {
    const { forms } = getState();

    switch (form) {
      case PATH.LOGIN:
      case PATH.REGISTER:
        dispatch(login({ point: TARGET_POINT.get(form), body: forms[form] }));
        break;
      case PATH.FORGOT:
        //
        break;
      case PATH.RESET:
        //
        break;
      default:
        console.warn('default form case');
        break;
    }
    return { form };
  },
);
