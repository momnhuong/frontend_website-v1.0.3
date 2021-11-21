import * as actions from "./actions";
import { LOADING } from "../constants/config";
import * as appAPIs from "../api/appAPIs";
import { history } from "../store/history";
import {getZendeskID} from "../constants/common";

export {
  changeOpenKey,
  logout,
  showPopup,
  hidePopup,
  pushPage,
  loading,
  offLoading,
  errorMessage,
  offErroMessage,
  shoppingCart,
  shoppingCartFailed,
  setMenu,
};

function changeOpenKey(defaultOpenKeys, defaultSelectedKeys) {
  return (dispatch) => {
    // dispatch(actions.changeOpenKey(defaultOpenKeys, defaultSelectedKeys));
  };
}

function logout(data) {
  return (dispatch) => {
    let param = {
      zendesk_id: data,
    };
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      console.log("emailRecover");

      appAPIs
        .logout(param)
        .then((res) => {
          localStorage.removeItem("persist:root");
          let data = {
            zendesk_id: getZendeskID().toString(),
          };
          appAPIs.logout(data);
          localStorage.clear();
          history.push("login");
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function showPopup(popupType, item) {
  return (dispatch) => {
    dispatch(actions.togglePopup(true, popupType, item));
  };
}

function hidePopup() {
  return (dispatch) => {
    dispatch(actions.togglePopup(false));
  };
}
function pushPage(item) {
  return (dispatch) => {
    dispatch(actions.pushPage(item));
  };
}
function loading(data) {
  return (dispatch) => {
    dispatch(actions.loading(data));
  };
}

function offLoading(data) {
  return (dispatch) => {
    dispatch(actions.offLoading(data));
  };
}

function errorMessage(data) {
  return (dispatch) => {
    dispatch(actions.errorMessage(data));
  };
}

function offErroMessage() {
  return actions.offErroMessage();
}
function shoppingCart(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(actions.shoppingCart(data));
      resolve(data);
    });
  };
}
function shoppingCartFailed() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(actions.shoppingCartFailed());
    });
  };
}

function setMenu(defaultOpenKeys, defaultSelectedKeys) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(actions.setMenu(defaultOpenKeys, defaultSelectedKeys));
    });
  };
}
