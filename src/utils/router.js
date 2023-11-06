import { createBrowserRouter } from 'react-router-dom';
import App from '../components/app/app';
import { Auth, Constructor, Error, Feed, Profile } from '../components/pages';
import {
  OrderList,
  ProfilesEdit,
  IngredientDetails,
} from '../components/layout';
import { OnlyAuth, OnlyUnAuth } from './protected-routes';
import { PATH } from './data';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Constructor />,
        children: [
          {
            path: 'ingredients/:id',
            element: <IngredientDetails />,
          },
        ],
      },
      {
        path: PATH.FEED,
        element: <Feed />,
      },
      {
        path: PATH.LOGIN,
        element: <OnlyUnAuth component={<Auth />} />,
      },
      {
        path: PATH.REGISTER,
        element: <OnlyUnAuth component={<Auth />} />,
      },
      {
        path: PATH.FORGOT,
        element: <OnlyUnAuth component={<Auth />} />,
      },
      {
        path: PATH.RESET,
        element: <OnlyUnAuth component={<Auth />} />,
      },
      {
        path: PATH.PROFILE,
        element: <OnlyAuth component={<Profile />} />,
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
    ],
  },
]);
