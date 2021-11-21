import * as types from "./actionTypes";
const initialState = {
  listOrder: null,
  listOrderSuccess: {},
  listOrderFailed: {},
  detailOrderOfCustomer: null,
  detailOrderOfCustomerSuccess: {},
  detailOrderOfCustomerFailed: {},
};

export default function orderOfCustomerUser(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_LIST_ORDER:
      return {
        ...state,
        listOrder: action.listOrder,
      };
    case types.GET_LIST_ORDER_SUCCESS:
      return {
        ...state,
        listOrderSuccess: action.listOrderSuccess,
      };
    case types.GET_LIST_ORDER_FAILED:
      return {
        ...state,
        listOrderFailed: action.listOrderFailed,
      };
    case types.DETAIL_ORDER_OF_CUSTOMER:
      return {
        ...state,
        detailOrderOfCustomer: action.detailOrderOfCustomer,
      };
    case types.DETAIL_ORDER_OF_CUSTOMER_SUCCESS:
      return {
        ...state,
        detailOrderOfCustomerSuccess: action.detailOrderOfCustomerSuccess,
      };
    case types.DETAIL_ORDER_OF_CUSTOMER_FAILED:
      return {
        ...state,
        detailOrderOfCustomerFailed: action.detailOrderOfCustomerFailed,
      };
    default:
      return state;
  }
}
