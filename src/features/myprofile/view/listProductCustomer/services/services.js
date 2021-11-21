import * as appAPIs from "../../../../../api/appAPIs";
import * as actions from "./actions";
import { loading, offLoading } from "../../../../../app/services";
import { LOADING } from "../../../../../constants/config";

export {
  getListProductOfCustomer,
  getDetailProductOfCustomer,
  delProductOfCustomer,
  postProductOfCustomer,
  createProductOfCustomer,
  updateStatusProductOfCustomer,
  detailProductCustomer,
  getListContractOfCustomer,
  updateItemproductOfCustomer
};


function updateItemproductOfCustomer(product_of_customer_id,data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .updateItemproductOfCustomer(product_of_customer_id,data)
        .then((res) => {
          console.log("updateItemproductOfCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.updatedetailProductOfCustomerSuccess(res));
          } else {
            dispatch(actions.updatedetailProductOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getListContractOfCustomer(customer_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getListContractOfCustomer(customer_id)
        .then((res) => {
          console.log("getListContractOfCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listContractOfCustomerSuccess(res));
          } else {
            dispatch(actions.listContractOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getListProductOfCustomer(page, page_size) {
  let pagenew, page_sizenew;
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .listProductOfCustomer(pagenew, page_sizenew)
        .then((res) => {
          console.log("getListProductOfCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listProductCustomerSuccess(res));
          } else {
            dispatch(actions.listProductCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

function getDetailProductOfCustomer(order_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .listProductCustomer(order_id)
        .then((res) => {
          console.log("detailProductCustomerSuccess", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailProductCustomerSuccess(res));
          } else {
            dispatch(actions.detailProductCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function detailProductCustomer(product_of_customer_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .detailProductCustomer(product_of_customer_id)
        .then((res) => {
          console.log("delProductCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailProductOfCustomerSuccess(res));
          } else {
            dispatch(actions.detailProductOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function delProductOfCustomer(order_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .delProductCustomer(order_id)
        .then((res) => {
          console.log("delProductCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.delProductCustomerSuccess(res));
          } else {
            dispatch(actions.delProductCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function postProductOfCustomer(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .postProductOfCustomer(data)
        .then((res) => {
          console.log("postProductOfCustomer", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.postProductOfCustomerSuccess(res));
            dispatch(actions.listProductCustomerSuccess());
          } else {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.postProductOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function createProductOfCustomer(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .createProductOfCustomer(data)
        .then((res) => {
          console.log("createProductOfCustomer", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.createProductOfCustomerSuccess(res));
          } else {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.createProductOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function updateStatusProductOfCustomer(product_of_customer_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .updateStatusProductOfCustomer(product_of_customer_id)
        .then((res) => {
          console.log("updateStatusProductOfCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.updateProductOfCustomerSuccess(res));
          } else {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.updateProductOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}