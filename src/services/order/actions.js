import { POINT, burgerApi } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { _packOrder } from './reducer';
import { updateToken } from '../user/action';

export const sendOrder = createAsyncThunk(
  'order/completeOrder',
  async (_, { rejectWithValue, dispatch, getState }) => {
    // пакуем выбранные элементы
    dispatch(_packOrder());
    // получаем стейт
    const { order } = getState();

    return burgerApi
      .makeRequest(POINT.ORDERS, 'POST', {
        ingredients: order.packedItems,
      })
      .then((res) => {
        if (!res.success) {
          if (res.message === 'jwt expired') {
            dispatch(updateToken()).then((res) => {
              dispatch(sendOrder());
            });
          } else {
            console.error('STATUS Order', res.status, '#######', res);
            return rejectWithValue({ err: res });
          }
        }
        // отправляем данные
        return res;
      });
  },
);
