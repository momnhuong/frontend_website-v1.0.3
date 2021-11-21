import * as types from "./actionTypes";
import * as action from "./actions";

const initialState = {
  userProfile: null,
  staticInfo: {},
  staticInfoSuccess: {},
  staticInfoFailed: {},
  updateFcmToken: {},
  updateFcmTokenSuccess: {},
  updateFcmTokenFailed: {},
  countAlertOfCustomer: {},
  countAlertOfCustomerSuccess: {},
  countAlertOfCustomerFailed: {},
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case types.STATIC_INFO:
      return {
        ...state,
        staticInfo: action.staticInfo,
      };
    case types.STATIC_INFO_SUCCESS:
      return {
        ...state,
        staticInfoSuccess: action.staticInfoSuccess,
      };
    case types.STATIC_INFO_FAILED:
      return {
        ...state,
        staticInfoFailed: action.staticInfoFailed,
      };
    case types.FCM_TOKEN:
      return {
        ...state,
        updateFcmToken: action.updateFcmToken,
      };
    case types.FCM_TOKEN_SUCCESS:
      return {
        ...state,
        updateFcmTokenSuccess: action.updateFcmTokenSuccess,
      };
    case types.FCM_TOKEN_FAILED:
      return {
        ...state,
        updateFcmTokenFailed: action.updateFcmTokenFailed,
      };
    case types.COUNT_ALERT:
      return {
        ...state,
        countAlertOfCustomer: action.countAlertOfCustomer,
      };
    case types.COUNT_ALERT_SUCCESS:
      return {
        ...state,
        countAlertOfCustomerSuccess: action.countAlertOfCustomerSuccess,
      };
    case types.COUNT_ALERT_FAILED:
      return {
        ...state,
        countAlertOfCustomerFailed: action.countAlertOfCustomerFailed,
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
}
