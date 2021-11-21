import * as types from "./actionTypes";

export {
  listProduct,
  listProductSuccess,
  listProductFailed,
  detailProduct,
  detailProductSuccess,
  detailProductFailed,
  editProduct,
  editProductSuccess,
  editProductFailed,
  delProduct,
  delProductSuccess,
  delProductFailed,
  createProduct,
  createProductSuccess,
  createProductFailed,
  listProductOfCustomer,
  listProductOfCustomerSuccess,
  listProductOfCustomerFailed,
  listCatelog,
  listCatelogSuccess,
  listCatelogFailed,
  listProductOfCatelog,
  listProductOfCatelogSuccess,
  listProductOfCatelogFailed,
  createOrder,
  createOrderSuccess,
  createOrderFailed,
};

function listProduct(listProduct) {
  return {
    type: types.GET_LIST_PRODUCTS,
    listProduct,
  };
}
function listProductSuccess(listProductSuccess) {
  return {
    type: types.GET_LIST_PRODUCTS_SUCCESS,
    listProductSuccess,
  };
}
function listProductFailed(listProductFailed) {
  return {
    type: types.GET_LIST_PRODUCTS_FAILED,
    listProductFailed,
  };
}
function detailProduct(detailProduct) {
  return {
    type: types.GET_DETAIL_PRODUCTS,
    detailProduct,
  };
}
function detailProductSuccess(detailProductSuccess) {
  return {
    type: types.GET_DETAIL_PRODUCTS_SUCCESS,
    detailProductSuccess,
  };
}
function detailProductFailed(detailProductFailed) {
  return {
    type: types.GET_DETAIL_PRODUCTS_FAILED,
    detailProductFailed,
  };
}
function editProduct(editProduct) {
  return {
    type: types.EDIT_DETAIL_PRODUCT,
    editProduct,
  };
}
function editProductSuccess(editProductSuccess) {
  return {
    type: types.EDIT_DETAIL_PRODUCT_SUCCESS,
    editProductSuccess,
  };
}
function editProductFailed(editProductFailed) {
  return {
    type: types.EDIT_DETAIL_PRODUCT_FAILED,
    editProductFailed,
  };
}
function delProduct(delProduct) {
  return {
    type: types.DEL_PRODUCT,
    delProduct,
  };
}
function delProductSuccess(delProductSuccess) {
  return {
    type: types.DEL_PRODUCT_SUCCESS,
    delProductSuccess,
  };
}
function delProductFailed(delProductFailed) {
  return {
    type: types.DEL_PRODUCT_FAILED,
    delProductFailed,
  };
}
function createProduct(createProduct) {
  return {
    type: types.CREATE_PRODUCT,
    createProduct,
  };
}
function createProductSuccess(createProductSuccess) {
  return {
    type: types.CREATE_PRODUCT_SUCCESS,
    createProductSuccess,
  };
}
function createProductFailed(createProductFailed) {
  return {
    type: types.CREATE_PRODUCT_FAILED,
    createProductFailed,
  };
}
function listProductOfCustomer(listProductOfCustomer) {
  return {
    type: types.GET_LIST_PRODUCT_OF_CUSTOMER,
    listProductOfCustomer,
  };
}
function listProductOfCustomerSuccess(listProductOfCustomerSuccess) {
  return {
    type: types.GET_LIST_PRODUCT_OF_CUSTOMER_SUCCESS,
    listProductOfCustomerSuccess,
  };
}
function listProductOfCustomerFailed(listProductOfCustomerFailed) {
  return {
    type: types.GET_LIST_PRODUCT_OF_CUSTOMER_FAILED,
    listProductOfCustomerFailed,
  };
}
function listCatelog(listCatelog) {
  return {
    type: types.GET_CATELOG,
    listCatelog,
  };
}
function listCatelogSuccess(listCatelogSuccess) {
  return {
    type: types.GET_CATELOG_SUCCESS,
    listCatelogSuccess,
  };
}
function listCatelogFailed(listCatelogFailed) {
  return {
    type: types.GET_CATELOG_FAILED,
    listCatelogFailed,
  };
}
function listProductOfCatelog(listProductOfCatelog) {
  return {
    type: types.GET_PRODUCT_OF_CATELOG,
    listProductOfCatelog,
  };
}
function listProductOfCatelogSuccess(listProductOfCatelogSuccess) {
  return {
    type: types.GET_PRODUCT_OF_CATELOG_SUCCESS,
    listProductOfCatelogSuccess,
  };
}
function listProductOfCatelogFailed(listProductOfCatelogFailed) {
  return {
    type: types.GET_PRODUCT_OF_CATELOG_FAILED,
    listProductOfCatelogFailed,
  };
}

function createOrder(createOrder) {
  return {
    type: types.CREATE_ORDER,
    createOrder,
  };
}
function createOrderSuccess(createOrderSuccess) {
  return {
    type: types.CREATE_ORDER_SUCCESS,
    createOrderSuccess,
  };
}
function createOrderFailed(createOrderFailed) {
  return {
    type: types.CREATE_ORDER_FAILED,
    createOrderFailed,
  };
}
