export const ordersMiddleware = (store) => (next) => (action) => {
  const { getState, dispatch } = store;
  const { type, payload } = action;

  const { ingredients } = getState();
  const { itemsMap } = ingredients;

  if (type === 'FEED_WS_MESSAGE' || type === 'MY_FEED_WS_MESSAGE') {
    action = { ...action, itemsMap: itemsMap };
  }
  return next(action);
};
