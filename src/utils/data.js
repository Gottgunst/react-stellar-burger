import Api from './Api';

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
};

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
};

export const burgerApi = new Api({
  baseUrl: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    authorization: localStorage.getItem('accessToken') || '',
  },
  paths: POINT,
});

export const WebsocketStatus = {
  CONNECTING: 'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
};

export const orderStatus = {
  creating: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
  cancel: 'Отменён',
};

export const initialOrdersState = {
  status: WebsocketStatus.OFFLINE,
  connectingError: '',
  orders: [{}],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null,
};
