import {
  USER_ERROR,
  USER_GET,
  USER_LOADING,
  USER_LOGIN,
  USER_REGISTER,
  USER_UPDATE,
  USER_WARNING,
} from "./actionTypes";

let token = localStorage.getItem("token") || "";

const initialState = {
  token,
  user: {},
  loading: false,
  success: false,
  error: false,
};

export const UserReducer = (
  state = initialState,
  { type, payload, token, error }
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
      window.location.href = "/";
      return {
        ...state,
        token,
        success: "login sucessfull",
        loading: false,
        error: false,
      };
    }
    case USER_GET: {
      return {
        ...state,
        user: payload,
        loading: false,
        error: false,
        success: "getting user",
      };
    }
    case USER_UPDATE: {
      // let updated = 
      return {
        ...state,
        user: payload,
        loading: false,
        error: false,
        success: "user updated",
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
