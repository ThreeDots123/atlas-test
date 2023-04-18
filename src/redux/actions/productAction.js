import axios from "axios";
import {
  GET_TRENDING_PRODUCT_REQUEST,
  GET_TRENDING_PRODUCT_SUCCESS,
  GET_TRENDING_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_RECOMMENDED_PRODUCTS_REQUEST,
  GET_RECOMMENDED_PRODUCTS_SUCCESS,
  GET_RECOMMENDED_PRODUCTS_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getTrendingProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TRENDING_PRODUCT_REQUEST,
    });
    const { data } = await axios.get("/api/v1/trendingProducts");
    dispatch({
      type: GET_TRENDING_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TRENDING_PRODUCT_FAIL,
      payload: error.response.data.Message,
    });
  }
};

export const getAllProducts =
  (searchQuery, page, category) => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `/api/v1/products?page=${page}`;
      if (searchQuery) {
        link = `/api/v1/products?search=${searchQuery}`;
      }
      if (category) {
        link = searchQuery
          ? `/api/v1/products?search=${searchQuery}&category=${category}`
          : `/api/v1/products?category=${category}`;
      }
      const { data } = await axios.get(link);
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: { ...data } });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.Message,
      });
    }
  };

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};

export const getRecommendedProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_RECOMMENDED_PRODUCTS_REQUEST });
    const { data } = await axios.get(`/api/v1/brand/recommendedProducts/${id}`);
    dispatch({ type: GET_RECOMMENDED_PRODUCTS_SUCCESS, payload: { ...data } });
  } catch (error) {
    dispatch({
      type: GET_RECOMMENDED_PRODUCTS_FAIL,
      payload: error.response.data.Message,
    });
  }
};

export const postProductReview = (formData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_REQUEST });
    const { data } = await axios.put(`/api/v1/review`, formData, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: PRODUCT_REVIEW_SUCCESS, payload: data.success });
    setTimeout(() => {
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload: error.message,
    });
  }
};

export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: GET_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: GET_REVIEW_FAIL,
      payload: error.message,
    });
  }
};
//clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
