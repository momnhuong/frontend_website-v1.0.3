import * as appAPIs from "../../../api/appAPIs";
import * as actions from "./actions";
import { history } from "../../../store/history";
import { loading, offLoading } from "../../../app/services";
import { LOADING } from "../../../constants/config";

export { resetComplete };

function resetComplete(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .resetComplete(data)
        .then((response) => {
          if (response.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.resetcompletesuccess(response));
            history.push("/login");
            window.location.reload();
          } else {
            dispatch(actions.resetcompleteFalse(response));
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
