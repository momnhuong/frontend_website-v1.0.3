import * as appAPIs from "../../api/appAPIs";
import { offLoading } from "../../app/services";
import { LOADING } from "../../constants/config";
import * as actions from "./actions";

export { getListAlert, putAlert };
function getListAlert(read, page, page_size) {
  let pagenew, page_sizenew;
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // dispatch(loading(LOADING.FULL));

      appAPIs
        .getAlertAdmin(read, pagenew, page_sizenew)
        .then((res) => {
          console.log("getAlertAdmin", res);
          if (res.status === 200) {
            // dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listAlertAdminSuccess(res));
          } else {
            dispatch(actions.listAlertAdminFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function putAlert(alert_id, data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // dispatch(loading(LOADING.FULL));
      appAPIs
        .putAlert(alert_id, data)
        .then((res) => {
          console.log("putAlert", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.alertReadSuccess(res));
          } else {
            dispatch(actions.alertReadFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
