import { updateToken } from './user/action';

export const checkSuccess = async (res, point, { rejectWithValue }) => {
  if (!res.success) {
    return rejectWithValue({ ...res, point });
  }
  return res;
};

export const checkExpired = async (
  res,
  point,
  repeat,
  { dispatch, rejectWithValue },
) => {
  if (!res.success) {
    if (res.message === 'jwt expired') {
      dispatch(updateToken()).then((res) => dispatch(repeat));
    } else {
      return rejectWithValue({ ...res, point });
    }
  }
  return res;
};

export const wssToken = () => {
  return localStorage.getItem('accessToken').slice(1, 7);
};
