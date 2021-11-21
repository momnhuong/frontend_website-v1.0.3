import * as types from "./actionTypes";
import * as chagepassConstants from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  dataChagePass: {},
  dataChagePassFalse: {},
  dataChagePassSuccess: {},
  customerID: {},
});

export default function changepass(state = initialState, action) {
  switch (action.type) {
    case chagepassConstants.CHANGE_PASS:
      return {
        ...state,
        dataChagePass: {},
      };
    case chagepassConstants.CHANGE_PASS_SUCCESS:
      return {
        ...state,
        dataChagePassSuccess: action.dataChagePassSuccess,
      };
    case chagepassConstants.CHANGE_PASS_FAILED:
      return {
        ...state,
        dataChagePassFalse: action.changepassFalse,
      };
    default:
      return state;
  }
}
