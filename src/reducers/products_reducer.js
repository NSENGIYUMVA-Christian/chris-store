import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  // handle sidebar
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  // handle loading to get all products
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }

  // if we successfully got all products data
  if (action.type === GET_PRODUCTS_SUCCESS) {
    // filter featured product
    const featured_products = action.payload.filter((product) => {
      return product.featured === true;
    });
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products: featured_products,
    };
  }
  // handle get all products error
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true };
  }
  // handle loading for getting single product
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  }
  // handle success for getting single product
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }
  // handle error for getting single product
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
