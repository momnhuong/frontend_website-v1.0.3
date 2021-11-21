import * as types from "./actionTypes";
const initialState = {
  siteStatic: null,
  siteStaticSuccess: {},
  siteStaticFailed: {},
  getSatic:null,
  getSaticSuccess:{},
  getSaticFailed:{}
};

export default function putStaticManagement(state = initialState, action = {}) {
  switch (action.type) {
    case types.SITE_STATIC:
      return {
        ...state,
        siteStatic: action.siteStatic,
      };
    case types.SITE_STATIC_SUCCESS:
      return {
        ...state,
        siteStaticSuccess: action.siteStaticSuccess,
      };
    case types.SITE_STATIC_FAILED:
      return {
        ...state,
        siteStaticFailed: action.siteStaticFailed,
      };
    case types.GET_SATATIC_INFO:
      return {
        ...state,
        getSatic: action.getSatic,
      };
    case types.GET_SATATIC_INFO_SUCCESS:
      return {
        ...state,
        getSaticSuccess: action.getSaticSuccess,
      };
    case types.GET_SATATIC_INFO_FAILED:
      return {
        ...state,
        getSaticFailed: action.getSaticFailed,
      };
    default:
      return state;
  }
}
