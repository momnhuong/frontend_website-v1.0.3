import * as types from "./actionTypes";
const initialState = {
  listBilling: {},
  listBillingSuccess: {},
  listBillingFailed: {},

  detailBilling:{},
  detailBillingSuccess:{},
  detailBillingFailed:{},

  createBilling:{},
  createBillingSuccess:{},
  createBillingFailed:{},

  editBilling:{},
  editBillingSuccess:{},
  editBillingFailed:{}

};

export default function billing(state = initialState, action = {}) {
  switch (action.type) {
    case types.LIST_BILLING:
      return {
        ...state,
        listBilling: action.listBilling,
      };
    case types.LIST_BILLING_SUCCESS:
      return {
        ...state,
        listBillingSuccess: action.listBillingSuccess,
      };
    case types.LIST_BILLING_FAILED:
      return {
        ...state,
        listBillingFailed: action.listBillingFailed,
      };

    case types.DETAIL_BILLING:
      return {
        ...state,
        detailBilling: action.detailBilling,
      };
    case types.DETAIL_BILLING_SUCCESS:
      return {
        ...state,
        detailBillingSuccess: action.detailBillingSuccess,
      };
    case types.DETAIL_BILLING_FAILED:
      return {
        ...state,
        detailBillingFailed: action.detailBillingFailed,
      };

    case types.CREATE_BILLING:
      return {
        ...state,
        createBilling: action.createBilling,
      };
    case types.CREATE_BILLING_SUCCESS:
      return {
        ...state,
        createBillingSuccess: action.createBillingSuccess,
      };
    case types.CREATE_BILLING_FAILED:
      return {
        ...state,
        createBillingFailed: action.createBillingFailed,
      };

    case types.EDIT_BILLING:
      return {
        ...state,
        editBilling: action.editBilling,
      };
    case types.EDIT_BILLING_SUCCESS:
      return {
        ...state,
        editBillingSuccess: action.editBillingSuccess,
      };
    case types.EDIT_BILLING_FAILED:
      return {
        ...state,
        editBillingFailed: action.editBillingFailed,
      };

    default:
      return state;
  }
}
