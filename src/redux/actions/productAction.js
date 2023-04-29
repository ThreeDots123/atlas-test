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
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  CREATE_PRODUCTS_FAIL,
  ADMIN_GET_PRODUCTS_REQUEST,
  ADMIN_GET_PRODUCTS_SUCCESS,
  ADMIN_GET_PRODUCTS_FAIL,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_RESET,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAIL,
  UPDATE_PRODUCTS_RESET,
} from "../constants/productConstants";

export const createProduct = (Data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCTS_REQUEST });

    const { data } = await axios.post(`/api/v1/admin/createProduct`, Data, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: CREATE_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

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
    console.log(formData);
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

export const adminGetProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GET_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products", {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({
      type: ADMIN_GET_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: data.success });

    dispatch({ type: DELETE_PRODUCTS_RESET });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

export const updateProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCTS_REQUEST });
    const { data } = await axios.put(`/api/v1/admin/product/${id}`, formData, {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: UPDATE_PRODUCTS_SUCCESS, payload: data.success });
    setTimeout(() => {
      dispatch({ type: UPDATE_PRODUCTS_RESET });
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCTS_FAIL,
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
