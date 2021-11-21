import * as types from "./actionTypes";

export {
  listOrderCustomer,
  listOrderCustomerSuccess,
  listOrderCustomerFailed,
  detailOderCustomer,
  detailOderCustomerSuccess,
  detailOderCustomerFailed,
  delOrderOfCustomer,
  delOrderOfCustomerSuccess,
  delOrderOfCustomerFailed,
  createContract,
  createContractSuccess,
  createContractFailed,
};
function listOrderCustomer(listOrderCustomer) {
  return {
    type: types.GET_LIST_ORDER_CUSTOMER,
    listOrderCustomer,
  };
}
function listOrderCustomerSuccess(listOrderCustomerSuccess) {
  return {
    type: types.GET_LIST_ORDER_CUSTOMER_SUCCESS,
    listOrderCustomerSuccess,
  };
}
function listOrderCustomerFailed(listOrderCustomerFailed) {
  return {
    type: types.GET_LIST_ORDER_CUSTOMER_FAILED,
    listOrderCustomerFailed,
  };
}
function detailOderCustomer(detailOderCustomer) {
  return {
    type: types.GET_DETAIL_ORDER_CUSTOMER,
    detailOderCustomer,
  };
}
function detailOderCustomerSuccess(detailOderCustomerSuccess) {
  return {
    type: types.GET_DETAIL_ORDER_CUSTOMER_SUCCESS,
    detailOderCustomerSuccess,
  };
}
function detailOderCustomerFailed(detailOderCustomerFailed) {
  return {
    type: types.GET_DETAIL_ORDER_CUSTOMER_FAILED,
    detailOderCustomerFailed,
  };
}
function delOrderOfCustomer(delOrderOfCustomer) {
  return {
    type: types.DEL_ORDER_CUSTOMER,
    delOrderOfCustomer,
  };
}
function delOrderOfCustomerSuccess(delOrderOfCustomerSuccess) {
  return {
    type: types.DEL_ORDER_CUSTOMER_SUCCESS,
    delOrderOfCustomerSuccess,
  };
}
function delOrderOfCustomerFailed(delOrderOfCustomerFailed) {
  return {
    type: types.DEL_ORDER_CUSTOMER_FAILED,
    delOrderOfCustomerFailed,
  };
}
function createContract(createContract) {
  return {
    type: types.CREATE_CONTRACT,
    createContract,
  };
}
function createContractSuccess(createContractSuccess) {
  return {
    type: types.CREATE_CONTRACT_SUCCESS,
    createContractSuccess,
  };
}
function createContractFailed(createContractFailed) {
  return {
    type: types.CREATE_CONTRACT_FAILED,
    createContractFailed,
  };
}
