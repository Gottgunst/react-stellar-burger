import { configureStore } from '@reduxjs/toolkit';
import { reducer as orderReducer } from './order/reducer';
import { reducer as ingredientsReducer } from './ingredients/reducer';
import { reducer as userReducer } from './user/reducer';
import { reducer as formsReducer } from './forms/reducer';

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    user: userReducer,
    forms: formsReducer,
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
