import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    bun: {},
    items: [],
    price: 0,
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
    // setUser: {
    //   reducer: (state, action) => {
    //     state.user = action.payload;
    //   },
    //   prepare: (user) => {
    //     const id = Math.random();
    //     return { payload: {...user, key: id}}
    //   }
    // }
  },
});

export const reducer = orderSlice.reducer;
export const { addToOrder, removeFromOrder } = orderSlice.actions;
