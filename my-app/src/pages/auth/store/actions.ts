import { Dispatch } from "react";
import http from "../../../http_common";
import jwtDecode from "jwt-decode";
import {
  AuthActionTypes,
  AuthActions,
  IAuthProvider,
  ILoginCredentials,
  IRegister,
  IUserState,
} from "./types";
import { IServiceResponse } from "../../../store/types";

export const Login =
  (credentials: ILoginCredentials) =>
  async (dispatch: Dispatch<AuthActions>) => {
    try {
      const resp = await http.post<IServiceResponse>(
        "/api/Account/login",
        credentials
      );
      const { data } = resp;
      setAuthUserByToken(data.payload, dispatch);

      return Promise.resolve(data.message);
    } catch (error: any) {
      const { data } = error.response;
      return Promise.reject(data.message);
    }
  };

export const LoginWithProvider =
  (authProvider: IAuthProvider) => async (dispatch: Dispatch<AuthActions>) => {
    try {
      const resp = await http.post<IServiceResponse>(
        "/api/Account/externalLogin",
        authProvider
      );
      const { data } = resp;
      setAuthUserByToken(data.payload, dispatch);

      return Promise.resolve("Успішний вхід");
    } catch (error: any) {
      const { data } = error.response;
      return Promise.reject(data.error);
    }
  };

export const Register =
  (newUser: IRegister) => async (dispatch: Dispatch<AuthActions>) => {
    try {
      const resp = await http.post<IServiceResponse>(
        "/api/Account/register",
        newUser
      );
      const { data } = resp;
      dispatch({
        type: AuthActionTypes.REGISTER,
      });
      return Promise.resolve(data.message);
    } catch (error: any) {
      const { data } = error.response;
      return Promise.reject(data.message);
    }
  };

export const Logout = () => async (dispatch: Dispatch<AuthActions>) => {
  try {
    dispatch({
      type: AuthActionTypes.LOGOUT,
      payload: {
        name: "",
        isAuth: false,
        roles: [],
      },
    });

    localStorage.removeItem("token");
  } catch (err: any) {
    console.log("Error", err);
  }
};

export const setAuthUserByToken = (token: string, dispatch: Dispatch<any>) => {
  setAuthToken(token);
  localStorage.setItem("token", token);

  const userInfo: IUserState = jwtDecode(token);

  dispatch({
    type: AuthActionTypes.LOGIN,
    payload: {
      name: userInfo.name,
      isAuth: true,
      roles: userInfo.roles,
    },
  });
};

const setAuthToken = (token: string) => {
  if (token) {
    http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
};
