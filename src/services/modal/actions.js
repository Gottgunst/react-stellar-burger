import { POINT, burgerApi } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkExpired } from '../check';

export const loadOneOrder = createAsyncThunk(
  'feed/loadOneOrder',
  async (orderNumber, thunkApi) => {
    const point = `${POINT.ORDERS}/${orderNumber}`;
    return burgerApi
      .makeRequest(point)
      .then((res) =>
        checkExpired(res, point, loadOneOrder(orderNumber), thunkApi),
      );
  },
);
