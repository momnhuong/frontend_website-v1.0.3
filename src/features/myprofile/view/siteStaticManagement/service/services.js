import * as appAPIs from "../../../../../api/appAPIs";
import * as actions from "./actions";
import { loading, offLoading } from "../../../../../app/services";
import { LOADING } from "../../../../../constants/config";

export {getstaticInfo, updateStatic };

function getstaticInfo() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .staticInfo()
        .then((res) => {
          console.log("getstaticInfo", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.getSaticSuccess(res));
          } else {
            dispatch(actions.getSaticFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

function updateStatic(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .editstaticInfo(data)
        .then((res) => {
          console.log("editstaticInfo", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.siteStaticSuccess(res));
          } else {
            dispatch(actions.siteStaticFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
