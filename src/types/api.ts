import { POINT, headers } from 'utils/data';
import {
  GValueOf,
  TFormForgot,
  TFormLogin,
  TFormRegister,
  TFormReset,
  TPatchProfile,
} from '.';

export type TPoint = typeof POINT;
export type TPointValue = GValueOf<TPoint>;

export interface IApi {
  baseUrl: string;
  headers: THeaders;
  paths: TPoint;
}

export interface IKeyPath {
  key: keyof TPoint;
  id: string;
}

export type THeaders = typeof headers;
export type TMethods = 'GET' | 'POST' | 'PATCH';
export type TBody =
  | TFormRegister
  | TFormLogin
  | TFormForgot
  | TFormReset
  | { ingredients: string[] }
  | { token: string }
  | TPatchProfile
  | undefined
  | null;

export type TRejectValue = {
  point: TPointValue | string;
  success: boolean;
  message: string;
  extra?: TError;
};

export type TError = {
  message?: string | undefined;
  name?: string | undefined;
  stack?: string | undefined;
};

export interface IResponse {
  error: TError;
  payload: TRejectValue;
  type: string;
  meta: any;
}
