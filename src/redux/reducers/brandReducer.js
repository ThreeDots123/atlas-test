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

export const brandReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case GET_BRAND_REQUEST:
      return {
        loading: true,
        brands: [],
      };

    case GET_BRAND_SUCCESS:
      return {
        loading: false,
        brands: action.payload,
      };
    case GET_BRAND_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const brandsInLocationReducer = (
  state = { brandsInLocation: [], resturantsInLocation: [] },
  action
) => {
  switch (action.type) {
    case BRANDS_IN_LOCATION_REQUEST:
      return {
        loading: true,
        brandsInLocation: [],
        resturantsInLocation: [],
      };

    case BRANDS_IN_LOCATION_SUCCESS:
      return {
        loading: false,
        brandsInLocation: action.payload.brandsInLocation,
        resturantsInLocation: action.payload.resturantsInLocation,
      };
    case BRANDS_IN_LOCATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const brandDetailReducer = (state = { brandDetail: null }, action) => {
  switch (action.type) {
    case GET_BRAND_DETAIL_REQUEST:
      return {
        loading: true,
        brandDetail: null,
      };

    case GET_BRAND_DETAIL_SUCCESS:
      return {
        loading: false,
        brandDetail: action.payload,
      };
    case GET_BRAND_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const brandProductReducer = (
  state = { brandProducts: null },
  action
) => {
  switch (action.type) {
    case GET_BRAND_PRODUCTS_REQUEST:
      return {
        loading: true,
        brandProducts: null,
      };

    case GET_BRAND_PRODUCTS_SUCCESS:
      return {
        loading: false,
        brandProducts: action.payload.brandProducts,
        productsCount: action.payload.productsCount,
        filteredProductCount: action.payload.filteredProductCount,
        numberOfPages: action.payload.numberOfPages,
        searchNumberOfPages: action.payload.searchNumberOfPages,
      };
    case GET_BRAND_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allBrandsReducer = (state = { brands: null }, action) => {
  switch (action.type) {
    case ALL_BRAND_REQUEST:
      return {
        loading: true,
        brands: null,
      };
    case ALL_BRAND_SUCCESS:
      return {
        loading: false,
        brands: action.payload.brands,
        brandCount: action.payload.brandCount,
        filteredBrandCount: action.payload.filteredBrandCount,
        numberOfPages: action.payload.numberOfPages,
        searchNumberOfPages: action.payload.searchNumberOfPages,
        resperPage: action.payload.resperPage,
      };

    case ALL_BRAND_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
