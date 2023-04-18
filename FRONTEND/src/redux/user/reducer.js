import {
  USER_ERROR,
  USER_LOADING,
  USER_LOGIN,
  USER_REGISTER,
  USER_WARNING,
} from "./actionTypes";

let token = localStorage.getItem("token") || "";
let user = JSON.parse(localStorage.getItem("user")) || {};

const initialState = {
  token,
  user,
  loading: false,
  success: false,
  error: false,
};

export const UserReducer = (
  state = initialState,
  { type, token, error, user }
) => {
  switch (type) {
    case USER_REGISTER: {
      return {
        ...state,
        success: "register sucessfull, please login",
        loading: false,
        error: false,
      };
    }
    case USER_LOGIN: {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        token,
        success: "login sucessfull",
        user,
        loading: false,
        error: false,
      };
    }
    case USER_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    }
    case USER_WARNING: {
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
      };
    }
    case USER_ERROR: {
      return {
        ...state,
        loading: false,
        success: false,
        error,
      };
    }
    default:
      return state;
  }
};
