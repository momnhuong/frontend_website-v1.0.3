import * as types from "./actionTypes";
const initialState = {
  listCatelog: [],
  listCatelogSuccess: [],
  listCatelogFailed: {},
  delCatelog: {},
  delCatelogSuccess: {},
  delCatelogFailed: {},
  addCatelog: {},
  addCatelogSuccess: {},
  addCatelogFailed: {},
  detailCatelog: {},
  detailCatelogSuccess: {},
  detailCatelogFailed: {},
  updateCatelog: {},
  updateCatelogSuccess: {},
  updateCatelogFailed: {},
};

export default function catelog(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_LIST_CATELOG:
      return {
        ...state,
        listCatelog: action.listCatelog,
      };
    case types.GET_LIST_CATELOG_SUCCESS:
      return {
        ...state,
        listCatelogSuccess: action.listCatelogSuccess,
      };
    case types.GET_LIST_CATELOG_FAILED:
      return {
        ...state,
        listCatelogFailed: action.listCatelogFailed,
      };
    case types.DEL_LIST_CATELOG:
      return {
        ...state,
        delCatelog: action.delCatelog,
      };
    case types.DEL_LIST_CATELOG_SUCCESS:
      return {
        ...state,
        delCatelogSuccess: action.delCatelogSuccess,
      };
    case types.DEL_LIST_CATELOG_FAILED:
      return {
        ...state,
        delCatelogFailed: action.delCatelogFailed,
      };
    case types.ADD_LIST_CATELOG:
      return {
        ...state,
        addCatelog: action.addCatelog,
      };
    case types.ADD_LIST_CATELOG_SUCCESS:
      return {
        ...state,
        addCatelogSuccess: action.addCatelogSuccess,
      };
    case types.ADD_LIST_CATELOG_FAILED:
      return {
        ...state,
        addCatelogFailed: action.addCatelogFailed,
      };
    case types.DETAIL_CATELOG:
      return {
        ...state,
        detailCatelog: action.detailCatelog,
      };
    case types.DETAIL_CATELOG_SUCCESS:
      return {
        ...state,
        detailCatelogSuccess: action.detailCatelogSuccess,
      };
    case types.DETAIL_CATELOG_FAILED:
      return {
        ...state,
        detailCatelogFailed: action.detailCatelogFailed,
      };
    case types.UPDATE_CATELOG:
      return {
        ...state,
        updateCatelog: action.updateCatelog,
      };
    case types.UPDATE_CATELOG_SUCCESS:
      return {
        ...state,
        updateCatelogSuccess: action.updateCatelogSuccess,
      };
    case types.UPDATE_CATELOG_FAILED:
      return {
        ...state,
        updateCatelogFailed: action.updateCatelogFailed,
      };
    default:
      return state;
  }
}
