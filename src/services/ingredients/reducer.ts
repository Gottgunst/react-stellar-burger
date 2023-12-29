import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from './actions';
import {
  IIncomeIngredient,
  IIngredient,
  IIngredientsSlice,
  TIngredientsType,
  TItemsMap,
} from 'types';

const initialState: IIngredientsSlice = {
  itemsMap: {},
  group: [
    { name: 'Булки', type: 'bun', active: true },
    { name: 'Соусы', type: 'sauce', active: false },
    { name: 'Начинки', type: 'main', active: false },
  ],
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    changeTab(state, { payload }: PayloadAction<TIngredientsType>) {
      state.group.forEach((e) => (e.active = e.type === payload));
    },
    increment(state, { payload }: PayloadAction<IIngredient>) {
      if (payload.type !== 'bun') {
        state.itemsMap[payload._id].quantity += 1;
      } else {
        Object.keys(state.itemsMap).forEach((id) => {
          if (state.itemsMap[id].type === 'bun')
            state.itemsMap[id].quantity = 0;
        });
        state.itemsMap[payload._id].quantity = 1;
      }
    },
    decrement(state, { payload }: PayloadAction<IIngredient>) {
      state.itemsMap[payload._id].quantity > 0
        ? (state.itemsMap[payload._id].quantity -= 1)
        : (state.itemsMap[payload._id].quantity = 0);
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
        const itemsObject: TItemsMap = {};

        payload.data.forEach((e: IIncomeIngredient) => {
          itemsObject[e._id] = { ...e, quantity: 0 };
        });

        state.itemsMap = itemsObject;
      });
  },
});

export const reducer = ingredientsSlice.reducer;
export const { changeTab, increment, decrement, resetQuantity } =
  ingredientsSlice.actions;

/*#########################
------Типизация-------
#########################*/

type TActionsCreators = typeof ingredientsSlice.actions;
export type TIngredientsActions = ReturnType<
  TActionsCreators[keyof TActionsCreators]
>;
