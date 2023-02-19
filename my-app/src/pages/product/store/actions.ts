import { ProductActions, ProductActionTypes } from "./types";
import { IServiceResponse } from "../../../store/types";
import { Dispatch } from "react";
import http from "../../../http_common";

export const GetProductList =
  () => async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({
        type: ProductActionTypes.START_REQUEST,
      });

      const resp = await http.get<IServiceResponse>("/api/Product/getAll");
      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_LIST,
        payload: {
          list: data.payload,
          loading: false,
        },
      });
      return Promise.resolve(data.message);
    } catch (error: any) {
      dispatch({
        type: ProductActionTypes.SERVER_ERROR,
      });
      if (error.code === "ERR_NETWORK") {
        return Promise.reject("Не вдалося з'єднатися з сервером");
      }
      const { data } = error.response;
      return Promise.reject(data.message);
    }
  };

export const CreateProduct =
  (newProduct: FormData) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({
        type: ProductActionTypes.START_REQUEST,
      });

      const resp = await http.post<IServiceResponse>(
        "/api/Product/create",
        newProduct,
        {
          headers: { "Content-Type": "multipart/form-data" },
          transformRequest: (newProduct) => newProduct,
        }
      );
      const { data } = resp;
      dispatch({
        type: ProductActionTypes.CREATE_PRODUCT,
      });
      return Promise.resolve(data.message);
    } catch (error: any) {
      dispatch({
        type: ProductActionTypes.SERVER_ERROR,
      });
      if (error.code === "ERR_NETWORK") {
        return Promise.reject("Не вдалося з'єднатися з сервером");
      }
      const { data } = error.response;
      return Promise.reject(data.message);
    }
  };
