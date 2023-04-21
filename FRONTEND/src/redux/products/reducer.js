import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_SEARCHED,
} from "./actionTypes";

const initialState = {
  products: [],
  searched: [],
  loading: false,
  success: false,
  error: false,
};

export const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: payload,
        loading: false,
        error: false,
        success: "getting products",
      };
    }
    case GET_SEARCHED: {
      return {
        ...state,
        searched: payload,
      };
    }
    case GET_PRODUCTS_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    }
    case GET_PRODUCTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: "error in getting products",
        success: false,
      };
    }
    default:
      return state;
  }
};
