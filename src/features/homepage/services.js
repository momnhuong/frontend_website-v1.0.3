import { loading, offLoading } from "../../app/services";
import { LOADING } from "../../constants/config";
import _ from "lodash";
import * as appAPIs from "../../api/appAPIs";
import * as actions from "./actions";

export {
  getCustomerInfo,
  getCountHomeAdmin,
  getCountHomeCustomer,
  countTicketAdmin,
  countTicketCustomer,
  getlistProductServicesAdmin,
  getlistProductServicesCustomer,
  listCustomerOfProductAdminHome,
  packageofOfProductCustomerHome,
  getBalance,
  vCloudDirectorSessions,
};
function getCustomerInfo() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .infoCustomer()
        .then((res) => {
          console.log("infoCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.infoCustomerSuccess(res));
          } else {
            dispatch(actions.infoCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getCountHomeAdmin() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .countPackageAdmin()
        .then((res) => {
          // console.log("countPackageAdmin", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.countOfAdminSuccess(res));
          } else {
            dispatch(actions.countOfAdminFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getCountHomeCustomer() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .countPackageCustomer()
        .then((res) => {
          // console.log("countPackageAdmin", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.countOfCustomerSuccess(res));
          } else {
            dispatch(actions.countOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function countTicketAdmin() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .countTicketAdmin()
        .then((res) => {
          // console.log("countTicketAdmin", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.countTicketAdminSuccess(res));
          } else {
            dispatch(actions.countTicketAdminFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function countTicketCustomer() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .countTicketCustomer()
        .then((res) => {
          console.log("countTicketCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.countTicketCustomerSuccess(res));
          } else {
            dispatch(actions.countTicketCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getlistProductServicesAdmin() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .getlistProductServicesAdmin()
        .then((res) => {
          // console.log("getlistProductServicesAdmin", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listProductCustomerServicesAdminSuccess(res));
          } else {
            dispatch(actions.listProductCustomerServicesAdminFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getlistProductServicesCustomer() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .getlistProductServicesCustomer()
        .then((res) => {
          console.log("getlistProductServicesCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listProductCustomerServicesCustomerSuccess(res));
          } else {
            dispatch(actions.listProductCustomerServicesCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function listCustomerOfProductAdminHome(product_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .listCustomerOfProductAdminHome(product_id)
        .then((res) => {
          console.log("getlistProductServicesCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listCustomerOfProductAdminSuccess(res));
          } else {
            dispatch(actions.listCustomerOfProductAdminFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function packageofOfProductCustomerHome(product_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .packageofOfProductCustomerHome(product_id)
        .then((res) => {
          console.log("getlistProductServicesCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listPackageofProductCustomerSuccess(res));
          } else {
            dispatch(actions.listPackageofProductCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getBalance() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getBalance()
        .then((res) => {
          console.log("getBalance", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.getBalanceSuccess(res));
          } else {
            dispatch(actions.getBalanceFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

function vCloudDirectorSessions() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      appAPIs
        .vCloudDirectorSessions()
        .then((res) => {
          console.log("vCloudDirectorSessions", res);
        })
        .catch((error) => {
          console.log("vCloudDirectorSessions error", error);
          reject(error);
        });
    });
  };
}
