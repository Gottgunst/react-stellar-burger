import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { sendOrder } from './actions';
import { IIngredient, IOrderSlice, TDragIndex } from 'types';

const initialState: IOrderSlice = {
  bun: null,
  items: [],
  price: 0,
  packedItems: [],
  orderId: null,
  name: null,
  success: false,
  error: null,
  loading: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrder: {
      reducer: (
        state,
        { payload }: PayloadAction<{ item: IIngredient; key: string }>,
      ) => {
        const newItem = { ...payload.item, key: payload.key };

        if (payload.item.type === 'bun') {
          state.bun = newItem;
        } else {
          state.items.push(newItem);
        }

        orderSlice.caseReducers._calcPrice(state);
      },
      prepare: (item: IIngredient) => {
        const key = nanoid();
        return { payload: { item, key } };
      },
    },
    removeFromOrder(state, { payload }: PayloadAction<number>) {
      state.items = state.items.filter((item, index) => index !== payload);

      orderSlice.caseReducers._calcPrice(state);
    },
    sortOrder(state, { payload }: PayloadAction<TDragIndex>) {
      const { dragIndex, hoverIndex } = payload;
      state.items.splice(hoverIndex, 0, state.items.splice(dragIndex, 1)[0]);
    },
    _calcPrice(state) {
      state.price = [...state.items, state.bun]
        .map((e) => e!.price)
        .reduce((sum, num) => sum + num, 0);
    },
    _packOrder(state) {
      state.packedItems = [...state.items, state.bun].map((e) => e!._id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.error!.extra = action.error;
        state.orderId = null;
      })
      .addCase(sendOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.orderId = payload.order.number;
        state.name = payload.name;
        state.items = [];
        state.bun = null;
        state.price = 0;
      });
  },
});

export const reducer = orderSlice.reducer;
export const { addToOrder, removeFromOrder, sortOrder, _packOrder } =
  orderSlice.actions;

/*#########################
------Типизация-------
#########################*/

type TActionsCreators = typeof orderSlice.actions;
export type TOrderActions = ReturnType<
  TActionsCreators[keyof TActionsCreators]
>;
