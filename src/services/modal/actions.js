import { POINT, burgerApi } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkExpired } from '../check';
import { loadIngredients } from '../ingredients/actions';

export const loadOneOrder = createAsyncThunk(
  'modal/loadOneOrder',
  async (orderNumber, thunkApi) => {
    const point = `${POINT.ORDERS}/${orderNumber}`;

    // получаем список ингредиентов
    await thunkApi.dispatch(loadIngredients());

    // получаем данные по заказу
    return burgerApi
      .makeRequest(point)
      .then((res) =>
        checkExpired(res, point, loadOneOrder(orderNumber), thunkApi),
      )
      .then((res) => {
        const { ingredients } = thunkApi.getState();
        const { itemsMap } = ingredients;
        return { ...res, itemsMap };
      });
  },
);
