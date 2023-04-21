import axios from "axios";
import {
  ADD_CART,
  CART_ERROR,
  CART_LOADING,
  DELETE_FROM_CART,
  GET_CART,
  UPDATE_CART,
} from "./actionTypes";
import { baseURL } from "../base";

const token = localStorage.getItem("token") || "";

export const get_cart = () => async (dispatch) => {
  dispatch({ type: CART_LOADING });
  try {
    let res = await axios.get(`${baseURL}/cart`, {
      headers: {
        Authorization: token,
      },
    });
    let payload = res.data;
    dispatch({ type: GET_CART, payload });
  } catch (error) {
    dispatch({ type: CART_ERROR, error: "error in getting cart items" });
  }
};

export const add_to_cart = (data) => async (dispatch) => {
  dispatch({ type: CART_LOADING });
  try {
    let res = await axios({
      method: "post",
      baseURL,
      url: "cart",
      headers: {
        Authorization: token,
      },
      data,
    });
    let payload = res.data;
    dispatch({ type: ADD_CART, payload });
  } catch (error) {
    if (error.response.data === "Invalid token") {
      dispatch({ type: CART_ERROR, error: "Invalid token, please login" });
    } else {
      dispatch({ type: CART_ERROR, error: "product is in cart" });
    }
  }
};

export const update_cart = (id, data) => async (dispatch) => {
  try {
    let res = await axios({
      method: "patch",
      baseURL,
      url: `cart/${id}`,
      headers: {
        Authorization: token,
      },
      data,
    });
    dispatch({ type: UPDATE_CART, payload: res.data });
  } catch (error) {
    dispatch({ type: CART_ERROR, error: "error in updating cart item" });
  }
};

export const delete_from_cart = (id) => async (dispatch) => {
  dispatch({ type: CART_LOADING });
  try {
    let res = await axios.delete(`${baseURL}/cart/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: DELETE_FROM_CART, payload: id });
  } catch (error) {
    dispatch({ type: CART_ERROR, error: "error in deleting cart item" });
  }
};
