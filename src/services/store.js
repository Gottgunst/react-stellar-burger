import { configureStore } from '@reduxjs/toolkit';
import { reducer as orderReducer } from './order/reducer';
import { reducer as ingredientsReducer } from './ingredients/reducer';

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
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
