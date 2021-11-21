import * as types from "./actionTypes";

export { changepass, changepassSuccess, changepassFalse };

function changepass(data) {
  return {
    type: types.CHANGE_PASS,
    data,
  };
}
function changepassSuccess(dataChagePassSuccess) {
  return {
    type: types.CHANGE_PASS_SUCCESS,
    dataChagePassSuccess,
  };
}
function changepassFalse(changepassFalse) {
  return {
    type: types.CHANGE_PASS_FAILED,
    changepassFalse,
  };
}
