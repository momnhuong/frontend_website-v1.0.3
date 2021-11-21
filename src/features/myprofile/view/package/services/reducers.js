import * as types from "./actionTypes";
const initialState = {
  addPackage: null,
  addPackageSuccess: {},
  addPackageFailed: {},
  listPackage: null,
  listPackageSuccess: {},
  listPackageFailed: {},
  detailPackage: null,
  detailPackageSuccess: {},
  detailPackageFailed: {},
  editPackage: {},
  editPackageSuccess: {},
  editPackageFailed: {},
  listPackageProduct: null,
  listPackageProductSuccess: {},
  listPackageProductFailed: {},
  updateStatusPackage: {},
  updateStatusPackageSuccess:{},
  updateStatusPackageFailed:{}
};

export default function packages(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_PACKAGE:
      return {
        ...state,
        updateStatusPackage: action.updateStatusPackage,
      };
      case types.UPDATE_PACKAGE_SUCCESS:
      return {
        ...state,
        updateStatusPackageSuccess: action.updateStatusPackageSuccess,
      };
      case types.UPDATE_PACKAGE_FAILED:
      return {
        ...state,
        updateStatusPackageFailed: action.updateStatusPackageFailed,
      };
    case types.ADD_PACKAGE:
      return {
        ...state,
        addPackage: action.addPackage,
      };
    case types.ADD_PACKAGE_SUCCESS:
      return {
        ...state,
        addPackageSuccess: action.addPackageSuccess,
      };
    case types.ADD_PACKAGE_FAILED:
      return {
        ...state,
        addPackageFailed: action.addPackageFailed,
      };
    case types.GET_LIST_PACKAGE:
      return {
        ...state,
        listPackage: action.listPackage,
      };
    case types.GET_LIST_PACKAGE_SUCCESS:
      return {
        ...state,
        listPackageSuccess: action.listPackageSuccess,
      };
    case types.GET_LIST_PACKAGE_FAILED:
      return {
        ...state,
        listPackageFailed: action.listPackageFailed,
      };
    case types.DETAIL_PACKAGE:
      return {
        ...state,
        detailPackage: action.detailPackage,
      };
    case types.DETAIL_PACKAGE_SUCCESS:
      return {
        ...state,
        detailPackageSuccess: action.detailPackageSuccess,
      };
    case types.DETAIL_PACKAGE_FAILED:
      return {
        ...state,
        detailPackageFailed: action.detailPackageFailed,
      };
    case types.EDIT_PACKAGE:
      return {
        ...state,
        editPackage: action.editPackage,
      };
    case types.EDIT_PACKAGE_SUCCESS:
      return {
        ...state,
        editPackageSuccess: action.editPackageSuccess,
      };
    case types.EDIT_PACKAGE_FAILED:
      return {
        ...state,
        editPackageFailed: action.editPackageFailed,
      };
    case types.LIST_PACKAGE_PRODUCT:
      return {
        ...state,
        listPackageProduct: action.listPackageProduct,
      };
    case types.LIST_PACKAGE_PRODUCT_SUCCESS:
      return {
        ...state,
        listPackageProductSuccess: action.listPackageProductSuccess,
      };
    case types.LIST_PACKAGE_PRODUCT_FAILED:
      return {
        ...state,
        listPackageProductFailed: action.listPackageProductFailed,
      };
    default:
      return state;
  }
}
