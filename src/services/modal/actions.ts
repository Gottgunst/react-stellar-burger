import { POINT, burgerApi } from 'utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkExpired } from '../check';
import { loadIngredients } from '../ingredients/actions';
import { TIncomeOneOrder, TRejectValue } from 'types';
import { RootState } from '../store';

export const loadOneOrder = createAsyncThunk<
  TIncomeOneOrder,
  number,
  { rejectValue: TRejectValue; state: RootState }
>('modal/loadOneOrder', async (orderNumber, thunkAPI) => {
  const point = `${POINT.ORDERS}/${orderNumber}`;

  // получаем список ингредиентов
  await thunkAPI.dispatch(loadIngredients());

  // получаем данные по заказу
  return burgerApi
    .makeRequest(point)
    .then((res) => checkExpired({ res, point, thunkAPI }))
    .then((res) => {
      const { ingredients } = thunkAPI.getState();
      const { itemsMap } = ingredients;
      return { ...res, itemsMap };
    });
});
