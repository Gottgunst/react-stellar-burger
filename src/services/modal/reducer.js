import { createSlice } from '@reduxjs/toolkit';
import { loadOneOrder } from './actions';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    focus: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    setModal: (state, { payload }) => {
      state.isModalOpen = payload;
    },
    setFocus: (state, { payload }) => {
      payload ? (state.focus = payload) : (state.focus = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOneOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loadOneOrder.rejected, (state, { payload }) => {
        console.log('er ', payload);
        state.loading = false;
        state.success = false;
        state.error = payload;
      })
      .addCase(loadOneOrder.fulfilled, (state, { payload }) => {
        state.focus = payload.orders[0];
      });
  },
});

export const reducer = modalSlice.reducer;
export const { setModal, setFocus } = modalSlice.actions;
