import * as ProductActionCreators from "../../pages/product/store/actions";
import * as AuthActionCreators from "../../pages/auth/store/actions";

const actions = {
  ...ProductActionCreators,
  ...AuthActionCreators,
};

export default actions;
