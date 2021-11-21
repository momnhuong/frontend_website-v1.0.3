import * as types from "./actionTypes";
const initialState = {
  data: [],
  dataSuccess: {},
  dataFailed: {},
  detailCustomer: null,
  detailCustomerSuccess: {},
  detailCustomerFailed: {},
  editCustomer: null,
  editCustomerSuccess: {},
  editCustomerFailed: {},
  delCustomer: {},
  delCustomerSuccess: {},
  delCustomerFailed: {},
  listCustomerAccount: [],
  listCustomerAccountSuccess: {},
  listCustomerAccountFailed: {},
  dataRule: [],
  dataRuleSuccess: [],
  dataRuleFailed: {},
  detailCustomerAccount: {},
  detailCustomerAccountSuccess: {},
  detailCustomerAccountFailed: {},
  delCustomerAccount: {},
  delCustomerAccountSuccess: {},
  delCustomerAccountFailed: {},
  listAccountofCustomer: [],
  listAccountofCustomerSuccess: [],
  listAccountofCustomerFailed: {},
  addCustomer: {},
  addCustomerSuccess: {},
  addCustomerFailed: {},
  addCustomerAccount: {},
  addCustomerAccountSuccess: {},
  addCustomerAccountFailed: {},
  detailAccountCustomer: {},
  detailAccountCustomerSuccess: {},
  detailAccountCustomerFailed: {},
};

export default function customer(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_DETAIL_ACCOUNT_CUSTOMER:
      return {
        ...state,
        detailAccountCustomer: action.detailAccountCustomer,
      };
    case types.GET_DETAIL_ACCOUNT_CUSTOMER_SUCCESS:
      return {
        ...state,
        detailAccountCustomerSuccess: action.detailAccountCustomerSuccess,
      };
    case types.GET_DETAIL_ACCOUNT_CUSTOMER_FAILED:
      return {
        ...state,
        detailAccountCustomerFailed: action.detailAccountCustomerFailed,
      };
    case types.GET_LIST_CUSTOMER:
      return {
        ...state,
        data: action.data,
      };
    case types.GET_LIST_CUSTOMER_SUCCESS:
      return {
        ...state,
        dataSuccess: action.dataSuccess,
      };
    case types.GET_LIST_CUSTOMER_FAILED:
      return {
        ...state,
        dataFailed: action.dataFailed,
      };
    case types.GET_DETAIL_CUSTOMER:
      return {
        ...state,
        detailCustomer: action.detailCustomer,
      };
    case types.GET_DETAIL_CUSTOMER_SUCCESS:
      return {
        ...state,
        detailCustomerSuccess: action.detailCustomerSuccess,
      };
    case types.GET_DETAIL_CUSTOMER_FAILED:
      return {
        ...state,
        detailCustomerFailed: action.detailCustomerFailed,
      };
    case types.EDIT_DETAIL_CUSTOMER:
      return {
        ...state,
        editCustomer: action.editCustomer,
      };
    case types.EDIT_DETAIL_CUSTOMER_SUCCESS:
      return {
        ...state,
        editCustomerSuccess: action.editCustomerSuccess,
      };
    case types.EDIT_DETAIL_CUSTOMER_FAILED:
      return {
        ...state,
        editCustomerFailed: action.editCustomerFailed,
      };
    case types.DEL_CUSTOMER:
      return {
        ...state,
        delCustomer: action.delCustomer,
      };
    case types.DEL_CUSTOMER_SUCCESS:
      return {
        ...state,
        delCustomerSuccess: action.delCustomerSuccess,
      };
    case types.DEL_CUSTOMER_FAILED:
      return {
        ...state,
        delCustomerFailed: action.delCustomerFailed,
      };
    case types.GET_LIST_CUSTOMER_ACCOUNT:
      return {
        ...state,
        listCustomerAccount: action.listCustomerAccount,
      };
    case types.GET_LIST_CUSTOMER_ACCOUNT_SUCCESS:
      return {
        ...state,
        listCustomerAccountSuccess: action.listCustomerAccountSuccess,
      };
    case types.GET_LIST_CUSTOMER_ACCOUNT_FAILED:
      return {
        ...state,
        listCustomerAccountFailed: action.listCustomerAccountFailed,
      };

    case types.GET_ROLE:
      return {
        ...state,
        dataRule: action.dataRule,
      };
    case types.GET_ROLE_SUCCESS:
      return {
        ...state,
        dataRuleSuccess: action.dataRuleSuccess,
      };
    case types.GET_ROLE_FAILED:
      return {
        ...state,
        dataRuleFailed: action.dataRuleFailed,
      };
    case types.UPDATE_DETAIL_CUSTOMER_ACCOUNT:
      return {
        ...state,
        detailCustomerAccount: action.detailCustomerAccount,
      };
    case types.UPDATE_DETAIL_CUSTOMER_ACCOUNT_SUCCESS:
      return {
        ...state,
        detailCustomerAccountSuccess: action.detailCustomerAccountSuccess,
      };
    case types.UPDATE_DETAIL_CUSTOMER_ACCOUNT_FAILED:
      return {
        ...state,
        detailCustomerAccountFailed: action.detailCustomerAccountFailed,
      };
    case types.DEL_DETAIL_CUSTOMER_ACCOUNT:
      return {
        ...state,
        delCustomerAccount: action.delCustomerAccount,
      };
    case types.DEL_DETAIL_CUSTOMER_ACCOUNT_SUCCESS:
      return {
        ...state,
        delCustomerAccountSuccess: action.delCustomerAccountSuccess,
      };
    case types.DEL_DETAIL_CUSTOMER_ACCOUNT_FAILED:
      return {
        ...state,
        delCustomerAccountFailed: action.delCustomerAccountFailed,
      };
    case types.LIST_ACCOUNT_OF_CUSTOMER:
      return {
        ...state,
        listAccountofCustomer: action.listAccountofCustomer,
      };
    case types.LIST_ACCOUNT_OF_CUSTOMER_SUCCESS:
      return {
        ...state,
        listAccountofCustomerSuccess: action.listAccountofCustomerSuccess,
      };
    case types.LIST_ACCOUNT_OF_CUSTOMER_FAILED:
      return {
        ...state,
        listAccountofCustomerFailed: action.listAccountofCustomerFailed,
      };
    case types.ADD_CUSTOMER:
      return {
        ...state,
        addCustomer: action.addCustomer,
      };
    case types.ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        addCustomerSuccess: action.addCustomerSuccess,
      };
    case types.ADD_CUSTOMER_FAILED:
      return {
        ...state,
        addCustomerFailed: action.addCustomerFailed,
      };
    case types.ADD_CUSTOMER_ACCOUNT:
      return {
        ...state,
        addCustomerAccount: action.addCustomerAccount,
      };
    case types.ADD_CUSTOMER_ACCOUNT_SUCCESS:
      return {
        ...state,
        addCustomerAccountSuccess: action.addCustomerAccountSuccess,
      };
    case types.ADD_CUSTOMER_ACCOUNT_FAILED:
      return {
        ...state,
        addCustomerAccountFailed: action.addCustomerAccountFailed,
      };
    default:
      return state;
  }
}
