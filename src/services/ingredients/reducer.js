import { createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from './actions';

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    items: [],
    focus: null,
    loading: false,
    error: null,
    group: [
      { name: 'Булки', type: 'bun', active: true },
      { name: 'Соусы', type: 'sauce', active: false },
      { name: 'Начинки', type: 'main', active: false },
    ],
  },
  reducers: {
    changeTab(state, { payload }) {
      state.group.forEach(
        (e) => (e.active = e.type === payload.type ? true : false),
      );
    },
    getInfo(state, { payload }) {
      payload
        ? (state.focus = state.items.find((e) => e._id === payload.item._id))
        : (state.focus = null);
    },
    increment(state, { payload }) {
      const itemId = state.items.findIndex((e) => e._id === payload.item._id);
      if (payload.item.type !== 'bun') {
        state.items[itemId].quantity += 1;
      } else {
        state.items.forEach((e) =>
          e.type === 'bun' ? (e.quantity = 0) : null,
        );
        state.items[itemId].quantity = 1;
      }
    },
    decrement(state, { payload }) {
      const itemId = state.items.findIndex((e) => e._id === payload.item._id);
      state.items[itemId].quantity > 0
        ? (state.items[itemId].quantity -= 1)
        : (state.items[itemId].quantity = 0);
    },
    resetQuantity(state) {
      state.items.forEach((e) => (e.type === 'bun' ? null : (e.quantity = 0)));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadIngredients.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.err;
        state.items = payload.reserved;
      })
      .addCase(loadIngredients.fulfilled, (state, { payload }) => {
        state.loading = false;
        // находим индекс первой булки
        const firsBun = payload.findIndex((e) => e.type === 'bun');
        state.items = payload.map((e, index) => {
          // добавляем свойство с кол-вом элементов в заказе
          const q = index === firsBun ? 1 : 0;
          return { ...e, quantity: q };
        });
      });
  },
});

export const reducer = ingredientsSlice.reducer;
export const { changeTab, getInfo, increment, decrement, resetQuantity } =
  ingredientsSlice.actions;
