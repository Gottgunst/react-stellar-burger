import React from 'react';
import { RouterProvider, redirect } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import App from '../app/app';
import { Auth, Constructor, Error, Feed, Profile } from '../pages';
import {
  OrderList,
  ProfilesEdit,
  IngredientDetails,
  OrderDetails,
  NewOrder,
} from '../layout';
import { OnlyAuth, OnlyUnAuth } from './protected-routes';
import { PATH } from '../../utils/data';

/* ####################
|||||||||||||||||||||||
##################### */
const Router: React.FC = () => {
  const router = createBrowserRouter([
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
              path: `${PATH.INGREDIENTS}/:id`,
              element: <IngredientDetails />,
            },
            {
              path: `${PATH.FEED}/new`,
              element: <NewOrder />,
            },
          ],
        },
        {
          path: PATH.INGREDIENTS,
          loader: () => {
            return redirect('/');
          },
        },
        {
          path: PATH.FEED,
          element: <Feed />,
          children: [
            {
              path: `:id`,
              element: <OrderDetails type="feed" />,
            },
          ],
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
              path: PATH.ORDERS,
              element: <OrderList type="myFeed" />,
              children: [
                {
                  path: `:id`,
                  element: <OrderDetails type="myFeed" />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
