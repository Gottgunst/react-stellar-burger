import { createSlice } from '@reduxjs/toolkit';
import { WebsocketStatus, initialOrdersState } from '../../utils/data';
import { wsConnecting, wsOpen, wsClose, wsError, wsMessage } from './actions';
import { calcCost } from '../feed/actions';

export const myFeedSlice = createSlice({
  name: 'myFeed',
  initialState: initialOrdersState,
  reducers: {
    initialOrders(state, { payload, itemsMap }) {
      const itemsObject = {};
      payload.forEach((order) => {
        const costAndIngredients = calcCost(order.ingredients, itemsMap);
        if (costAndIngredients)
          itemsObject[order.number] = { ...order, ...costAndIngredients };
      });
      state.orders = itemsObject;
    },
    updateOrders(state, { payload, itemsMap }) {
      const newItemsObject = {};

      payload.forEach((order) => {
        // const lastNumber = Object.keys(state.orders).sort((a, b) => b - a)[0];
        const costAndIngredients = calcCost(order.ingredients, itemsMap);

        if (costAndIngredients)
          newItemsObject[order.number] = { ...order, ...costAndIngredients };
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
      .addCase(wsMessage, (state, { payload, itemsMap }) => {
        if (state.total === 0) {
          myFeedSlice.caseReducers.initialOrders(state, {
            payload: payload.orders,
            itemsMap: itemsMap,
          });
        } else {
          myFeedSlice.caseReducers.updateOrders(state, {
            payload: payload.orders,
            itemsMap: itemsMap,
          });
        }
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      });
  },
});

export const reducer = myFeedSlice.reducer;
export const { getMyOrderInfo } = myFeedSlice.actions;

export type TMyFeedActions = ReturnType<
  (typeof myFeedSlice.actions)[keyof typeof myFeedSlice.actions]
>;
