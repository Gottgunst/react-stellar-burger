import { createSlice } from '@reduxjs/toolkit';
import { WebsocketStatus, initialOrdersState } from '../../utils/data';
import { wsConnecting, wsOpen, wsClose, wsError, wsMessage } from './actions';

export const myFeedSlice = createSlice({
  name: 'myFeed',
  initialState: initialOrdersState,
  reducers: {},
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
      });
  },
});

export const reducer = myFeedSlice.reducer;
export const { getMyOrderInfo } = myFeedSlice.actions;
