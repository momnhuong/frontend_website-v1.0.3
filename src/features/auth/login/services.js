import * as appActions from "../../../app/actions";
import { history } from "../../../store/history";
import * as alertAction from "../../notification/services";
import { loading, offLoading } from "../../../app/services";
import { LOADING } from "../../../constants/config";
import _ from "lodash";
import * as appAPIs from "../../../api/appAPIs";
import { errorTimeout } from "../../../constants/common";
// import messaging from "../../../firebaseConfig";
import * as actions from "./actions";

export {
  login,
  logout,
  staticInfo,
  shoppingCart,
  updateFcmToken,
  countAlertOfCustomer,
};

function login(data) {
  return (dispatch) => {
    let param = {
      username: data.username,
      password: data.password,
    };
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .login(param)
        .then((res) => {
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(appActions.loginSuccess(res));
            dispatch(actions.staticInfoSuccess());
            dispatch(alertAction.getListAlert());

            // window.location.reload();
            if (res.data.first_login) {
              history.push("/chage-pass");
              window.location.reload();
            } else {
              history.push("/");
              window.location.reload();
            }
          }
          resolve(res);
        })
        .catch((error) => errorTimeout(dispatch, error));
    });
  };
}
function updateFcmToken(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .updateFcmToken(data)
        .then((res) => {
          console.log("updateFcmToken", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.updateFcmTokenSuccess(res));
          } else {
            dispatch(actions.updateFcmTokenFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function logout() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("SHOPPING_CARTS");
      localStorage.removeItem("persist:root");
      dispatch(appActions.logoutSuccess());
    });
  };
}
function staticInfo() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .staticInfo()
        .then((res) => {
          console.log("staticInfo", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.staticInfoSuccess(res));
          } else {
            dispatch(actions.staticInfoFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function countAlertOfCustomer() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .countAlertOfCustomer()
        .then((res) => {
          console.log("countAlertOfCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.countAlertOfCustomerSuccess(res));
          } else {
            dispatch(actions.countAlertOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function shoppingCart(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(actions.shoppingCart(data));
      resolve(data);
    });
  };
}
