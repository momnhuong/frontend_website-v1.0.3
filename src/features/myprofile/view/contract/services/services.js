import * as appAPIs from "../../../../../api/appAPIs";
import * as actions from "./actions";
import { loading, offLoading } from "../../../../../app/services";
import { LOADING } from "../../../../../constants/config";

export { getlistContract, detailContract };

function getlistContract(searchStr, page,page_size) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .listContract(searchStr, page,page_size)
        .then((res) => {
          console.log("listContractapi", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listContractSuccess(res));
          } else {
            dispatch(actions.listContractFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function detailContract(contract_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .detailContract(contract_id)
        .then((res) => {
          console.log("detailContract", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailContractSuccess(res));
          } else {
            dispatch(actions.detailContractFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
