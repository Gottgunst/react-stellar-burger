import { POINT, burgerApi } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';

// export const loadIngredients = createAsyncThunk(
//   'ingredients/loadIngredients',
//   async (_, { rejectWithValue, dispatch }) => {
//     return burgerApi.makeRequest(POINT.INGREDIENTS).then((res) => {
//       if (!res.success) {
//         return rejectWithValue({ ...res, point: POINT.INGREDIENTS });
//       }
//       return res;
//     });
//   },
// );
