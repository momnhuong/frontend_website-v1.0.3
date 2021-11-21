import * as types from "./actionTypes";

const initialState = {
  infoCustomer: {},
  infoCustomerSuccess: {},
  infoCustomerFailed: {},
  countOfAdmin: {},
  countOfAdminSuccess: {},
  countOfAdminFailed: {},
  countOfCustomer: {},
  countOfCustomerSuccess: {},
  countOfCustomerFailed: {},
  countTicketAdmin: {},
  countTicketAdminSuccess: {},
  countTicketAdminFailed: {},
  countTicketCustomer: {},
  countTicketCustomerSuccess: {},
  countTicketCustomerFailed: {},
  listProductCustomerServicesAdmin: {},
  listProductCustomerServicesAdminSuccess: {},
  listProductCustomerServicesAdminFailed: {},
  listProductCustomerServicesCustomer: {},
  listProductCustomerServicesCustomerSuccess: {},
  listProductCustomerServicesCustomerFailed: {},
  listCustomerOfProductAdmin:{},
  listCustomerOfProductAdminSuccess:{},
  listCustomerOfProductAdminFailed:{},
  listPackageofProductCustomer:{},
  listPackageofProductCustomerSuccess:{},
  listPackageofProductCustomerFailed:{},
  getBalance:{},
  getBalanceSuccess:{},
  getBalanceFailed:{}
};

export default function home(state = initialState, action = {}) {
  switch (action.type) {
    case types.PACKAGE_OF_PRODUCT_CUSTOMER:
      return {
        ...state,
        listPackageofProductCustomer:
          action.listPackageofProductCustomer,
      };
      case types.PACKAGE_OF_PRODUCT_CUSTOMER_SUCCESS:
      return {
        ...state,
        listPackageofProductCustomerSuccess:
          action.listPackageofProductCustomerSuccess,
      };
      case types.PACKAGE_OF_PRODUCT_CUSTOMER_FAILED:
      return {
        ...state,
        listPackageofProductCustomerFailed:
          action.listPackageofProductCustomerFailed,
      };
    case types.GET_LIST_CUSTOMER_OF_PRODUCT_ADMIN:
      return {
        ...state,
        listCustomerOfProductAdmin:
          action.listCustomerOfProductAdmin,
      };
      case types.GET_LIST_CUSTOMER_OF_PRODUCT_ADMIN_SUCCESS:
      return {
        ...state,
        listCustomerOfProductAdminSuccess:
          action.listCustomerOfProductAdminSuccess,
      };
      case types.GET_LIST_CUSTOMER_OF_PRODUCT_ADMIN_FAILED:
        return {
          ...state,
          listCustomerOfProductAdminFailed:
            action.listCustomerOfProductAdminFailed,
        };
    case types.GET_LIST_PRODUCT_SERVICES_CUSTOMER:
      return {
        ...state,
        listProductCustomerServicesCustomer:
          action.listProductCustomerServicesCustomer,
      };
    case types.GET_LIST_PRODUCT_SERVICES_CUSTOMER_SUCCESS:
      return {
        ...state,
        listProductCustomerServicesCustomerSuccess:
          action.listProductCustomerServicesCustomerSuccess,
      };
    case types.GET_LIST_PRODUCT_SERVICES_CUSTOMER_FAILED:
      return {
        ...state,
        listProductCustomerServicesCustomerFailed:
          action.listProductCustomerServicesCustomerFailed,
      };
    case types.GET_LIST_PRODUCT_SERVICES_ADMIN:
      return {
        ...state,
        listProductCustomerServicesAdmin:
          action.listProductCustomerServicesAdmin,
      };
    case types.GET_LIST_PRODUCT_SERVICES_ADMIN_SUCCESS:
      return {
        ...state,
        listProductCustomerServicesAdminSuccess:
          action.listProductCustomerServicesAdminSuccess,
      };
    case types.GET_LIST_PRODUCT_SERVICES_ADMIN_FAILED:
      return {
        ...state,
        listProductCustomerServicesAdminFailed:
          action.listProductCustomerServicesAdminFailed,
      };
    case types.GET_COUNT_TICKET_ADMIN:
      return {
        ...state,
        countTicketAdmin: action.countTicketAdmin,
      };
    case types.GET_COUNT_TICKET_ADMIN_SUCCESS:
      return {
        ...state,
        countTicketAdminSuccess: action.countTicketAdminSuccess,
      };
    case types.GET_COUNT_TICKET_ADMIN_FAILED:
      return {
        ...state,
        countTicketAdminFailed: action.countTicketAdminFailed,
      };
    case types.GET_COUNT_TICKET_CUSTOMER:
      return {
        ...state,
        countTicketCustomer: action.countTicketCustomer,
      };
    case types.GET_COUNT_TICKET_CUSTOMER_SUCCESS:
      return {
        ...state,
        countTicketCustomerSuccess: action.countTicketCustomerSuccess,
      };
    case types.GET_COUNT_TICKET_CUSTOMER_FAILED:
      return {
        ...state,
        countTicketCustomerFailed: action.countTicketCustomerFailed,
      };
    case types.INFO_CUSTOMER:
      return {
        ...state,
        infoCustomer: action.infoCustomer,
      };
    case types.INFO_CUSTOMER_SUCCESS:
      return {
        ...state,
        infoCustomerSuccess: action.infoCustomerSuccess,
      };
    case types.INFO_CUSTOMER_FAILED:
      return {
        ...state,
        infoCustomerFailed: action.infoCustomerFailed,
      };
    case types.GET_COUNT_ADMIN:
      return {
        ...state,
        countOfAdmin: action.countOfAdmin,
      };
    case types.GET_COUNT_ADMIN_SUCCESS:
      return {
        ...state,
        countOfAdminSuccess: action.countOfAdminSuccess,
      };
    case types.GET_COUNT_ADMIN_FAILED:
      return {
        ...state,
        countOfAdminFailed: action.countOfAdminFailed,
      };

    case types.GET_COUNT_CUSTOMER:
      return {
        ...state,
        countOfCustomer: action.countOfCustomer,
      };
    case types.GET_COUNT_CUSTOMER_SUCCESS:
      return {
        ...state,
        countOfCustomerSuccess: action.countOfCustomerSuccess,
      };
    case types.GET_COUNT_CUSTOMER_FAILED:
      return {
        ...state,
        countOfCustomerFailed: action.countOfCustomerFailed,
      };
    case types.GET_BALANCE:
      return {
        ...state,
        getBalance: action.getBalance,
      };
    case types.GET_BALANCE_SUCCESS:
      return {
        ...state,
        getBalanceSuccess: action.getBalanceSuccess,
      };
    case types.GET_BALANCE_FAILED:
      return {
        ...state,
        getBalanceFailed: action.getBalanceFailed,
      };
    default:
      return state;
  }
}
