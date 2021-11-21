import * as types from "./actionTypes";

export {
  getMenu,
  getPageRequest,
  getPage,
  getDetail,
  refreshPage,
  infoCustomer,
  infoCustomerSuccess,
  infoCustomerFailed,
  countOfAdmin,
  countOfAdminSuccess,
  countOfAdminFailed,
  countOfCustomer,
  countOfCustomerSuccess,
  countOfCustomerFailed,
  countTicketAdmin,
  countTicketAdminSuccess,
  countTicketAdminFailed,
  countTicketCustomer,
  countTicketCustomerSuccess,
  countTicketCustomerFailed,
  listProductCustomerServicesAdmin,
  listProductCustomerServicesAdminSuccess,
  listProductCustomerServicesAdminFailed,
  listProductCustomerServicesCustomer,
  listProductCustomerServicesCustomerSuccess,
  listProductCustomerServicesCustomerFailed,
  listCustomerOfProductAdmin,
  listCustomerOfProductAdminSuccess,
  listCustomerOfProductAdminFailed,
  listPackageofProductCustomer,
  listPackageofProductCustomerSuccess,
  listPackageofProductCustomerFailed,
  getBalance,
  getBalanceSuccess,
  getBalanceFailed
};
function listPackageofProductCustomer(listPackageofProductCustomer) {
  return {
    type: types.PACKAGE_OF_PRODUCT_CUSTOMER,
    listPackageofProductCustomer,
  };
}
function listPackageofProductCustomerSuccess(listPackageofProductCustomerSuccess) {
  return {
    type: types.PACKAGE_OF_PRODUCT_CUSTOMER_SUCCESS,
    listPackageofProductCustomerSuccess,
  };
}
function listPackageofProductCustomerFailed(listPackageofProductCustomerFailed) {
  return {
    type: types.PACKAGE_OF_PRODUCT_CUSTOMER_FAILED,
    listPackageofProductCustomerFailed,
  };
}
function listCustomerOfProductAdmin(listCustomerOfProductAdmin) {
  return {
    type: types.GET_LIST_CUSTOMER_OF_PRODUCT_ADMIN,
    listCustomerOfProductAdmin,
  };
}
function listCustomerOfProductAdminSuccess(listCustomerOfProductAdminSuccess) {
  return {
    type: types.GET_LIST_CUSTOMER_OF_PRODUCT_ADMIN_SUCCESS,
    listCustomerOfProductAdminSuccess,
  };
}
function listCustomerOfProductAdminFailed(listCustomerOfProductAdminFailed) {
  return {
    type: types.GET_LIST_CUSTOMER_OF_PRODUCT_ADMIN_FAILED,
    listCustomerOfProductAdminFailed,
  };
}
function listProductCustomerServicesCustomer(
  listProductCustomerServicesCustomer
) {
  return {
    type: types.GET_LIST_PRODUCT_SERVICES_CUSTOMER,
    listProductCustomerServicesCustomer,
  };
}
function listProductCustomerServicesCustomerSuccess(
  listProductCustomerServicesCustomerSuccess
) {
  return {
    type: types.GET_LIST_PRODUCT_SERVICES_CUSTOMER_SUCCESS,
    listProductCustomerServicesCustomerSuccess,
  };
}
function listProductCustomerServicesCustomerFailed(
  listProductCustomerServicesCustomerFailed
) {
  return {
    type: types.GET_LIST_PRODUCT_SERVICES_CUSTOMER_FAILED,
    listProductCustomerServicesCustomerFailed,
  };
}
function listProductCustomerServicesAdmin(listProductCustomerServicesAdmin) {
  return {
    type: types.GET_LIST_PRODUCT_SERVICES_ADMIN,
    listProductCustomerServicesAdmin,
  };
}
function listProductCustomerServicesAdminSuccess(
  listProductCustomerServicesAdminSuccess
) {
  return {
    type: types.GET_LIST_PRODUCT_SERVICES_ADMIN_SUCCESS,
    listProductCustomerServicesAdminSuccess,
  };
}
function listProductCustomerServicesAdminFailed(
  listProductCustomerServicesAdminFailed
) {
  return {
    type: types.GET_LIST_PRODUCT_SERVICES_ADMIN_FAILED,
    listProductCustomerServicesAdminFailed,
  };
}
function countTicketAdmin(countTicketAdmin) {
  return {
    type: types.GET_COUNT_TICKET_ADMIN,
    countTicketAdmin,
  };
}
function countTicketAdminSuccess(countTicketAdminSuccess) {
  return {
    type: types.GET_COUNT_TICKET_ADMIN_SUCCESS,
    countTicketAdminSuccess,
  };
}
function countTicketAdminFailed(countTicketAdminFailed) {
  return {
    type: types.GET_COUNT_TICKET_ADMIN_FAILED,
    countTicketAdminFailed,
  };
}
function countTicketCustomer(countTicketCustomer) {
  return {
    type: types.GET_COUNT_TICKET_CUSTOMER,
    countTicketCustomer,
  };
}
function countTicketCustomerSuccess(countTicketCustomerSuccess) {
  return {
    type: types.GET_COUNT_TICKET_CUSTOMER_SUCCESS,
    countTicketCustomerSuccess,
  };
}
function countTicketCustomerFailed(countTicketCustomerFailed) {
  return {
    type: types.GET_COUNT_TICKET_CUSTOMER_FAILED,
    countTicketCustomerFailed,
  };
}
function getMenu(menu) {
  return {
    type: types.GET_MENU,
    menu,
  };
}

