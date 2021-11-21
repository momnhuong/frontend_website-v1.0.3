import * as appAPIs from "../../../../../api/appAPIs";
import * as actions from "./actions";
import { loading, offLoading } from "../../../../../app/services";
import { LOADING } from "../../../../../constants/config";

export { getlistContractAdmin, detailContractAdmin };

function getlistContractAdmin(page, page_size) {
  let pagenew, page_sizenew;
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getListContract(pagenew, page_sizenew)
        .then((res) => {
          console.log("getListContract", res);
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
function detailContractAdmin(contract_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .detailContractAdmin(contract_id)
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
