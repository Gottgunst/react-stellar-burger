import { createSlice } from '@reduxjs/toolkit';
import { WebsocketStatus, initialOrdersState } from '../../utils/data';
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
  loadOneOrder,
} from './actions';

export const feedSlice = createSlice({
  name: 'feed',
  initialState: initialOrdersState,
  reducers: {
    getOrderInfo(state, { payload }) {
      payload ? (state.focus = payload) : (state.focus = null);
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
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      })
      .addCase(loadOneOrder.pending, (state) => {})
      .addCase(loadOneOrder.rejected, (state, { payload }) => {
        console.log('er ', payload);
      })
      .addCase(loadOneOrder.fulfilled, (state, { payload }) => {
        state.focus = payload.orders[0];
      });
  },
});

export const reducer = feedSlice.reducer;
export const { getOrderInfo } = feedSlice.actions;
