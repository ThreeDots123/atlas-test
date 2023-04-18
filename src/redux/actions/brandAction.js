import axios from "axios";
import {
  GET_BRAND_REQUEST,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  GET_BRAND_DETAIL_REQUEST,
  GET_BRAND_DETAIL_SUCCESS,
  GET_BRAND_DETAIL_FAIL,
  GET_BRAND_PRODUCTS_REQUEST,
  GET_BRAND_PRODUCTS_SUCCESS,
  GET_BRAND_PRODUCTS_FAIL,
  ALL_BRAND_REQUEST,
  ALL_BRAND_SUCCESS,
  ALL_BRAND_FAIL,
  BRANDS_IN_LOCATION_REQUEST,
  BRANDS_IN_LOCATION_SUCCESS,
  BRANDS_IN_LOCATION_FAIL,
  CLEAR_ERROR,
} from "../constants/brandConstant";

export const getNewBrands = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BRAND_REQUEST });
    const { data } = await axios.get("/api/v1/brand/newBrands");
    dispatch({ type: GET_BRAND_SUCCESS, payload: data.latestBrands });
  } catch (error) {
    dispatch({
      type: GET_BRAND_FAIL,
      payload: error.response.data.Message,
    });
  }
};

export const getBrandDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BRAND_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/v1/brand/brandDetails/${id}`);
    dispatch({ type: GET_BRAND_DETAIL_SUCCESS, payload: data.brand });
  } catch (error) {
    dispatch({
      type: GET_BRAND_DETAIL_FAIL,
      payload: error.response.data.Message,
    });
  }
};

export const getBrandProducts =
  (id, searchQuery, page, category) => async (dispatch) => {
    try {
      dispatch({ type: GET_BRAND_PRODUCTS_REQUEST });
      let link = `/api/v1/brand/brandProduct/${id}?page=${page}`;
      if (searchQuery) {
        link = `/api/v1/brand/brandProduct/${id}?search=${searchQuery}`;
      }
      if (category) {
        link = `/api/v1/brand/brandProduct/${id}?category=${category}`;
      }
      const { data } = await axios.get(link);
      dispatch({ type: GET_BRAND_PRODUCTS_SUCCESS, payload: { ...data } });
    } catch (error) {
      dispatch({
        type: GET_BRAND_PRODUCTS_FAIL,
        payload: error.response.data.Message,
      });
    }
  };

export const getAllBrands =
  (searchQuery, page, category) => async (dispatch) => {
    try {
      dispatch({ type: ALL_BRAND_REQUEST });
      let link = `/api/v1/brand/brands?page=${page}`;
      if (searchQuery) {
        link = `/api/v1/brand/brands?search=${searchQuery}`;
      }
      if (category) {
        link = `/api/v1/brand/brands?brandType=${category}`;
      }
      const { data } = await axios.get(link);
      dispatch({ type: ALL_BRAND_SUCCESS, payload: { ...data } });
    } catch (error) {
      dispatch({
        type: ALL_BRAND_FAIL,
        payload: error.response.data.Message,
      });
    }
  };
export const getBrandsInLocation = () => async (dispatch) => {
  try {
    dispatch({ type: BRANDS_IN_LOCATION_REQUEST });

    const { data } = await axios.get("api/v1/brand/brandsInLocation", {
      withCredentials: true,
      credentials: "include",
    });
    dispatch({ type: BRANDS_IN_LOCATION_SUCCESS, payload: { ...data } });
  } catch (error) {
    dispatch({
      type: BRANDS_IN_LOCATION_FAIL,
      payload: error.response.data.Message,
    });
  }
};

//clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
