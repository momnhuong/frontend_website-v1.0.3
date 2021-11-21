import * as types from "./actionTypes";
const initialState = {
  data: null,
  dataSuccess: {},
  dataFalse: {},
};

export default function forget(state = initialState, action = {}) {
  switch (action.type) {
    case types.RESET_COMPLETE:
      return {
        ...state,
        data: action.data,
      };
    case types.RESET_COMPLETE_SUCCESS:
      return {
        ...state,
        dataSuccess: action.dataSuccess,
      };
    case types.RESET_COMPLETE_FAILED:
      return {
        ...state,
        dataFalse: action.dataFalse,
      };
    default:
      return state;
  }
}
