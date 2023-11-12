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
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  TOKEN: '/auth/token',
};

export const burgerApi = new Api({
  baseUrl: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paths: POINT,
});

/* ####################
КОНФИГ ФОРМ ============
##################### */
export const TARGET_POINT = new Map([
  [PATH.LOGIN, POINT.LOGIN],
  [PATH.REGISTER, POINT.REGISTER],
]);

/* ####################
Резервная дата =========
##################### */

export const reserveData = [
  {
    _id: '60666c42cc7b410027a1a9b1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
  },
  {
    _id: '60666c42cc7b410027a1a9b5',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
  },
  {
    _id: '60666c42cc7b410027a1a9ba',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
    __v: 0,
  },
  {
    _id: '60666c42cc7b410027a1a9bd',
    name: 'Кристаллы марсианских альфа-сахаридов',
    type: 'main',
    proteins: 234,
    fat: 432,
    carbohydrates: 111,
    calories: 189,
    price: 762,
    image: 'https://code.s3.yandex.net/react/code/core.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
    __v: 0,
  },
];
