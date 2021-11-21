import * as types from "./actionTypes";
const initialState = {
  listContractAdmin: [],
  listContractAdminSuccess: [],
  listContractAdminFailed: {},
  detailContractAdmin: {},
  detailContractAdminSuccess: {},
  detailContractAdminFailed: {},
};

export default function contractadmin(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_LIST_CONTRACT:
      return {
        ...state,
        listContractAdmin: action.listContract,
      };
    case types.GET_LIST_CONTRACT_SUCCESS:
      return {
        ...state,
        listContractAdminSuccess: action.listContractSuccess,
      };
    case types.GET_LIST_CONTRACT_FAILED:
      return {
        ...state,
        listContractAdminFailed: action.listContractFailed,
      };
    case types.GET_DETAIL_CONTRACT:
      return {
        ...state,
        detailContractAdmin: action.detailContract,
      };
    case types.GET_DETAIL_CONTRACT_SUCCESS:
      return {
        ...state,
        detailContractAdminSuccess: action.detailContractSuccess,
      };
    case types.GET_DETAIL_CONTRACT_FAILED:
      return {
        ...state,
        detailContractAdminFailed: action.detailContractFailed,
      };
    default:
      return state;
  }
}
