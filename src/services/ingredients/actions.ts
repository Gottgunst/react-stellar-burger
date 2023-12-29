import { POINT, burgerApi } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkSuccess } from '../check';
import { IIncomeIngredient, TRejectValue } from 'types';

export const loadIngredients = createAsyncThunk<
  { data: IIncomeIngredient[] },
  void,
  { rejectValue: TRejectValue }
>('ingredients/loadIngredients', async (_, thunkAPI) => {
  const point = POINT.INGREDIENTS;

  return burgerApi
    .makeRequest(point)
    .then((res) => checkSuccess({ res, point, thunkAPI }));
});
