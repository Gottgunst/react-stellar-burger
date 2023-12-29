import { IAsyncState, TFormLogin, TFormRegister, TPointValue } from '.';

export interface IIncomeUser {
  email: string;
  name: string;
}
export interface IUser extends IIncomeUser {
  password?: string;
}

export interface IUserSlice extends IAsyncState {
  user: IUser | null;
  isAuthChecked: boolean;
  resetMode: boolean;
  error: any;
}

export type TUserAuth = {
  point: TPointValue;
  body: TFormLogin | TFormRegister;
};

export type TResponse = {
  success: boolean;
};

export type TResponseLogin = TResponse & {
  accessToken: string;
  refreshToken: string;
  user: IUser;
};

export type TResponseProfile = TResponse & {
  user: IIncomeUser;
};

export type TResponseToken = TResponse & {
  accessToken: string;
  refreshToken: string;
};

export type TResponseRecovery = TResponse & {
  message: string;
};

export type TResponseLogout = TResponseRecovery;

export type TPatchProfile =
  | { name: string }
  | { email: string }
  | { password: string };
