import * as types from "./actionTypes";
import { get, isEqual } from "lodash";

let initialState = {
  defaultOpenKeys: "menu_0",
  defaultSelectedKeys: "",
  isOAuth: false,
  userProfile: null,
  popupType: "",
  isDisplayPopup: false,
  item: {},
  itemPush: {},
  loading: {
    full: false,
    popup: false,
  },
  error: "",
  shoppingCart: null,
};

export function root(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_OPEN_KEY:
      return {
        ...state,
        // defaultOpenKeys: action.defaultOpenKeys,
        // defaultSelectedKeys: action.defaultSelectedKeys,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isOAuth: true,
        userProfile: action.userProfile,
        shoppingCart: null,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isOAuth: false,
        userProfile: null,
        shoppingCart: null,
      };
    case types.TOGGLE_POPUP:
      return {
        ...state,
        isDisplayPopup: action.isDisplay,
        popupType: action.popupType,
        item: action.item,
      };
    case types.PUSH_PAGE:
      return {
        ...state,
        itemPush: action.itemPush,
      };
    case types.SET_MENU:
      return {
        ...state,
        defaultOpenKeys: action.defaultOpenKeys,
        defaultSelectedKeys: action.defaultSelectedKeys,
      };
    case types.LOADING:
      return {
        ...state,
        loading: {
          full: isEqual(get(action, "data"), "full") ? true : false,
          popup: isEqual(get(action, "data"), "popup") ? true : false,
        },
      };
    case types.OFF_LOADING:
      return {
        ...state,
        loading: {
          full: false,
          popup: false,
        },
      };
    case types.ERROR_MESSAGE:
      return {
        ...state,
        error: get(action, "data", ""),
      };
    case types.OFF_ERROR_MESSAGE:
      return {
        ...state,
        error: "",
      };
    case types.SET_SHOPPING_CARTS:
      return {
        ...state,
        shoppingCart: action.shoppingCart,
      };
    case types.SET_SHOPPING_CARTS_FAILED:
      return {
        ...state,
        shoppingCart: null,
      };
    default:
      return state;
  }
}
