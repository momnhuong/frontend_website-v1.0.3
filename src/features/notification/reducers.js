import * as types from "./actionTypes";
const initialState = {
  listAlertAdmin: {},
  listAlertAdminSuccess: {},
  listAlertAdminFailed: {},
  alertRead: {},
  alertReadSuccess: {},
  alertReadFailed: {},
};

export default function alert(state = initialState, action = {}) {
  switch (action.type) {
    case types.LIST_ALERT_ADMIN:
      return {
        ...state,
        listAlertAdmin: action.listAlertAdmin,
      };
    case types.LIST_ALERT_ADMIN_SUCCESS:
      return {
        ...state,
        listAlertAdminSuccess: action.listAlertAdminSuccess,
      };
    case types.LIST_ALERT_ADMIN_FAILED:
      return {
        ...state,
        listAlertAdminFailed: action.listAlertAdminFailed,
      };
    case types.PUT_ALERT_READ:
      return {
        ...state,
        alertRead: action.alertRead,
      };
    case types.PUT_ALERT_READ_SUCCESS:
      return {
        ...state,
        alertReadSuccess: action.alertReadSuccess,
      };
    case types.PUT_ALERT_READ_FAILED:
      return {
        ...state,
        alertReadFailed: action.alertReadFailed,
      };
    default:
      return state;
  }
}
