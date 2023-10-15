import { burgerApi, reserveData } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToOrder } from '../order/reducer';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async (_, { rejectWithValue, dispatch }) => {
    return burgerApi
      .makeRequest('/ingredients')
      .then((res) => {
        if (!res.success) {
          throw new Error('wrum-wrum get');
        }

        // находим первую булку
        const firstBun = res.data.find((e) => e.type === 'bun');
        // устанавливаем булку по умолчанию
        dispatch(addToOrder({ item: firstBun }));
        // отправляем данные
        return res.data;
      })
      .catch((err) => {
        console.warn('STATUS', err.status, '#######', err);
        dispatch(addToOrder({ item: reserveData[0] }));
        return rejectWithValue({ err: err, reserved: reserveData });
      });
  },
);
