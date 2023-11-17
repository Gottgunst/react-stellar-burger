import { createSlice } from '@reduxjs/toolkit';
import { formSubmit } from './actions';
import { PATH } from '../../utils/data';

const initialState = {
  [PATH.LOGIN]: { email: '', password: '' },
  [PATH.REGISTER]: { email: '', password: '', name: '' },
  [PATH.FORGOT]: { email: '' },
  [PATH.RESET]: { password: '', token: '' },
  [PATH.PROFILE]: { email: '', password: '', name: '' },
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setForm: (state, { payload }) => {
      if (payload.formData)
        state[payload.form] = { ...state[payload.form], ...payload.formData };
      else state[payload.form][payload.name] = payload.data;
    },
    setProfileForm: (state, { payload }) => {
      if (payload.formData) {
        state[PATH.PROFILE] = payload.formData;
      } else {
        state[PATH.PROFILE][payload.name] = payload.data;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(formSubmit.fulfilled, (state, { payload }) => {
      state[payload.form] = initialState[payload.form];
    });
  },
});

export const reducer = formsSlice.reducer;
export const { setForm, setProfileForm } = formsSlice.actions;
