import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import store from './services/store';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  Auth,
  Constructor,
  Error,
  Feed,
  Ingredients,
  Profile,
} from './components/pages';
import { OrderList, ProfilesEdit } from './components/layout';

export const REGISTER = 'register';
export const LOGIN = 'login';
export const FORGOT = 'forgot-password';
export const RESET = 'reset-password';
export const PROFILE = 'profile';
export const FEED = 'feed';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Constructor />,
      },
      {
        path: FEED,
        element: <Feed />,
      },
      {
        path: LOGIN,
        element: <Auth />,
      },
      {
        path: REGISTER,
        element: <Auth />,
      },
      {
        path: FORGOT,
        element: <Auth />,
      },
      {
        path: RESET,
        element: <Auth />,
      },
      {
        path: PROFILE,
        element: <Profile />,
        children: [
          {
            path: '',
            element: <ProfilesEdit />,
          },
          {
            path: 'orders',
            element: <OrderList />,
          },
        ],
      },
      {
        path: 'ingredients',
        element: <Ingredients />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
