import * as types from "./actionTypes";

export {
  siteStatic,
  siteStaticSuccess,
  siteStaticFailed,
  getSatic,
  getSaticSuccess,
  getSaticFailed,
};

function siteStatic(siteStatic) {
  return {
    type: types.SITE_STATIC,
    siteStatic,
  };
}
function siteStaticSuccess(siteStaticSuccess) {
  return {
    type: types.SITE_STATIC_SUCCESS,
    siteStaticSuccess,
  };
}
function siteStaticFailed(siteStaticFailed) {
  return {
    type: types.SITE_STATIC_FAILED,
    siteStaticFailed,
  };
}
function getSatic(getSatic) {
  return {
    type: types.GET_SATATIC_INFO,
    getSatic,
  };
}
function getSaticSuccess(getSaticSuccess) {
  return {
    type: types.GET_SATATIC_INFO_SUCCESS,
    getSaticSuccess,
  };
}
function getSaticFailed(getSaticFailed) {
  return {
    type: types.GET_SATATIC_INFO_FAILED,
    getSaticFailed,
  };
}
