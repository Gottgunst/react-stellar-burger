import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebsocketStatus, initialOrdersState } from '../../utils/data';
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
  calcCost,
} from './actions';
import { TFeedOrders, TOrdersMap } from 'types';

export const feedSlice = createSlice({
  name: 'feed',
  initialState: initialOrdersState,
  reducers: {
    initialOrders(state, { payload }: PayloadAction<TFeedOrders>) {
      const { orders, itemsMap } = payload;
      const itemsObject: TOrdersMap = {};

      orders.forEach((order) => {
        const costAndIngredients = calcCost(order.ingredients, itemsMap);

        if (costAndIngredients)
          itemsObject[order.number] = { ...order, ...costAndIngredients };
      });
      state.orders = itemsObject;
    },
    updateOrders(state, { payload }: PayloadAction<TFeedOrders>) {
      const { orders, itemsMap } = payload;
      const newItemsObject: TOrdersMap = {};

      orders.forEach((order) => {
        // const lastNumber = Object.keys(state.orders).sort((a, b) => b - a)[0];
        const costAndIngredients = calcCost(order.ingredients, itemsMap);

        if (costAndIngredients) {
          newItemsObject[order.number] = { ...order, ...costAndIngredients };
        }
      });
      state.orders = { ...state.orders, ...newItemsObject };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(wsConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(wsOpen, (state) => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = '';
      })
      .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsError, (state, { payload }) => {
        state.connectingError = payload;
      })
      .addCase(wsMessage, (state, { payload }) => {
        if (state.total === 0) {
          feedSlice.caseReducers.initialOrders(state, {
            payload: {
              orders: payload.orders,
              itemsMap: payload.itemsMap,
            },
            type: 'myFeed/initialOrders',
          });
        } else {
          feedSlice.caseReducers.updateOrders(state, {
            payload: {
              orders: payload.orders,
              itemsMap: payload.itemsMap,
            },
            type: 'myFeed/updateOrders',
          });
        }
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      });
  },
});

export const reducer = feedSlice.reducer;
// export const { initialOrders, updateOrders } = feedSlice.actions;

// export type TFeedActions = ReturnType<
//   (typeof feedSlice.actions)[keyof typeof feedSlice.actions]
// >;
