import * as types from "./actionTypes";

export {
  listProductCustomer,
  listProductCustomerSuccess,
  listProductCustomerFailed,
  detailProductCustomer,
  detailProductCustomerSuccess,
  detailProductCustomerFailed,
  delProductCustomer,
  delProductCustomerSuccess,
  delProductCustomerFailed,
  postProductOfCustomer,
  postProductOfCustomerSuccess,
  postProductOfCustomerFailed,
  createProductOfCustomer,
  createProductOfCustomerSuccess,
  createProductOfCustomerFailed,
  updateProductOfCustomer,
  updateProductOfCustomerSuccess,
  updateProductOfCustomerFailed,
  detailProductOfCustomer,
  detailProductOfCustomerSuccess,
  detailProductOfCustomerFailed,
  listContractOfCustomer,
  listContractOfCustomerSuccess,
  listContractOfCustomerFailed,
  updatedetailProductOfCustomer,
  updatedetailProductOfCustomerSuccess,
  updatedetailProductOfCustomerFailed
};

function updatedetailProductOfCustomer(updatedetailProductOfCustomer) {
  return{
    type: types.UPDATE_DETAIL_PRODUCT_OF_CUSTOMER,
    updatedetailProductOfCustomer
  }
}
function updatedetailProductOfCustomerSuccess(updatedetailProductOfCustomerSuccess) {
  return{
    type: types.UPDATE_DETAIL_PRODUCT_OF_CUSTOMER_SUCCESS,
    updatedetailProductOfCustomerSuccess
  }
}
function updatedetailProductOfCustomerFailed(updatedetailProductOfCustomerFailed) {
  return{
    type: types.UPDATE_DETAIL_PRODUCT_OF_CUSTOMER_FAILED,
    updatedetailProductOfCustomerFailed
  }
}

function listContractOfCustomer(listContractOfCustomer) {
  return{
    type: types.GET_LIST_CONTRACT_OF_CUSTOMER,
    listContractOfCustomer
  }
}
function listContractOfCustomerSuccess(listContractOfCustomerSuccess) {
  return{
    type: types.GET_LIST_CONTRACT_OF_CUSTOMER_SUCCESS,
    listContractOfCustomerSuccess
  }
}
function listContractOfCustomerFailed(listContractOfCustomerFailed) {
  return{
    type: types.GET_LIST_CONTRACT_OF_CUSTOMER_FAILED,
    listContractOfCustomerFailed
  }
}
function detailProductOfCustomer(detailProductOfCustomer) {
  return{
    type: types.DETAIL_PRODUCT_OF_CUSTOMER,
    detailProductOfCustomer
  }
}
function detailProductOfCustomerSuccess(detailProductOfCustomerSuccess) {
  return{
    type: types.DETAIL_PRODUCT_OF_CUSTOMER_SUCCESS,
    detailProductOfCustomerSuccess
  }
}
function detailProductOfCustomerFailed(detailProductOfCustomerFailed) {
  return{
    type: types.DETAIL_PRODUCT_OF_CUSTOMER_FAILED,
    detailProductOfCustomerFailed
  }
}
function updateProductOfCustomer(updateProductOfCustomer) {
  return {
    type: types.UPDATE_PRODUCT_OF_CUSTOMER,
    updateProductOfCustomer,
  };
}
function updateProductOfCustomerSuccess(updateProductOfCustomerSuccess) {
  return {
    type: types.UPDATE_PRODUCT_OF_CUSTOMER_SUCCESS,
    updateProductOfCustomerSuccess,
  };
}
function updateProductOfCustomerFailed(updateProductOfCustomerFailed) {
  return {
    type: types.UPDATE_PRODUCT_OF_CUSTOMER_FAILED,
    updateProductOfCustomerFailed,
  };
}
function listProductCustomer(listOrderCustomer) {
  return {
    type: types.GET_LIST_PRODUCT_CUSTOMER,
    listOrderCustomer,
  };
}
function listProductCustomerSuccess(listProductCustomerSuccess) {
  return {
    type: types.GET_LIST_PRODUCT_CUSTOMER_SUCCESS,
    listProductCustomerSuccess,
  };
}
function listProductCustomerFailed(listProductCustomerFailed) {
  return {
    type: types.GET_LIST_PRODUCT_CUSTOMER_FAILED,
    listProductCustomerFailed,
  };
}
function detailProductCustomer(detailProductCustomer) {
  return {
    type: types.GET_DETAIL_PRODUCT_CUSTOMER,
    detailProductCustomer,
  };
}
function detailProductCustomerSuccess(detailProductCustomerSuccess) {
  return {
    type: types.GET_DETAIL_PRODUCT_CUSTOMER_SUCCESS,
    detailProductCustomerSuccess,
  };
}
function detailProductCustomerFailed(detailProductCustomerFailed) {
  return {
    type: types.GET_DETAIL_PRODUCT_CUSTOMER_FAILED,
    detailProductCustomerFailed,
  };
}
function delProductCustomer(delProductCustomer) {
  return {
    type: types.DEL_PRODUCT_CUSTOMER,
    delProductCustomer,
  };
}
function delProductCustomerSuccess(delProductCustomerSuccess) {
  return {
    type: types.DEL_PRODUCT_CUSTOMER_SUCCESS,
    delProductCustomerSuccess,
  };
}
function delProductCustomerFailed(delProductCustomerFailed) {
  return {
    type: types.DEL_PRODUCT_CUSTOMER_FAILED,
    delProductCustomerFailed,
  };
}
function postProductOfCustomer(postProductOfCustomer) {
  return {
    type: types.POST_PRODUCT_OF_CUSTOMER,
    postProductOfCustomer,
  };
}
function postProductOfCustomerSuccess(postProductOfCustomerSuccess) {
  return {
    type: types.POST_PRODUCT_OF_CUSTOMER_SUCCESS,
    postProductOfCustomerSuccess,
  };
}
function postProductOfCustomerFailed(postProductOfCustomerFailed) {
  return {
    type: types.POST_PRODUCT_OF_CUSTOMER_FAILED,
    postProductOfCustomerFailed,
  };
}
function createProductOfCustomer(createProductOfCustomer) {
  return {
    type: types.CREATE_PRODUCT_OF_CUSTOMER,
    createProductOfCustomer,
  };
}
function createProductOfCustomerSuccess(createProductOfCustomerSuccess) {
  return {
    type: types.CREATE_PRODUCT_OF_CUSTOMER_SUCCESS,
    createProductOfCustomerSuccess,
  };
}
function createProductOfCustomerFailed(createProductOfCustomerFailed) {
  return {
    type: types.CREATE_PRODUCT_OF_CUSTOMER_FAILED,
    createProductOfCustomerFailed,
  };
}
