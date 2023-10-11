import { createSlice } from '@reduxjs/toolkit';
import { sendOrder } from './actions';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    bun: {},
    items: [],
    price: 0,
    packedItems: [],
    orderId: null,
    name: null,
    success: false,
    error: null,
    loading: false,
  },
  reducers: {
    addToOrder(state, { payload }) {
      if (payload.item.type === 'bun') {
        state.bun = payload.item;
      } else {
        state.items.push(payload.item);
      }

      orderSlice.caseReducers._calcPrice(state);
    },
    removeFromOrder(state, { payload }) {
      state.items = state.items.filter(
        (item, index) => index !== payload.index,
      );

      orderSlice.caseReducers._calcPrice(state);
    },
    _calcPrice(state) {
      state.price = [...state.items, state.bun]
        .map((e) => e.price)
        .reduce((sum, num) => sum + num, 0);
    },
    _packOrder(state) {
      state.packedItems = [...state.items, state.bun].map((e) => e._id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload.err;
        state.orderId = payload.err.message;
      })
      .addCase(sendOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.orderId = payload.order.number;
        state.name = payload.name;
        state.items = [];
        orderSlice.caseReducers._calcPrice(state);
      });
  },
});

export const reducer = orderSlice.reducer;
export const { addToOrder, removeFromOrder, _packOrder } = orderSlice.actions;
