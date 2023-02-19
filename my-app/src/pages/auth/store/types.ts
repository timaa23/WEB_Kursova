export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string | null;
  lastName: string | null;
}

export interface IAuthProvider {
  provider: string;
  token: string;
}

export interface IAuthState {
  token: string | null;
}

export enum AuthActionTypes {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  LOGOUT = "LOGOUT",
}

export interface ILoginAction {
  type: AuthActionTypes.LOGIN;
  payload: IAuthState;
}

export interface IRegisterAction {
  type: AuthActionTypes.REGISTER;
}

export interface IUserState {
  name?: string;
  isAuth: boolean;
  roles: Array<string>;
}

export interface LoginUserAction {
  type: AuthActionTypes.LOGIN;
  payload: IUserState;
}

export interface LogoutUserAction {
  type: AuthActionTypes.LOGOUT;
  payload: IUserState;
}

export type AuthActions = ILoginAction | IRegisterAction | LogoutUserAction;
