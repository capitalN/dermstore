import {
  ADD_CART,
  CART_ERROR,
  CART_LOADING,
  DELETE_FROM_CART,
  GET_CART,
  UPDATE_CART,
} from "./actionTypes";

const initialState = {
  cart: [],
  loading: false,
  success: false,
  error: false,
};

export const CartReducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case GET_CART: {
      return {
        ...state,
        cart: payload,
        loading: false,
        success: "getting cart products",
        error: false,
      };
    }

    case CART_LOADING: {
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    }

    case CART_ERROR: {
      return {
        ...state,
        loading: false,
        success: false,
        error,
      };
    }

    case ADD_CART: {
      return {
        ...state,
        cart: [...state.cart, payload],
        loading: false,
        success: "product added to cart",
        error: false,
      };
    }

    case UPDATE_CART: {
      let updated = state.cart.map((el) => {
        if (el._id === payload._id) {
          return payload;
        }
        return el;
      });
      return {
        ...state,
        cart: updated,
        loading: false,
        success: "cart item updated",
        error: false,
      };
    }

    case DELETE_FROM_CART: {
      let filtered = state.cart.filter((el) => el._id !== payload);
      return {
        ...state,
        cart: filtered,
        loading: false,
        success: "deleted from cart",
        error: false,
      };
    }
    default:
      return state;
  }
};
