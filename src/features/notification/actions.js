import * as types from "./actionTypes";

export {  listAlertAdmin, listAlertAdminSuccess,listAlertAdminFailed,alertRead,
alertReadSuccess,
alertReadFailed}

function listAlertAdmin(listAlertAdmin) {
  return {
    type: types.LIST_ALERT_ADMIN,
    listAlertAdmin,
  };
}
function listAlertAdminSuccess(listAlertAdminSuccess) {
  return {
    type: types.LIST_ALERT_ADMIN_SUCCESS,
    listAlertAdminSuccess,
  };
}
function  listAlertAdminFailed(listAlertAdminFailed) {
  return {
    type: types.LIST_ALERT_ADMIN_FAILED,
    listAlertAdminFailed,
  };
}
function alertRead(alertRead) {
  return {
    type: types.PUT_ALERT_READ,
    alertRead,
  };
}
function alertReadSuccess(alertReadSuccess) {
  return {
    type: types.PUT_ALERT_READ_SUCCESS,
    alertReadSuccess,
  };
}
function alertReadFailed(alertReadFailed) {
  return {
    type: types.PUT_ALERT_READ_FAILED,
    alertReadFailed,
  };
}