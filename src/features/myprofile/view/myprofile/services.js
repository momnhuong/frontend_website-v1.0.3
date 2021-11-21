import * as appAPIs from "../../../../api/appAPIs";
import * as actions from "./actions";
import { loading, offLoading } from "../../../../app/services";
import { LOADING } from "../../../../constants/config";

export { getprofile, updateProfile };

function getprofile() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getProfile()
        .then((res) => {
          console.log("getprofile", res);
          if (res.status === 200) {
            dispatch(actions.getaccountsuccess(res));
            dispatch(offLoading(LOADING.FULL));
          } else {
            dispatch(actions.getaccountfailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function updateProfile(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .updateProfile(data)
        .then((res) => {
          console.log("updateProfile", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.updateprofilesuccess(res));
          } else {
            dispatch(actions.getaccountfailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
