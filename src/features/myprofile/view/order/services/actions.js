import * as types from "./actionTypes";

export {
  listOrder,
  listOrderSuccess,
  listOrderFailed,
  detailOrderOfCustomer,
  detailOrderOfCustomerSuccess,
  detailOrderOfCustomerFailed,
};

function listOrder(listOrder) {
  return {
    type: types.GET_LIST_ORDER,
    listOrder,
  };
}
function listOrderSuccess(listOrderSuccess) {
  return {
    type: types.GET_LIST_ORDER_SUCCESS,
    listOrderSuccess,
  };
}
function listOrderFailed(listOrderFailed) {
  return {
    type: types.GET_LIST_ORDER_FAILED,
    listOrderFailed,
  };
}
function detailOrderOfCustomer(detailOrderOfCustomer) {
  return {
    type: types.DETAIL_ORDER_OF_CUSTOMER,
    detailOrderOfCustomer,
  };
}
function detailOrderOfCustomerSuccess(detailOrderOfCustomerSuccess) {
  return {
    type: types.DETAIL_ORDER_OF_CUSTOMER_SUCCESS,
    detailOrderOfCustomerSuccess,
  };
}
function detailOrderOfCustomerFailed(detailOrderOfCustomerFailed) {
  return {
    type: types.DETAIL_ORDER_OF_CUSTOMER_FAILED,
    detailOrderOfCustomerFailed,
  };
}
