import * as types from "./actionTypes";
const initialState = {
  listContract: [],
  listContractSuccess: [],
  listContractFailed: {},
  detailContract: {},
  detailContractSuccess: {},
  detailContractFailed: {},
};

export default function contract(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_LIST_CONTRACT:
      return {
        ...state,
        listContract: action.listContract,
      };
    case types.GET_LIST_CONTRACT_SUCCESS:
      return {
        ...state,
        listContractSuccess: action.listContractSuccess,
      };
    case types.GET_LIST_CONTRACT_FAILED:
      return {
        ...state,
        listContractFailed: action.listContractFailed,
      };
    case types.GET_DETAIL_CONTRACT:
      return {
        ...state,
        detailContract: action.detailContract,
      };
    case types.GET_DETAIL_CONTRACT_SUCCESS:
      return {
        ...state,
        detailContractSuccess: action.detailContractSuccess,
      };
    case types.GET_DETAIL_CONTRACT_FAILED:
      return {
        ...state,
        detailContractFailed: action.detailContractFailed,
      };
    default:
      return state;
  }
}
