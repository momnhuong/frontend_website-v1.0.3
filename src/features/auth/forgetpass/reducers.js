import * as types from "./actionTypes";
const initialState = {
  data: null,
  dataSuccess: {},
  dataFailed: {},
};

export default function emailRecover(state = initialState, action = {}) {
  switch (action.type) {
    case types.EMAIL_RECOVER:
      return {
        ...state,
        data: action.data,
      };
    case types.EMAIL_RECOVER_SUCCESS:
      return {
        ...state,
        dataSuccess: action.dataSuccess,
      };
    case types.EMAIL_RECOVER_FAILED:
      return {
        ...state,
        dataFailed: action.dataFailed,
      };
    default:
      return state;
  }
}
