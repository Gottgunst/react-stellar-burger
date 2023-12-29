import { ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TOrderActions, reducer as orderReducer } from './order/reducer';
import {
  TIngredientsActions,
  reducer as ingredientsReducer,
} from './ingredients/reducer';
import { TUserActions, reducer as userReducer } from './user/reducer';
import { TFormsActions, reducer as formsReducer } from './forms/reducer';
import { TModalActions, reducer as modalReducer } from './modal/reducer';
import { TFeedActions, reducer as feedReducer } from './feed/reducer';
import { TMyFeedActions, reducer as myFeedReducer } from './my-feed/reducer';

import { socketMiddleware } from './middleware/socket-middleware';
import { ordersMiddleware } from './middleware/orders-middleware';

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

const reducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
  forms: formsReducer,
  modal: modalReducer,
  feed: feedReducer,
  myFeed: myFeedReducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(feedMiddleware)
      .concat(myFeedMiddleware)
      .concat(ordersMiddleware),
});
export default store;

/*#########################
------Типизация-------
#########################*/

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof reducer>;

export type AppActions =
  | TFeedActions
  | TFormsActions
  | TIngredientsActions
  | TModalActions
  | TMyFeedActions
  | TOrderActions
  | TUserActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;

export type AppDispatch = typeof store.dispatch;
// export type AppDispatch<TReturnType = void> = (
//   action: AppActions | AppThunk<TReturnType>,
// ) => TReturnType;
