import { configureStore } from '@reduxjs/toolkit';
import { reducer as orderReducer } from './order/reducer';
import { reducer as ingredientsReducer } from './ingredients/reducer';
import { reducer as userReducer } from './user/reducer';
import { reducer as formsReducer } from './forms/reducer';
import { reducer as modalReducer } from './modal/reducer';
import { reducer as feedReducer } from './feed/reducer';
import { reducer as myFeedReducer } from './my-feed/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
// import { burgerWss } from './feed/wss';

import {
  connect as feedWsConnect,
  disconnect as feedWsDisconnect,
  wsOpen as feedWsOpen,
  wsClose as feedWsClose,
  wsMessage as feedWsMessage,
  wsError as feedWsError,
  wsConnecting as feedWsConnecting,
} from './feed/actions';

import {
  connect as myFeedWsConnect,
  disconnect as myFeedWsDisconnect,
  wsOpen as myFeedWsOpen,
  wsClose as myFeedWsClose,
  wsMessage as myFeedWsMessage,
  wsError as myFeedWsError,
  wsConnecting as myFeedWsConnecting,
} from './my-feed/actions';
import { ordersMiddleware } from './middleware/orders-middleware';

const feedMiddleware = socketMiddleware({
  wsConnect: feedWsConnect,
  wsDisconnect: feedWsDisconnect,
  wsConnecting: feedWsConnecting,
  onOpen: feedWsOpen,
  onClose: feedWsClose,
  onError: feedWsError,
  onMessage: feedWsMessage,
});

const myFeedMiddleware = socketMiddleware({
  wsConnect: myFeedWsConnect,
  wsDisconnect: myFeedWsDisconnect,
  wsConnecting: myFeedWsConnecting,
  onOpen: myFeedWsOpen,
  onClose: myFeedWsClose,
  onError: myFeedWsError,
  onMessage: myFeedWsMessage,
});

// #########################
// #########################
// #########################
// #########################

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    user: userReducer,
    forms: formsReducer,
    modal: modalReducer,
    feed: feedReducer,
    myFeed: myFeedReducer,
    // [burgerWss.reducerPath]: burgerWss.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(feedMiddleware)
      .concat(myFeedMiddleware)
      .concat(ordersMiddleware),
});
