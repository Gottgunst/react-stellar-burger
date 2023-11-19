import { createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from './actions';
import { reserveData } from '../../utils/data';

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    itemsMap: {},
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
        ? (state.focus = state.itemsMap[payload.item._id])
        : (state.focus = null);
    },
    increment(state, { payload }) {
      if (payload.item.type !== 'bun') {
        state.itemsMap[payload.item._id].quantity += 1;
      } else {
        Object.keys(state.itemsMap).forEach((id) => {
          if (state.itemsMap[id].type === 'bun')
            state.itemsMap[id].quantity = 0;
        });
        state.itemsMap[payload.item._id].quantity = 1;
      }
    },
    decrement(state, { payload }) {
      state.itemsMap[payload.item._id].quantity > 0
        ? (state.itemsMap[payload.item._id].quantity -= 1)
        : (state.itemsMap[payload.item._id].quantity = 0);
    },
    resetQuantity(state) {
      Object.keys(state.itemsMap).forEach((id) => {
        state.itemsMap[id].quantity = 0;
      });
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
        state.error = payload;
      })
      .addCase(loadIngredients.fulfilled, (state, { payload }) => {
        state.loading = false;
        const itemsObject = {};

        payload.data.forEach((e) => {
          itemsObject[e._id] = { ...e, quantity: 0 };
        });
        state.itemsMap = itemsObject;
      });
  },
});

export const reducer = ingredientsSlice.reducer;
export const { changeTab, getInfo, increment, decrement, resetQuantity } =
  ingredientsSlice.actions;
