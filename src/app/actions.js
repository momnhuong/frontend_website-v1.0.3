import * as types from "./actionTypes";

export {
  changeOpenKey,
  loginSuccess,
  loginFailed,
  logoutSuccess,
  togglePopup,
  pushPage,
  loading,
  offLoading,
  errorMessage,
  offErroMessage,
  shoppingCart,
  shoppingCartFailed,
  setMenu,
};
function shoppingCart(shoppingCart) {
  return {
    type: types.SET_SHOPPING_CARTS,
    shoppingCart,
  };
}

function changeOpenKey(defaultOpenKeys, defaultSelectedKeys) {
  return {
    type: types.CHANGE_OPEN_KEY,
    defaultOpenKeys,
    defaultSelectedKeys,
  };
}

function loginSuccess(userProfile) {
  console.log("loginSuccess actions", userProfile);
  return {
    type: types.LOGIN_SUCCESS,
    userProfile,
  };
}

function loginFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}

function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS,
  };
}

function togglePopup(isDisplay, popupType, item) {
  // console.log("togglePopup", item);
  return {
    type: types.TOGGLE_POPUP,
    isDisplay,
    popupType,
    item,
  };
}

function pushPage(itemPush) {
  return {
    type: types.PUSH_PAGE,
    itemPush,
  };
}

function loading(data) {
  return {
    type: types.LOADING,
    data,
  };
}

function offLoading(data) {
  return {
    type: types.OFF_LOADING,
    data,
  };
}

function errorMessage(data) {
  return {
    type: types.ERROR_MESSAGE,
    data,
  };
}

function offErroMessage() {
  return {
    type: types.OFF_ERROR_MESSAGE,
  };
}
function shoppingCartFailed() {
  return {
    type: types.SET_SHOPPING_CARTS_FAILED,
  };
}

function setMenu(defaultOpenKeys, defaultSelectedKeys) {
  return {
    type: types.SET_MENU,
    defaultOpenKeys,
    defaultSelectedKeys,
  };
}
