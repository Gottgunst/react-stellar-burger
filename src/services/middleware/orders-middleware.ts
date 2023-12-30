import { Middleware } from 'redux';
import { RootState } from 'services/store';
import { TMidAction } from 'types';

export const ordersMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const { getState } = store;
    const { type, payload } = action as TMidAction;

    const { ingredients } = getState();
    const { itemsMap } = ingredients;

    if (type === 'FEED_WS_MESSAGE' || type === 'MY_FEED_WS_MESSAGE') {
      action = {
        ...(action as TMidAction),
        payload: { ...payload, itemsMap: itemsMap },
      };
    }
    return next(action);
  };
