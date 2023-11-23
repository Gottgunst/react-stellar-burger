import { createSlice } from '@reduxjs/toolkit';
import { loadOneOrder } from './actions';
import { calcCost } from '../feed/actions';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    focus: null,
    oneOrder: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    setModal: (state, { payload }) => {
      state.isModalOpen = payload;
    },
    setFocus: (state, { payload }) => {
      state.focus = null;
      state.focus = payload;
    },
    parseOneOrder(state, { payload }) {
      const order = payload.orders[0];

      const costAndIngredients = calcCost(order.ingredients, payload.itemsMap);
      if (costAndIngredients)
        state.oneOrder = { ...order, ...costAndIngredients };
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
        state.loading = false;
        state.success = true;
        modalSlice.caseReducers.parseOneOrder(state, { payload });
      });
  },
});

export const reducer = modalSlice.reducer;
export const { setModal, setFocus } = modalSlice.actions;
