import * as types from "./actionTypes";

export {
  login,
  staticInfo,
  staticInfoSuccess,
  staticInfoFailed,
  shoppingCart,
  updateFcmToken,
  updateFcmTokenSuccess,
  updateFcmTokenFailed,
  countAlertOfCustomer,
  countAlertOfCustomerSuccess,
  countAlertOfCustomerFailed,
};

function login(data) {
  return {
    type: types.LOGIN,
    data,
  };
}
function shoppingCart(shoppingCart) {
  return {
    type: types.SET_SHOPPING_CARTS,
    shoppingCart,
  };
}
function staticInfo(staticInfo) {
  return {
    type: types.STATIC_INFO,
    staticInfo,
  };
}
function staticInfoSuccess(staticInfoSuccess) {
  return {
    type: types.STATIC_INFO_SUCCESS,
    staticInfoSuccess,
  };
}
function staticInfoFailed(staticInfoFailed) {
  return {
    type: types.STATIC_INFO_FAILED,
    staticInfoFailed,
  };
}
function updateFcmToken(updateFcmToken) {
  return {
    type: types.FCM_TOKEN,
    updateFcmToken,
  };
}
function updateFcmTokenSuccess(updateFcmTokenSuccess) {
  return {
    type: types.FCM_TOKEN_SUCCESS,
    updateFcmTokenSuccess,
  };
}
function updateFcmTokenFailed(updateFcmTokenFailed) {
  return {
    type: types.FCM_TOKEN_FAILED,
    updateFcmTokenFailed,
  };
}
function countAlertOfCustomer(countAlertOfCustomer) {
  return {
    type: types.COUNT_ALERT,
    countAlertOfCustomer,
  };
}
function countAlertOfCustomerSuccess(countAlertOfCustomerSuccess) {
  return {
    type: types.COUNT_ALERT_SUCCESS,
    countAlertOfCustomerSuccess,
  };
}
function countAlertOfCustomerFailed(countAlertOfCustomerFailed) {
  return {
    type: types.COUNT_ALERT_FAILED,
    countAlertOfCustomerFailed,
  };
}
