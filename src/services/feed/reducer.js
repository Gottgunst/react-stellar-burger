import { createSlice } from '@reduxjs/toolkit';

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    orders: [],
    focus: {
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa094a',
      ],
      _id: '#034533',
      status: 'done',
      number: 1,
      createdAt: '2021-06-23T20:11:01.403Z',
      updatedAt: '2021-06-23T20:11:01.406Z',
      name: 'Black Hole Singularity острый бургер',
    },
    loading: false,
    error: null,
  },
  reducers: {
    getOrderInfo(state, { payload }) {
      payload
        ? (state.focus = state.items.find((e) => e._id === payload.item._id))
        : (state.focus = null);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loadIngredients.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(loadIngredients.rejected, (state, { payload }) => {
  //       state.loading = false;
  //       state.error = payload;
  //       state.items = reserveData;
  //     })
  //     .addCase(loadIngredients.fulfilled, (state, { payload }) => {
  //       state.loading = false;
  //       state.items = payload.data.map((e, index) => {
  //         return { ...e, quantity: 0 };
  //       });
  //     });
  // },
});

export const reducer = feedSlice.reducer;
// export const { changeTab, getInfo, increment, decrement, resetQuantity } =
//   ingredientsSlice.actions;
