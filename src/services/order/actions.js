import { burgerApi } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { _packOrder } from './reducer';

export const sendOrder = createAsyncThunk(
  'order/completeOrder',
  async (_, { rejectWithValue, dispatch, getState }) => {
    // пакуем выбранные элементы
    dispatch(_packOrder());
    // получаем стейт
    const { order } = getState();

    return burgerApi
      .makeRequest('/orders', 'POST', {
        ingredients: order.packedItems,
      })
      .then((res) => {
        if (!res.success) {
          throw new Error('wrum-wrum post');
        }
        // отправляем данные
        return res;
      })
      .catch((err) => {
        console.warn('STATUS', err.status, '#######', err);
        return rejectWithValue({ err: err });
      });
  },
);
