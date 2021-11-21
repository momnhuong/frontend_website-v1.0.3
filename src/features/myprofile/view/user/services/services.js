import * as appAPIs from "../../../../../api/appAPIs";
import * as actions from "./actions";
import { loading, offLoading } from "../../../../../app/services";
import { LOADING } from "../../../../../constants/config";
import { history } from "../../../../../store/history";
import { errorTimeout } from "../../../../../constants/common";
export {
  getListCustomer,
  getDetailCustommer,
  editDetailCustomer,
  delCustomer,
  getListCustomersAccount,
  getRule,
  updateCustomerAccount,
  delCustomerAccount,
  getListAccountOfCustomer,
  createCustomer,
  createCustomerAccount,
  detailAccountCustomer,
};

function getListCustomer(custome_name, page, page_size) {
  let pagenew, page_sizenew, custome_namenew;
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  custome_namenew = custome_name === "" ? "" : custome_name;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getListCustomers(custome_name, page, page_size)
        .then((res) => {
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.getlistcustomersuccess(res));
          } else {
            dispatch(actions.getlistcustomerfailed(res));
            errorTimeout(dispatch, res.data.detail);
          }
          resolve(res);
        })
        .catch((error) => errorTimeout(dispatch, error));
    });
  };
}

function getDetailCustommer(data) {
  // console.log("services", data);
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getDetailCustomer(data)
        .then((res) => {
          // console.log("getDetailCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailCustomerSuccess(res));
            resolve(res);
          } else {
            dispatch(actions.detailCustomerFailed(res));
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function editDetailCustomer(customer_id, data) {
  console.log("editDetailCustomer", customer_id, data);
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .editDetailCustomer(customer_id, data)
        .then((res) => {
          console.log("editDetailCustomer", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.editCustomerSuccess(res));
          } else {
            dispatch(actions.editCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function delCustomer(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .delCustomer(data)
        .then((res) => {
          console.log("delCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.delCustomerSuccess(res));
          } else {
            dispatch(actions.delCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getListCustomersAccount(page, page_size) {
  let pagenew, page_sizenew;
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getListCustomersAccount(pagenew, page_sizenew)
        .then((res) => {
          console.log("getListCustomersAccount", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listCustomerAccountSuccess(res));
          } else {
            dispatch(actions.listCustomerAccountFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getRule() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getRole()
        .then((res) => {
          console.log("getRole", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.getRoleSuccess(res));
          } else {
            dispatch(actions.getRoleFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function updateCustomerAccount(id, values) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .updateCustomerAccount(id, values)
        .then((res) => {
          console.log("updateCustomerAccount", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailCustomerAccountSuccess(res));
          } else {
            dispatch(actions.detailCustomerAccountFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function delCustomerAccount(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .delCustomerAccount(data)
        .then((res) => {
          console.log("delCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.delCustomerAccountSuccess(res));
          } else {
            dispatch(actions.delCustomerAccountFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getListAccountOfCustomer(customer_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getListAccountOfCustomer(customer_id)
        .then((res) => {
          console.log("getListAccountOfCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listAccountofCustomerSuccess(res));
          } else {
            dispatch(actions.listAccountofCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function createCustomer(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .createCustomer(data)
        .then((res) => {
          console.log("createCustomer", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.addCustomerSuccess(res));
          } else {
            dispatch(actions.addCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function createCustomerAccount(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .createCustomerAccount(data)
        .then((res) => {
          console.log("createCustomer", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.addCustomerAccountSuccess(res));
          } else {
            dispatch(actions.addCustomerAccountFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function detailAccountCustomer(account_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getDetailAccountOfCustomer(account_id)
        .then((res) => {
          console.log("getDetailAccountOfCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailAccountCustomerSuccess(res));
          } else {
            dispatch(actions.detailAccountCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
