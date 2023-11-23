import { POINT, burgerApi } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkSuccess } from '../check';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async (_, thunkAPI) => {
    const point = POINT.INGREDIENTS;

    return burgerApi
      .makeRequest(point)
      .then((res) => checkSuccess(res, point, thunkAPI));
  },
);
