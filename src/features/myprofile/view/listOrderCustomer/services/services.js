import * as appAPIs from "../../../../../api/appAPIs";
import * as actions from "./actions";
import { loading, offLoading } from "../../../../../app/services";
import { LOADING } from "../../../../../constants/config";
export {
  getListOrderOfCustomer,
  getDetailOrderOfCustomer,
  delOrderOfCustomer,
  createContract,
};
function getListOrderOfCustomer(string,page,page_size) {
  let pagenew, page_sizenew;
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .listOrderOfCustomer(string,pagenew, page_sizenew)
        .then((res) => {
          console.log("getListCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listOrderCustomerSuccess(res));
          } else {
            dispatch(actions.listOrderCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

function getDetailOrderOfCustomer(order_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .detailOrderOfCustomer(order_id)
        .then((res) => {
          console.log("detailOrderOfCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailOderCustomerSuccess(res));
          } else {
            dispatch(actions.detailOderCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function delOrderOfCustomer(order_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .delOrderOfCustomer(order_id)
        .then((res) => {
          console.log("detailOrderOfCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.delOrderOfCustomerSuccess(res));
          } else {
            dispatch(actions.delOrderOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function createContract(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .createContract(data)
        .then((res) => {
          console.log("createContract", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.createContractSuccess(res));
          } else {
            dispatch(actions.createContractFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
