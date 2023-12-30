import { createAction } from '@reduxjs/toolkit';
import { TResponseFeed } from 'types';

export const connect = createAction<string, 'MY_FEED_CONNECT'>(
  'MY_FEED_CONNECT',
);
export const disconnect = createAction('MY_FEED_DISCONNECT');
export const wsConnecting = createAction('MY_FEED_WS_CONNECTING');
export const wsOpen = createAction('MY_FEED_WS_OPEN');
export const wsClose = createAction('MY_FEED_WS_CLOSE');
export const wsMessage = createAction<TResponseFeed, 'MY_FEED_WS_MESSAGE'>(
  'MY_FEED_WS_MESSAGE',
);
export const wsError = createAction<string, 'MY_FEED_WS_ERROR'>(
  'MY_FEED_WS_ERROR',
);
