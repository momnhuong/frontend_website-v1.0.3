import * as types from "./actionTypes";

export { recover, recoversuccess, recoverfailed };

function recover(data) {
  return {
    type: types.EMAIL_RECOVER,
    data,
  };
}
function recoversuccess(dataSuccess) {
  return {
    type: types.EMAIL_RECOVER_SUCCESS,
    dataSuccess,
  };
}
function recoverfailed(dataFailed) {
  return {
    type: types.EMAIL_RECOVER_FAILED,
    dataFailed,
  };
}
