import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string>('MY_FEED_CONNECT');
export const disconnect = createAction<void>('MY_FEED_DISCONNECT');
export const wsConnecting = createAction('MY_FEED_WS_CONNECTING');
export const wsOpen = createAction('MY_FEED_WS_OPEN');
export const wsClose = createAction('MY_FEED_WS_CLOSE');
export const wsMessage = createAction('MY_FEED_WS_MESSAGE');
export const wsError = createAction('MY_FEED_WS_ERROR');
