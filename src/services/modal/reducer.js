import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    setModal: (state, { payload }) => {
      state.isModalOpen = payload;
    },
  },
});

export const reducer = modalSlice.reducer;
export const { setModal } = modalSlice.actions;
