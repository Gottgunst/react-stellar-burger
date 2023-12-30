import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { TBody, TMethods, TRejectValue } from 'types';
import { RootState } from './store';
import { updateToken } from './user/action';
import { burgerApi } from 'utils/data';
import { GSelf } from 'types/types';
import { TResponseLogin } from 'types/user';

/* ####################
======= ТИПИЗАЦИЯ ======
##################### */
type TCheckExpiredProps = {
  res: any;
  thunkAPI: GetThunkAPI<{ rejectValue: TRejectValue; state: RootState }>;
  point: string;
  method?: TMethods;
  body?: TBody;
};

type TCheckSuccessProps = Omit<TCheckExpiredProps, 'method' | 'body'> & {
  extra?: GSelf<TResponseLogin>;
};

/* ####################
|||||||||||||||||||||||
##################### */

export const checkExpired = async ({
  res,
  thunkAPI,
  point,
  method,
  body,
}: TCheckExpiredProps): Promise<typeof res> => {
  const { dispatch, rejectWithValue } = thunkAPI;

  if (!res.success) {
    if (res.message === 'jwt expired') {
      return dispatch(updateToken()).then((_) =>
        burgerApi.makeRequest(point, method, body),
      );
    } else {
      return rejectWithValue({ ...res, point });
    }
  }
  return res;
};

export const checkSuccess = async ({
  res,
  thunkAPI,
  point,
  extra,
}: TCheckSuccessProps): Promise<typeof res> => {
  const { rejectWithValue } = thunkAPI;

  if (!res.success) {
    return rejectWithValue({ ...res, point });
  }
  if (extra) return extra(res);
  return res;
};

export const wssToken = (): string =>
  localStorage.getItem('accessToken')!.slice(1, 7);
