export interface ICategoryItem {
  id: string;
  name: string;
}

export interface ICategoryCreate {
  name: string;
}

export interface ICategoryState {
  list: Array<ICategoryItem>;
}
