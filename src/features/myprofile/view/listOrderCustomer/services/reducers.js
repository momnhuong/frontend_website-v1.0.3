import * as types from "./actionTypes";
import * as action from "./actions";

const initialState = {
  listOrderCustomer: [],
  listOrderCustomerSuccess: [],
  listOrderCustomerFailed: {},
  deatailOrderOfCustomer: {},
  deatailOrderOfCustomerSuccess: {},
  deatailOrderOfCustomerFailed: {},
  delOrderOfCustomer: {},
  delOrderOfCustomerSuccess: {},
  delOrderOfCustomerFailed: {},
  createContract: {},
  createContractSuccess: {},
  createContractFailed: {},
};

export default function orderofcustomer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_LIST_ORDER_CUSTOMER:
      return {
        ...state,
        listOrderCustomer: action.listOrderCustomer,
      };
    case types.GET_LIST_ORDER_CUSTOMER_SUCCESS:
      return {
        ...state,
        listOrderCustomerSuccess: action.listOrderCustomerSuccess,
      };
    case types.GET_LIST_ORDER_CUSTOMER_FAILED:
      return {
        ...state,
        listOrderCustomerFailed: action.listOrderCustomerFailed,
      };
    case types.GET_DETAIL_ORDER_CUSTOMER:
      return {
        ...state,
        deatailOrderOfCustomer: action.deatailOrderOfCustomer,
      };
    case types.GET_DETAIL_ORDER_CUSTOMER_SUCCESS:
      return {
        ...state,
        deatailOrderOfCustomerSuccess: action.deatailOrderOfCustomerSuccess,
      };
    case types.GET_DETAIL_ORDER_CUSTOMER_FAILED:
      return {
        ...state,
        deatailOrderOfCustomerFailed: action.deatailOrderOfCustomerFailed,
      };
    case types.DEL_ORDER_CUSTOMER:
      return {
        ...state,
        delOrderOfCustomer: action.delOrderOfCustomer,
      };
    case types.DEL_ORDER_CUSTOMER_SUCCESS:
      return {
        ...state,
        delOrderOfCustomerSuccess: action.delOrderOfCustomerSuccess,
      };
    case types.DEL_ORDER_CUSTOMER_FAILED:
      return {
        ...state,
        delOrderOfCustomerFailed: action.delOrderOfCustomerFailed,
      };
    case types.CREATE_CONTRACT:
      return {
        ...state,
        createContract: action.createContract,
      };
    case types.CREATE_CONTRACT_SUCCESS:
      return {
        ...state,
        createContractSuccess: action.createContractSuccess,
      };
    case types.CREATE_CONTRACT_FAILED:
      return {
        ...state,
        createContractFailed: action.createContractFailed,
      };
    default:
      return state;
  }
}
