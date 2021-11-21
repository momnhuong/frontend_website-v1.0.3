import * as types from "./actionTypes";

export {
  addPackage,
  addPackageSuccess,
  addPackageFailed,
  listPackage,
  listPackageSuccess,
  listPackageFailed,
  detailPackage,
  detailPackageSuccess,
  detailPackageFailed,
  editPackage,
  editPackageSuccess,
  editPackageFailed,
  listPackageProduct,
  listPackageProductSuccess,
  listPackageProductFailed,
  updateStatusPackage,
  updateStatusPackageSuccess,
  updateStatusPackageFailed
};

function updateStatusPackage(updateStatusPackage) {
  return {
    type: types.UPDATE_PACKAGE,
    updateStatusPackage,
  };
}
function updateStatusPackageSuccess(updateStatusPackageSuccess) {
  return {
    type: types.UPDATE_PACKAGE_SUCCESS,
    updateStatusPackageSuccess,
  };
}

function updateStatusPackageFailed(updateStatusPackageFailed) {
  return {
    type: types.UPDATE_PACKAGE_FAILED,
    updateStatusPackageFailed,
  };
}

function listPackage(listPackage) {
  return {
    type: types.GET_LIST_PACKAGE,
    listPackage,
  };
}
function listPackageSuccess(listPackageSuccess) {
  return {
    type: types.GET_LIST_PACKAGE_SUCCESS,
    listPackageSuccess,
  };
}
function listPackageFailed(listPackageFailed) {
  return {
    type: types.GET_LIST_PACKAGE_FAILED,
    listPackageFailed,
  };
}
function addPackage(addPackage) {
  return {
    type: types.ADD_PACKAGE,
    addPackage,
  };
}
function addPackageSuccess(addPackageSuccess) {
  return {
    type: types.ADD_PACKAGE_SUCCESS,
    addPackageSuccess,
  };
}
function addPackageFailed(addPackageFailed) {
  return {
    type: types.ADD_PACKAGE_FAILED,
    addPackageFailed,
  };
}
function detailPackage(detailPackage) {
  return {
    type: types.DETAIL_PACKAGE,
    detailPackage,
  };
}
function detailPackageSuccess(detailPackageSuccess) {
  return {
    type: types.DETAIL_PACKAGE_SUCCESS,
    detailPackageSuccess,
  };
}
function detailPackageFailed(detailPackageFailed) {
  return {
    type: types.DETAIL_PACKAGE_FAILED,
    detailPackageFailed,
  };
}
function editPackage(editPackage) {
  return {
    type: types.EDIT_PACKAGE,
    editPackage,
  };
}
function editPackageSuccess(editPackageSuccess) {
  return {
    type: types.EDIT_PACKAGE_SUCCESS,
    editPackageSuccess,
  };
}
function editPackageFailed(editPackageFailed) {
  return {
    type: types.EDIT_PACKAGE_FAILED,
    editPackageFailed,
  };
}
function listPackageProduct(listPackageProduct) {
  return {
    type: types.LIST_PACKAGE_PRODUCT,
    listPackageProduct,
  };
}
function listPackageProductSuccess(listPackageProductSuccess) {
  return {
    type: types.LIST_PACKAGE_PRODUCT_SUCCESS,
    listPackageProductSuccess,
  };
}
function listPackageProductFailed(listPackageProductFailed) {
  return {
    type: types.LIST_PACKAGE_PRODUCT_FAILED,
    listPackageProductFailed,
  };
}
