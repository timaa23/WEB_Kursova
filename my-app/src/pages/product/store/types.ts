export interface IProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  article: string;
  size: string;
  categories: Array<ICategoryItem>;
}

export interface IProductCreate {
  name: string;
  price: number;
  image: File | null;
  article: string;
  size: string;
}

export interface ICategoryItem {
  id: number;
  name: string;
}

export interface IProductCardProps {
  product: IProductItem;
}

export interface IProductState {
  list: Array<IProductItem>;
  loading: boolean;
}

export interface IProductSearch {
  name?: string;
  page?: number | string | null;
  count?: number | string | null;
}

export enum ProductActionTypes {
  PRODUCT_LIST = "PRODUCT_LIST",
  CREATE_PRODUCT = "CREATE_PRODUCT",
  START_REQUEST = "START_REQUEST",
  SERVER_ERROR = "SERVER_ERROR",
}

export interface GetProductsAction {
  type: ProductActionTypes.PRODUCT_LIST;
  payload: IProductState;
}

export interface CreateProductAction {
  type: ProductActionTypes.CREATE_PRODUCT;
}

export interface StartRequestAction {
  type: ProductActionTypes.START_REQUEST;
}

export interface ServerErrorAction {
  type: ProductActionTypes.SERVER_ERROR;
}

export type ProductActions =
  | GetProductsAction
  | CreateProductAction
  | StartRequestAction
  | ServerErrorAction;
