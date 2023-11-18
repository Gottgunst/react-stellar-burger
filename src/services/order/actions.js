import { POINT, burgerApi } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { _packOrder } from './reducer';
// import { updateToken } from '../user/action';
import { checkExpired } from '../check';

export const sendOrder = createAsyncThunk(
  'order/completeOrder',
  async (_, thunkAPI) => {
    // пакуем выбранные элементы
    thunkAPI.dispatch(_packOrder());
    // получаем стейт
    const { order } = thunkAPI.getState();
    const point = POINT.ORDERS;
    const body = {
      ingredients: order.packedItems,
    };

    return burgerApi
      .makeRequest(POINT.ORDERS, 'POST', body)
      .then((res) => checkExpired(res, point, sendOrder(), thunkAPI));
    // .then((res) => {
    //   if (!res.success) {
    //     if (res.message === 'jwt expired') {
    //       dispatch(updateToken()).then((res) => {
    //         dispatch(sendOrder());
    //       });
    //     } else {
    //       console.error('STATUS Order', res.status, '#######', res);
    //       return rejectWithValue({ err: res });
    //     }
    //   }
    //   return res;
    // });
  },
);
