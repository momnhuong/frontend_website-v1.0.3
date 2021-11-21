import * as types from "./actionTypes";
import * as action from "./actions";

const initialState = {
  listProduct: [],
  listProductSuccess: [],
  listProductFailed: {},
  detailProduct: {},
  detailProductSuccess: {},
  detailProductFailed: {},
  editProduct: {},
  editProductSuccess: {},
  editProductFailed: {},
  delProduct: {},
  delProductSuccess: {},
  delProductFailed: {},
  createProduct: {},
  createProductSuccess: {},
  createProductFailed: {},
  listProductOfCustomer: {},
  listProductOfCustomerSuccess: {},
  listProductOfCustomerFailed: {},
  listCatelog: [],
  listCatelogSuccess: [],
  listCatelogFailed: {},
  listProductOfCatelog: {},
  listProductOfCatelogSuccess: {},
  listProductOfCatelogFailed: {},
  createOrder: {},
  createOrderSuccess: {},
  createOrderFailed: {},
};

export default function products(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_LIST_PRODUCTS:
      return {
        ...state,
        listProduct: action.listProduct,
      };
    case types.GET_LIST_PRODUCTS_SUCCESS:
      return {
        ...state,
        listProductSuccess: action.listProductSuccess,
      };
    case types.GET_LIST_PRODUCTS_FAILED:
      return {
        ...state,
        listProductFailed: action.listProductFailed,
      };
    case types.GET_DETAIL_PRODUCTS:
      return {
        ...state,
        detailProduct: action.detailProduct,
      };
    case types.GET_DETAIL_PRODUCTS_SUCCESS:
      return {
        ...state,
        detailProductSuccess: action.detailProductSuccess,
      };
    case types.GET_DETAIL_PRODUCTS_FAILED:
      return {
        ...state,
        detailProductFailed: action.detailProductFailed,
      };
    case types.EDIT_DETAIL_PRODUCT:
      return {
        ...state,
        editProduct: action.editProduct,
      };
    case types.EDIT_DETAIL_PRODUCT_SUCCESS:
      return {
        ...state,
        editProductSuccess: action.editProductSuccess,
      };
    case types.EDIT_DETAIL_PRODUCT_FAILED:
      return {
        ...state,
        editProductFailed: action.editProductFailed,
      };
    case types.DEL_PRODUCT:
      return {
        ...state,
        delProduct: action.delProduct,
      };
    case types.DEL_PRODUCT_SUCCESS:
      return {
        ...state,
        delProductSuccess: action.delProductSuccess,
      };
    case types.DEL_PRODUCT_FAILED:
      return {
        ...state,
        delProductFailed: action.delProductFailed,
      };
    case types.CREATE_PRODUCT:
      return {
        ...state,
        createProduct: action.createProduct,
      };
    case types.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createProductSuccess: action.createProductSuccess,
      };
    case types.CREATE_PRODUCT_FAILED:
      return {
        ...state,
        createProductFailed: action.createProductFailed,
      };
    case types.GET_LIST_PRODUCT_OF_CUSTOMER:
      return {
        ...state,
        listProductOfCustomer: action.listProductOfCustomer,
      };
    case types.GET_LIST_PRODUCT_OF_CUSTOMER_SUCCESS:
      return {
        ...state,
        listProductOfCustomerSuccess: action.listProductOfCustomerSuccess,
      };
    case types.GET_LIST_PRODUCT_OF_CUSTOMER_FAILED:
      return {
        ...state,
        listProductOfCustomerFailed: action.listProductOfCustomerFailed,
      };
    case types.GET_CATELOG:
      return {
        ...state,
        listCatelog: action.listCatelog,
      };
    case types.GET_CATELOG_SUCCESS:
      return {
        ...state,
        listCatelogSuccess: action.listCatelogSuccess,
      };
    case types.GET_CATELOG_FAILED:
      return {
        ...state,
        listCatelogFailed: action.listCatelogFailed,
      };
    case types.GET_PRODUCT_OF_CATELOG:
      return {
        ...state,
        listProductOfCatelog: action.listProductOfCatelog,
      };
    case types.GET_PRODUCT_OF_CATELOG_SUCCESS:
      return {
        ...state,
        listProductOfCatelogSuccess: action.listProductOfCatelogSuccess,
      };
    case types.GET_PRODUCT_OF_CATELOG_FAILED:
      return {
        ...state,
        listProductOfCatelogFailed: action.listProductOfCatelogFailed,
      };
    case types.CREATE_ORDER:
      return {
        ...state,
        createOrder: action.createOrder,
      };
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        createOrderSuccess: action.createOrderSuccess,
      };
    case types.CREATE_ORDER_FAILED:
      return {
        ...state,
        createOrderFailed: action.createOrderFailed,
      };
    default:
      return state;
  }
}
