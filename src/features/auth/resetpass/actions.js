import * as types from "./actionTypes";

export { resetcomplete, resetcompletesuccess, resetcompleteFalse };

function resetcomplete(data) {
  return {
    type: types.RESET_COMPLETE,
    data,
  };
}
function resetcompletesuccess(dataSuccess) {
  return {
    type: types.RESET_COMPLETE_SUCCESS,
    dataSuccess,
  };
}
function resetcompleteFalse(dataFalse) {
  return {
    type: types.RESET_COMPLETE_FAILED,
    dataFalse,
  };
}
