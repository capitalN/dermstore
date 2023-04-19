import axios from "axios";
import { baseURL } from "../base";
import {
  USER_ERROR,
  USER_GET,
  USER_LOADING,
  USER_LOGIN,
  USER_REGISTER,
  USER_WARNING,
} from "./actionTypes";

let token = localStorage.getItem("token") || "";

export const user_register = (data) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  // let regex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  // if (!regex.test(data.password)) {
  //   dispatch({
  //     type: USER_WARNING,
  //     error:
  //       "password must include atleast a uppercase, a lowercase, a number, a special character & 8 or more characters",
  //   });
  //   return;
  // }

  try {
    let res = await axios({
      method: "POST",
      baseURL,
      url: `users/register`,
      data,
    });
    let payload = res.data;
    dispatch({
      type: USER_REGISTER,
    });
  } catch (error) {
    dispatch({ type: USER_ERROR, error: "user already exist, please login" });
  }
};

export const user_login = (data) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    let res = await axios({
      method: "POST",
      baseURL,
      url: `users/login`,
      data,
    });
    let { token, user } = res.data;
    dispatch({
      type: USER_LOGIN,
      token,
      user,
    });
  } catch (error) {
    dispatch({ type: USER_ERROR, error: "wrong credentials" });
  }
};

export const get_user = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    let res = await axios({
      method: "GET",
      baseURL,
      url: `users/me`,
      headers: {
        Authorization: token,
      },
    });
    let payload = res.data;
    dispatch({
      type: USER_GET,
      payload,
    });
  } catch (error) {
    dispatch({ type: USER_ERROR, error: "getting user failed" });
  }
};
