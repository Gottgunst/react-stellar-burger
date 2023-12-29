import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { formSubmit } from './actions';
import { PATH } from 'utils/data';
import { IFormsSlice, TForm, TFormProfile } from 'types';

export const initialState: IFormsSlice = {
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
    setForm: (state, { payload }: PayloadAction<TForm>) => {
      switch (payload.form) {
        case PATH.LOGIN:
          state[payload.form][payload.name] = payload.data;
          break;
        case PATH.REGISTER:
          state[payload.form][payload.name] = payload.data;
          break;
        case PATH.FORGOT:
          state[payload.form][payload.name] = payload.data;
          break;
        case PATH.RESET:
          state[payload.form][payload.name] = payload.data;
          break;
      }
    },
    setProfileForm: (
      state,
      { payload }: PayloadAction<TForm | TFormProfile>,
    ) => {
      if ((payload as TForm).form && (payload as TForm).name !== 'token') {
        state[PATH.PROFILE][payload.name as keyof TFormProfile] = (
          payload as TForm
        ).data;
      } else {
        state[PATH.PROFILE] = payload as TFormProfile;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(formSubmit.fulfilled, (state, { payload }) => {
      switch (payload) {
        case PATH.LOGIN:
          state[payload] = initialState[payload];
          break;
        case PATH.REGISTER:
          state[payload] = initialState[payload];
          break;
        case PATH.FORGOT:
          state[payload] = initialState[payload];
          break;
        case PATH.RESET:
          state[payload] = initialState[payload];
          break;
      }
    });
  },
});

export const reducer = formsSlice.reducer;
export const { setForm, setProfileForm } = formsSlice.actions;

export type TFormsActions = ReturnType<
  (typeof formsSlice.actions)[keyof typeof formsSlice.actions]
>;
