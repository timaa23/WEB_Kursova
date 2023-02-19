import { IAuthState, AuthActionTypes, AuthActions, IUserState } from "./types";

const initialState: IAuthState = {
  token: null,
};

const initialUserState: IUserState = {
  name: "",
  isAuth: false,
  roles: [],
};

export const userReducer = (
  state = initialUserState,
  action: AuthActions
): IUserState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
