import * as types from "./actionTypes";

export {
  listContract,
  listContractSuccess,
  listContractFailed,
  detailContract,
  detailContractSuccess,
  detailContractFailed,
};

function listContract(listContract) {
  return {
    type: types.GET_LIST_CONTRACT,
    listContract,
  };
}
function listContractSuccess(listContractSuccess) {
  return {
    type: types.GET_LIST_CONTRACT_SUCCESS,
    listContractSuccess,
  };
}
function listContractFailed(listContractFailed) {
  return {
    type: types.GET_LIST_CONTRACT_FAILED,
    listContractFailed,
  };
}
function detailContract(detailContract) {
  return {
    type: types.GET_DETAIL_CONTRACT,
    detailContract,
  };
}
function detailContractSuccess(detailContractSuccess) {
  return {
    type: types.GET_DETAIL_CONTRACT_SUCCESS,
    detailContractSuccess,
  };
}
function detailContractFailed(detailContractFailed) {
  return {
    type: types.GET_DETAIL_CONTRACT_FAILED,
    detailContractFailed,
  };
}
