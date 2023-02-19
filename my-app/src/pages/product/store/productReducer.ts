import { IProductState, ProductActionTypes, ProductActions } from "./types";

const initialState: IProductState = {
  list: [],
  loading: false,
};

export const productReducer = (
  state = initialState,
  action: ProductActions
): IProductState => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LIST: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case ProductActionTypes.CREATE_PRODUCT: {
      return {
        ...state,
        loading: false,
      };
    }
    case ProductActionTypes.START_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductActionTypes.SERVER_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};
