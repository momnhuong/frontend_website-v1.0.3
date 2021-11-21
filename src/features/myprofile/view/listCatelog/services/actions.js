import * as types from "./actionTypes";

export {
  listCatelog,
  listCatelogSuccess,
  listCatelogFailed,
  delCatelog,
  delCatelogSuccess,
  delCatelogFailed,
  addCatelog,
  addCatelogSuccess,
  addCatelogFailed,
  detailCatelog,
  detailCatelogSuccess,
  detailCatelogFailed,
  updateCatelog,
  updateCatelogSuccess,
  updateCatelogFailed,
};

function listCatelog(listCatelog) {
  return {
    type: types.GET_LIST_CATELOG,
    listCatelog,
  };
}
function listCatelogSuccess(listCatelogSuccess) {
  return {
    type: types.GET_LIST_CATELOG_SUCCESS,
    listCatelogSuccess,
  };
}
function listCatelogFailed(listCatelogFailed) {
  return {
    type: types.GET_LIST_CATELOG_FAILED,
    listCatelogFailed,
  };
}
function delCatelog(delCatelog) {
  return {
    type: types.DEL_LIST_CATELOG,
    delCatelog,
  };
}
function delCatelogSuccess(delCatelogSuccess) {
  return {
    type: types.DEL_LIST_CATELOG_SUCCESS,
    delCatelogSuccess,
  };
}
function delCatelogFailed(delCatelogFailed) {
  return {
    type: types.DEL_LIST_CATELOG_FAILED,
    delCatelogFailed,
  };
}
function addCatelog(addCatelog) {
  return {
    type: types.ADD_LIST_CATELOG,
    addCatelog,
  };
}
function addCatelogSuccess(addCatelogSuccess) {
  return {
    type: types.ADD_LIST_CATELOG_SUCCESS,
    addCatelogSuccess,
  };
}
function addCatelogFailed(addCatelogFailed) {
  return {
    type: types.ADD_LIST_CATELOG_FAILED,
    addCatelogFailed,
  };
}
function detailCatelog(detailCatelog) {
  return {
    type: types.DETAIL_CATELOG,
    detailCatelog,
  };
}
function detailCatelogSuccess(detailCatelogSuccess) {
  return {
    type: types.DETAIL_CATELOG_SUCCESS,
    detailCatelogSuccess,
  };
}
function detailCatelogFailed(detailCatelogFailed) {
  return {
    type: types.DETAIL_CATELOG_FAILED,
    detailCatelogFailed,
  };
}
function updateCatelog(updateCatelog) {
  return {
    type: types.UPDATE_CATELOG,
    updateCatelog,
  };
}
function updateCatelogSuccess(updateCatelogSuccess) {
  return {
    type: types.UPDATE_CATELOG_SUCCESS,
    updateCatelogSuccess,
  };
}
function updateCatelogFailed(updateCatelogFailed) {
  return {
    type: types.UPDATE_CATELOG_FAILED,
    updateCatelogFailed,
  };
}