function getPageRequest() {
  return {
    type: types.GET_PAGE_REQUEST,
  };
}

function getPage(page) {
  return {
    type: types.GET_PAGE,
    page,
  };
}

function getDetail(detail) {
  return {
    type: types.GET_DETAIL,
    detail,
  };
}

function refreshPage(isRefreshPage) {
  return {
    type: types.REFRESH_PAGE,
    isRefreshPage,
  };
}
function infoCustomer(infoCustomer) {
  return {
    type: types.INFO_CUSTOMER,
    infoCustomer,
  };
}
function infoCustomerSuccess(infoCustomerSuccess) {
  return {
    type: types.INFO_CUSTOMER_SUCCESS,
    infoCustomerSuccess,
  };
}
function infoCustomerFailed(infoCustomerFailed) {
  return {
    type: types.INFO_CUSTOMER_FAILED,
    infoCustomerFailed,
  };
}

function countOfAdmin(countOfAdmin) {
  return {
    type: types.GET_COUNT_ADMIN,
    countOfAdmin,
  };
}
function countOfAdminSuccess(countOfAdminSuccess) {
  return {
    type: types.GET_COUNT_ADMIN_SUCCESS,
    countOfAdminSuccess,
  };
}
function countOfAdminFailed(countOfAdminFailed) {
  return {
    type: types.GET_COUNT_ADMIN_FAILED,
    countOfAdminFailed,
  };
}
function countOfCustomer(countOfCustomer) {
  return {
    type: types.GET_COUNT_CUSTOMER,
    countOfCustomer,
  };
}
function countOfCustomerSuccess(countOfCustomerSuccess) {
  return {
    type: types.GET_COUNT_CUSTOMER_SUCCESS,
    countOfCustomerSuccess,
  };
}
function countOfCustomerFailed(countOfCustomerFailed) {
  return {
    type: types.GET_COUNT_CUSTOMER_FAILED,
    countOfCustomerFailed,
  };
}
function getBalance(getBalance) {
  return {
    type: types.GET_BALANCE,
    getBalance,
  };
}
function getBalanceSuccess(getBalanceSuccess) {
  return {
    type: types.GET_BALANCE_SUCCESS,
    getBalanceSuccess,
  };
}
function getBalanceFailed(getBalanceFailed) {
  return {
    type: types.GET_BALANCE_FAILED,
    getBalanceFailed,
  };
}