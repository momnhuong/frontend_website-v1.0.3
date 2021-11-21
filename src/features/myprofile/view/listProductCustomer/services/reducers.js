import * as types from "./actionTypes";
import * as action from "./actions";

const initialState = {
  listProductCustomer: [],
  listProductCustomerSuccess: [],
  listProductCustomerFailed: {},
  detailProductCustomer: {},
  detailProductCustomerSuccess: {},
  detailProductCustomerFailed: {},
  delProductOfCustomer: {},
  delProductOfCustomerSuccess: {},
  delProductOfCustomerFailed: {},
  postProductOfCustomer: {},
  postProductOfCustomerSuccess: {},
  postProductOfCustomerFailed: {},
  createProductOfCustomer: {},
  createProductOfCustomerSuccess: {},
  createProductOfCustomerFailed: {},
  updateProductOfCustomer:{},
  updateProductOfCustomerSuccess:{},
  updateProductOfCustomerFailed:{},
  detailProductOfCustomer:{},
  detailProductOfCustomerSuccess:{},
  detailProductOfCustomerFailed:{},
  listContractOfCustomer:{},
  listContractOfCustomerSuccess:{},
  listContractOfCustomerFailed:{},
  updatedetailProductOfCustomer:{},
  updatedetailProductOfCustomerSuccess:{},
  updatedetailProductOfCustomerFailed:{}
};

export default function productofcustomer(state = initialState, action = {}) {
  switch (action.type) {

    case types.UPDATE_DETAIL_PRODUCT_OF_CUSTOMER:
      return {
        ...state,
        updatedetailProductOfCustomer: action.updatedetailProductOfCustomer,
      };
    case types.UPDATE_DETAIL_PRODUCT_OF_CUSTOMER_SUCCESS:
      return {
        ...state,
        updatedetailProductOfCustomerSuccess: action.updatedetailProductOfCustomerSuccess,
      };
      case types.UPDATE_DETAIL_PRODUCT_OF_CUSTOMER_FAILED:
      return {
        ...state,
        updatedetailProductOfCustomerFailed: action.updatedetailProductOfCustomerFailed,
      };
    case types.GET_LIST_CONTRACT_OF_CUSTOMER:
      return {
        ...state,
        listContractOfCustomer: action.listContractOfCustomer,
      };
      case types.GET_LIST_CONTRACT_OF_CUSTOMER_SUCCESS:
        return {
          ...state,
          listContractOfCustomerSuccess: action.listContractOfCustomerSuccess,
        };
        case types.GET_LIST_CONTRACT_OF_CUSTOMER_FAILED:
        return {
          ...state,
          listContractOfCustomerFailed: action.listContractOfCustomerFailed,
        };
    case types.DETAIL_PRODUCT_OF_CUSTOMER:
      return {
        ...state,
        detailProductOfCustomer: action.detailProductOfCustomer,
      };
      case types.DETAIL_PRODUCT_OF_CUSTOMER_SUCCESS:
      return {
        ...state,
        detailProductOfCustomerSuccess: action.detailProductOfCustomerSuccess,
      };
      case types.DETAIL_PRODUCT_OF_CUSTOMER_FAILED:
      return {
        ...state,
        detailProductOfCustomerFailed: action.detailProductOfCustomerFailed,
      };
    case types.UPDATE_PRODUCT_OF_CUSTOMER:
      return {
        ...state,
        updateProductOfCustomer: action.updateProductOfCustomer,
      };
      case types.UPDATE_PRODUCT_OF_CUSTOMER_SUCCESS:
      return {
        ...state,
        updateProductOfCustomerSuccess: action.updateProductOfCustomerSuccess,
      };
      case types.UPDATE_PRODUCT_OF_CUSTOMER_FAILED:
      return {
        ...state,
        updateProductOfCustomerFailed: action.updateProductOfCustomerFailed,
      };
    case types.GET_LIST_PRODUCT_CUSTOMER:
      return {
        ...state,
        listProductCustomer: action.listProductCustomer,
      };
    case types.GET_LIST_PRODUCT_CUSTOMER_SUCCESS:
      return {
        ...state,
        listProductCustomerSuccess: action.listProductCustomerSuccess,
      };
    case types.GET_LIST_PRODUCT_CUSTOMER_FAILED:
      return {
        ...state,
        listProductCustomerFailed: action.listProductCustomerFailed,
      };
    case types.GET_DETAIL_PRODUCT_CUSTOMER:
      return {
        ...state,
        detailProductCustomer: action.detailProductCustomer,
      };
    case types.GET_DETAIL_PRODUCT_CUSTOMER_SUCCESS:
      console.log("types.GET_DETAIL_PRODUCT_CUSTOMER_SUCCESS", action);
      return {
        ...state,
        detailProductCustomerSuccess: action.detailProductCustomerSuccess,
      };
    case types.GET_DETAIL_PRODUCT_CUSTOMER_FAILED:
      return {
        ...state,
        detailProductCustomerFailed: action.detailProductCustomerFailed,
      };
    case types.DEL_PRODUCT_CUSTOMER:
      return {
        ...state,
        delProductOfCustomer: action.delProductOfCustomer,
      };
    case types.DEL_PRODUCT_CUSTOMER_SUCCESS:
      return {
        ...state,
        delProductOfCustomerSuccess: action.delProductOfCustomerSuccess,
      };
    case types.DEL_PRODUCT_CUSTOMER_FAILED:
      return {
        ...state,
        delProductOfCustomerFailed: action.delProductOfCustomerFailed,
      };
    case types.POST_PRODUCT_OF_CUSTOMER:
      return {
        ...state,
        postProductOfCustomer: action.postProductOfCustomer,
      };
    case types.POST_PRODUCT_OF_CUSTOMER_SUCCESS:
      return {
        ...state,
        postProductOfCustomerSuccess: action.postProductOfCustomerSuccess,
      };
    case types.POST_PRODUCT_OF_CUSTOMER_FAILED:
      return {
        ...state,
        postProductOfCustomerFailed: action.postProductOfCustomerFailed,
      };
    case types.CREATE_PRODUCT_OF_CUSTOMER: {
      return {
        ...state,
        createProductOfCustomer: action.createProductOfCustomer,
      };
    }
    case types.CREATE_PRODUCT_OF_CUSTOMER_SUCCESS: {
      return {
        ...state,
        createProductOfCustomerSuccess: action.createProductOfCustomerSuccess,
      };
    }
    case types.CREATE_PRODUCT_OF_CUSTOMER_FAILED: {
      return {
        ...state,
        createProductOfCustomerFailed: action.createProductOfCustomerFailed,
      };
    }
    default:
      return state;
  }
}
