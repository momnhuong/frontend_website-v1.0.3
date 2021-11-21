import * as types from "./actionTypes";

export {
  getaccount,
  getaccountsuccess,
  getaccountfailed,
  updateprofile,
  updateprofilesuccess,
  updateprofilefailed,
};

function getaccount(data) {
  return {
    type: types.GET_PROFILE,
    data,
  };
}
function getaccountsuccess(dataSuccess) {
  return {
    type: types.GET_PROFILE_SUCCESS,
    dataSuccess,
  };
}
function getaccountfailed(dataFailed) {
  return {
    type: types.GET_PROFILE_FAILED,
    dataFailed,
  };
}
function updateprofile(updateProfile) {
  return {
    type: types.UPDATE_PROFILE,
    updateProfile,
  };
}
function updateprofilesuccess(updateProfileSuccess) {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    updateProfileSuccess,
  };
}
function updateprofilefailed(updateProfileFailed) {
  return {
    type: types.UPDATE_PROFILE_FAILED,
    updateProfileFailed,
  };
}
