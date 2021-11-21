import * as types from "./actionTypes";

export {
  getRole,
  getRoleSuccess,
  getRoleFailed,
  getlistcustomer,
  getlistcustomersuccess,
  getlistcustomerfailed,
  detailCustomer,
  detailCustomerSuccess,
  detailCustomerFailed,
  editCustomer,
  editCustomerSuccess,
  editCustomerFailed,
  delCustomer,
  delCustomerSuccess,
  delCustomerFailed,
  listCustomerAccount,
  listCustomerAccountSuccess,
  listCustomerAccountFailed,
  detailCustomerAccount,
  detailCustomerAccountSuccess,
  detailCustomerAccountFailed,
  delCustomerAccount,
  delCustomerAccountSuccess,
  delCustomerAccountFailed,
  listAccountofCustomer,
  listAccountofCustomerSuccess,
  listAccountofCustomerFailed,
  addCustomer,
  addCustomerSuccess,
  addCustomerFailed,
  addCustomerAccount,
  addCustomerAccountSuccess,
  addCustomerAccountFailed,
  detailAccountCustomer,
  detailAccountCustomerSuccess,
  detailAccountCustomerFailed,
};
function detailAccountCustomer(detailAccountCustomer) {
  return {
    type: types.GET_DETAIL_ACCOUNT_CUSTOMER,
    detailAccountCustomer,
  };
}
function detailAccountCustomerSuccess(detailAccountCustomerSuccess) {
  return {
    type: types.GET_DETAIL_ACCOUNT_CUSTOMER_SUCCESS,
    detailAccountCustomerSuccess,
  };
}
function detailAccountCustomerFailed(detailAccountCustomerFailed) {
  return {
    type: types.GET_DETAIL_ACCOUNT_CUSTOMER_FAILED,
    detailAccountCustomerFailed,
  };
}
function getRole(dataRule) {
  return {
    type: types.GET_ROLE,
    dataRule,
  };
}
function getRoleSuccess(dataRuleSuccess) {
  return {
    type: types.GET_ROLE_SUCCESS,
    dataRuleSuccess,
  };
}
function getRoleFailed(dataRuleFailed) {
  return {
    type: types.GET_ROLE_FAILED,
    dataRuleFailed,
  };
}
function getlistcustomer(data) {
  return {
    type: types.GET_LIST_CUSTOMER,
    data,
  };
}
function getlistcustomersuccess(dataSuccess) {
  return {
    type: types.GET_LIST_CUSTOMER_SUCCESS,
    dataSuccess,
  };
}
function getlistcustomerfailed(dataFailed) {
  return {
    type: types.GET_LIST_CUSTOMER_FAILED,
    dataFailed,
  };
}
function detailCustomer(detailCustomer) {
  return {
    type: types.GET_LIST_CUSTOMER_FAILED,
    detailCustomer,
  };
}
function detailCustomerSuccess(detailCustomerSuccess) {
  return {
    type: types.GET_DETAIL_CUSTOMER_SUCCESS,
    detailCustomerSuccess,
  };
}
function detailCustomerFailed(detailCustomerFailed) {
  return {
    type: types.GET_DETAIL_CUSTOMER_FAILED,
    detailCustomerFailed,
  };
}
function editCustomer(editCustomer) {
  return {
    type: types.EDIT_DETAIL_CUSTOMER,
    editCustomer,
  };
}
function editCustomerSuccess(editCustomerSuccess) {
  return {
    type: types.EDIT_DETAIL_CUSTOMER_SUCCESS,
    editCustomerSuccess,
  };
}
function editCustomerFailed(editCustomerFailed) {
  return {
    type: types.EDIT_DETAIL_CUSTOMER_FAILED,
    editCustomerFailed,
  };
}
function delCustomer(delCustomer) {
  return {
    type: types.DEL_CUSTOMER,
    delCustomer,
  };
}
function delCustomerSuccess(delCustomerSuccess) {
  return {
    type: types.DEL_CUSTOMER_SUCCESS,
    delCustomerSuccess,
  };
}
function delCustomerFailed(delCustomerFailed) {
  return {
    type: types.DEL_CUSTOMER_FAILED,
    delCustomerFailed,
  };
}

