import * as appAPIs from "../../../api/appAPIs";
import * as actions from "./actions";
import { history } from "../../../store/history";
import { loading, offLoading } from "../../../app/services";
import { LOADING } from "../../../constants/config";

export { emailRecover };

function emailRecover(data) {
  return (dispatch) => {
    let param = {
      email: data.email,
    };
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .emailRecover(param)
        .then((res) => {
          console.log("emailRecover", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.recoversuccess(res));
            history.push("/login");
            window.location.reload();
          } else {
            dispatch(actions.recoverfailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
