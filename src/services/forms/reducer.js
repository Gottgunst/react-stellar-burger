import { createSlice } from '@reduxjs/toolkit';
import { formSubmit, getProfileData } from './actions';
import { PATH } from '../../utils/data';

const initialState = {
  [PATH.LOGIN]: { email: '', password: '' },
  [PATH.REGISTER]: { email: '', password: '', name: '' },
  [PATH.FORGOT]: { email: '' },
  [PATH.RESET]: { password: '', code: '' },
  [PATH.PROFILE]: { email: '', password: '', name: '' },
  success: false,
  error: null,
  loading: false,
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setForm: (state, { payload }) => {
      if (payload.formData) state[payload.form] = payload.formData;
      else state[payload.form][payload.name] = payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(formSubmit.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(formSubmit.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
        // state[payload.form] = initialState[payload.form];
      })
      .addCase(formSubmit.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state[payload.form] = initialState[payload.form];
      })
      .addCase(getProfileData.fulfilled, (state, { payload }) => {
        state[PATH.PROFILE] = payload;
      });
  },
});

export const reducer = formsSlice.reducer;
export const { setForm } = formsSlice.actions;
