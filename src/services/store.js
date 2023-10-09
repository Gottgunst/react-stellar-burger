import { configureStore } from '@reduxjs/toolkit';
import { reducer as orderReducer } from './order/reducer';

export default configureStore({
  reducer: {
    order: orderReducer,
  },
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
