import * as types from "./actionTypes";

export {
  listBilling,
  listBillingSuccess,
  listBillingFailed,

  detailBilling,
  detailBillingSuccess,
  detailBillingFailed,

  createBilling,
  createBillingSuccess,
  createBillingFailed,

  editBilling,
  editBillingSuccess,
  editBillingFailed
};

function listBilling(listBilling) {
  return {
    type: types.LIST_BILLING,
    listBilling,
  };
}
function listBillingSuccess(listBillingSuccess) {
  return {
    type: types.LIST_BILLING_SUCCESS,
    listBillingSuccess,
  };
}
function listBillingFailed(listBillingFailed) {
  return {
    type: types.LIST_BILLING_FAILED,
    listBillingFailed,
  };
}

function detailBilling(detailBilling) {
  return {
    type: types.DETAIL_BILLING,
    detailBilling,
  };
}
function detailBillingSuccess(detailBillingSuccess) {
  return {
    type: types.DETAIL_BILLING_SUCCESS,
    detailBillingSuccess,
  };
}
function detailBillingFailed(detailBillingFailed) {
  return {
    type: types.DETAIL_BILLING_FAILED,
    detailBillingFailed,
  };
}


function createBilling(createBilling) {
  return {
    type: types.CREATE_BILLING,
    createBilling,
  };
}
function createBillingSuccess(createBillingSuccess) {
  return {
    type: types.CREATE_BILLING_SUCCESS,
    createBillingSuccess,
  };
}
function createBillingFailed(createBillingFailed) {
  return {
    type: types.CREATE_BILLING_FAILED,
    createBillingFailed,
  };
}

function editBilling(editBilling) {
  return {
    type: types.EDIT_BILLING,
    editBilling,
  };
}

function editBillingSuccess(editBillingSuccess) {
  return {
    type: types.EDIT_BILLING_SUCCESS,
    editBillingSuccess,
  };
}

function editBillingFailed(editBillingFailed) {
  return {
    type: types.EDIT_BILLING_FAILED,
    editBillingFailed,
  };
}