function listCustomerAccount(listCustomerAccount) {
  return {
    type: types.GET_LIST_CUSTOMER_ACCOUNT,
    listCustomerAccount,
  };
}
function listCustomerAccountSuccess(listCustomerAccountSuccess) {
  return {
    type: types.GET_LIST_CUSTOMER_ACCOUNT_SUCCESS,
    listCustomerAccountSuccess,
  };
}
function listCustomerAccountFailed(listCustomerAccountFailed) {
  return {
    type: types.GET_LIST_CUSTOMER_ACCOUNT_FAILED,
    listCustomerAccountFailed,
  };
}
function detailCustomerAccount(detailCustomerAccount) {
  return {
    type: types.UPDATE_DETAIL_CUSTOMER_ACCOUNT,
    detailCustomerAccount,
  };
}
function detailCustomerAccountSuccess(detailCustomerAccountSuccess) {
  return {
    type: types.UPDATE_DETAIL_CUSTOMER_ACCOUNT_SUCCESS,
    detailCustomerAccountSuccess,
  };
}
function detailCustomerAccountFailed(detailCustomerAccountFailed) {
  return {
    type: types.UPDATE_DETAIL_CUSTOMER_ACCOUNT_FAILED,
    detailCustomerAccountFailed,
  };
}
function delCustomerAccount(delCustomerAccount) {
  return {
    type: types.DEL_DETAIL_CUSTOMER_ACCOUNT,
    delCustomerAccount,
  };
}
function delCustomerAccountSuccess(delCustomerAccountSuccess) {
  return {
    type: types.DEL_DETAIL_CUSTOMER_ACCOUNT_SUCCESS,
    delCustomerAccountSuccess,
  };
}
function delCustomerAccountFailed(delCustomerAccountFailed) {
  return {
    type: types.DEL_DETAIL_CUSTOMER_ACCOUNT_FAILED,
    delCustomerAccountFailed,
  };
}
function listAccountofCustomer(listAccountofCustomer) {
  return {
    type: types.LIST_ACCOUNT_OF_CUSTOMER,
    listAccountofCustomer,
  };
}
function listAccountofCustomerSuccess(listAccountofCustomerSuccess) {
  return {
    type: types.LIST_ACCOUNT_OF_CUSTOMER_SUCCESS,
    listAccountofCustomerSuccess,
  };
}
function listAccountofCustomerFailed(listAccountofCustomerFailed) {
  return {
    type: types.LIST_ACCOUNT_OF_CUSTOMER_FAILED,
    listAccountofCustomerFailed,
  };
}
function addCustomer(addCustomer) {
  return {
    type: types.ADD_CUSTOMER,
    addCustomer,
  };
}
function addCustomerSuccess(addCustomerSuccess) {
  return {
    type: types.ADD_CUSTOMER_SUCCESS,
    addCustomerSuccess,
  };
}
function addCustomerFailed(addCustomerFailed) {
  return {
    type: types.ADD_CUSTOMER_FAILED,
    addCustomerFailed,
  };
}
function addCustomerAccount(addCustomerAccount) {
  return {
    type: types.ADD_CUSTOMER_ACCOUNT,
    addCustomerAccount,
  };
}
function addCustomerAccountSuccess(addCustomerAccountSuccess) {
  return {
    type: types.ADD_CUSTOMER_ACCOUNT_SUCCESS,
    addCustomerAccountSuccess,
  };
}
function addCustomerAccountFailed(addCustomerAccountFailed) {
  return {
    type: types.ADD_CUSTOMER_ACCOUNT_FAILED,
    addCustomerAccountFailed,
  };
}
