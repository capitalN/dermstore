import {
  USER_ERROR,
  USER_LOADING,
  USER_LOGIN,
  USER_REGISTER,
} from "./actionTypes";

let token = localStorage.getItem("token") || "";

const initialState = {
  token,
  payload: "",
  loading: false,
  error: false,
};

export const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER: {
      return {
        ...state,
        payload,
      };
    }
    case USER_LOGIN: {
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
      };
    }
    case USER_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};
