import Api from './Api';
import { IApi, IOrdersFeed } from 'types';

/* ####################
КОНФИГ ИМЕН ПУТЕЙ ======
##################### */
export const PATH = {
  REGISTER: 'register',
  LOGIN: 'login',
  FORGOT: 'forgot-password',
  RESET: 'reset-password',
  PROFILE: 'profile',
  FEED: 'feed',
  INGREDIENTS: 'ingredients',
  ORDERS: 'orders',
} as const;

/* ####################
КОНФИГ API ============
##################### */
export const POINT = {
  INGREDIENTS: '/ingredients',
  ORDERS: '/orders',
  ORDERS_ALL: '/orders/all',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  TOKEN: '/auth/token',
  USER: '/auth/user',
  FORGOT: '/password-reset',
  RESET: '/password-reset/reset',
} as const;

export const headers = {
  'Content-Type': 'application/json',
  authorization: localStorage.getItem('accessToken') || '',
};

export const burgerApi = new Api({
  baseUrl: process.env.REACT_APP_API_URL,
  headers,
  paths: POINT,
} as IApi);

/* ####################
КОНФИГ WSS ============
##################### */

export const WebsocketStatus = {
  CONNECTING: 'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
} as const;

export const orderStatus = {
  creating: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
  cancel: 'Отменён',
} as const;

export const initialOrdersState = {
  status: WebsocketStatus.OFFLINE,
  connectingError: '',
  orders: {},
  total: 0,
  totalToday: 0,
  loading: false,
  error: null,
} as IOrdersFeed;
