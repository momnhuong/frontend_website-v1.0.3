import { loading, offLoading } from "../../../../../app/services";
import { LOADING } from "../../../../../constants/config";
import _ from "lodash";
import * as appAPIs from "../../../../../api/appAPIs";
import * as actions from "./actions";

export {
  getListBilling,
  detailBilling,
  createBilling,
  editBilling
};
function getListBilling(payment_status,page, page_size) {
  console.log('getListBilling',payment_status)
  let pagenew, page_sizenew;
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .getBilling(payment_status,pagenew, page_sizenew)
        .then((res) => {
          console.log("getBilling", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listBillingSuccess(res));
          } else {
            dispatch(actions.listBillingFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

function detailBilling(billing_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .getDetailBilling(billing_id)
        .then((res) => {
          console.log("getDetailBilling", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailBillingSuccess(res));
          } else {
            dispatch(actions.detailBillingFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}


function createBilling(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .createBilling(data)
        .then((res) => {
          console.log("createBilling", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.createBillingSuccess(res));
          } else {
            dispatch(actions.createBillingFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

function editBilling(billing_id,data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .editBilling(billing_id,data)
        .then((res) => {
          console.log("editBilling", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.editBillingSuccess(res));
          } else {
            dispatch(actions.editBillingFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}