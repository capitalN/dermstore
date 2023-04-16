import { baseURL } from "@/utils/url";
import axios from "axios";
import {
  USER_ERROR,
  USER_LOADING,
  USER_LOGIN,
  USER_REGISTER,
} from "./actionTypes";

export const user_register = (data) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!regex.test(data.password)) {
    dispatch({ type: USER_ERROR, error: "InValid password" });
    return;
  }

  try {
    let res = await axios({
      method: "POST",
      baseURL,
      url: `users/register`,
      data: { name: "anna", email: "anna@gmail.com", password: "anna" },
    });
    let payload = res.data;
    dispatch({
      type: USER_REGISTER,
      payload,
    });
  } catch (error) {
    dispatch({ type: USER_ERROR, error });
  }
};

export const user_login = (data) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    let res = await axios({
      method: "POST",
      baseURL,
      url: `users/login`,
      data: { email: "anna@gmail.com", password: "anna" },
    });
    let payload = res.data;
    dispatch({
      type: USER_LOGIN,
      payload,
    });
  } catch (error) {
    dispatch({ type: USER_ERROR, error });
  }
};
