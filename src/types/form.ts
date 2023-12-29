import { PATH } from 'utils/data';

export type TFormField = {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
};

export type TFormLogin = TFormField & { email: string; password: string };
export type TFormRegister = TFormLogin & { name: string };
export type TFormProfile = TFormRegister;
export type TFormForgot = TFormField & { email: string };
export type TFormReset = TFormField & { password: string; token: string };

export interface IFormsSlice {
  [PATH.LOGIN]: TFormLogin;
  [PATH.REGISTER]: TFormRegister;
  [PATH.FORGOT]: TFormForgot;
  [PATH.RESET]: TFormReset;
  [PATH.PROFILE]: TFormProfile;
}

export type TForm = (
  | {
      form: typeof PATH.LOGIN;
      name: keyof TFormLogin;
    }
  | {
      form: typeof PATH.REGISTER;
      name: keyof TFormRegister;
    }
  | {
      form: typeof PATH.FORGOT;
      name: keyof TFormForgot;
    }
  | {
      form: typeof PATH.RESET;
      name: keyof TFormReset;
    }
  | {
      form: typeof PATH.PROFILE;
      name: keyof TFormProfile;
    }
) & { data: string };

// export interface IForm<T extends keyof IFormsSlice> {
//   form: T;
//   name: keyof IFormsSlice[T];
//   data: string;
// }
