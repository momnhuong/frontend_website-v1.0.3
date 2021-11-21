import * as actions from "./actions";
import * as appActions from "../../../../app/actions";

import * as appAPIs from "../../../../api/appAPIs";
import _ from "lodash";
import { loading, offLoading } from "../../../../app/services";
import { LOADING } from "../../../../constants/config";
export { changepass };

function changepass(data) {
  return (dispatch) => {
    let param = {
      oldpass: data.oldpass,
      newpass: data.newpass,
    };
    console.log("changepass", data);
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .chagePass(param)
        .then((res) => {
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.changepassSuccess(res));
            dispatch(appActions.logoutSuccess());
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
