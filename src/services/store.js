import { configureStore } from '@reduxjs/toolkit';
import { reducer as orderReducer } from './order/reducer';
import { reducer as ingredientsReducer } from './ingredients/reducer';
import { reducer as userReducer } from './user/reducer';
import { reducer as formsReducer } from './forms/reducer';
import { reducer as modalReducer } from './modal/reducer';
import { reducer as feedReducer } from './feed/reducer';

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    user: userReducer,
    forms: formsReducer,
    modal: modalReducer,
    feed: feedReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// export const configureStore = () => {
//   const store = createStore({
//     reducer: {
//       order: orderReducer,
//     },
//     preloadedState: initialState,
//   });

//   return store;
// };
