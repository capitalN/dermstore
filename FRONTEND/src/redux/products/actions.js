import axios from "axios";
import { baseURL } from "../base";
import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_LOADING,
  GET_PRODUCTS_SUCCESS,
  GET_SEARCHED,
} from "./actionTypes";

export const get_products = (params) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_LOADING,
  });
  try {
    let res = await axios({
      method: "GET",
      baseURL,
      url: `products`,
      params,
    });
    let payload = res.data;
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_ERROR,
      error: "failed to get products",
    });
  }
};

export const get_searched_products = (params) => async (dispatch) => {
  try {
    let res = await axios({
      method: "GET",
      baseURL,
      url: `products/search`,
      params,
    });
    let payload = res.data;
    dispatch({
      type: GET_SEARCHED,
      payload,
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_single_product =
  ({ id }) =>
  async (dispatch) => {
    dispatch({
      type: GET_PRODUCTS_LOADING,
    });
    try {
      let res = await axios({
        method: "GET",
        baseURL,
        url: `products/${id}`,
      });
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: [res.data],
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_PRODUCTS_ERROR,
        error,
      });
    }
  };
