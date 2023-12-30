import { POINT, burgerApi } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { _packOrder } from './reducer';
import { checkExpired } from '../check';
import { RootState } from '../store';
import { TRejectValue } from 'types';
import { TNewOrder } from 'types';

export const sendOrder = createAsyncThunk<
  TNewOrder,
  void,
  { rejectValue: TRejectValue; state: RootState }
>('order/completeOrder', async (_, thunkAPI) => {
  // пакуем выбранные элементы
  thunkAPI.dispatch(_packOrder());
  // получаем стейт
  const { order } = thunkAPI.getState();
  const point = POINT.ORDERS;
  const method = 'POST';
  const body = {
    ingredients: order.packedItems,
  };

  return burgerApi
    .makeRequest(point, method, body)
    .then((res) => checkExpired({ res, thunkAPI, point, method, body }));
});
