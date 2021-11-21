import * as appAPIs from "../../../../../api/appAPIs";
import * as actions from "./actions";
import { loading, offLoading } from "../../../../../app/services";
import { LOADING } from "../../../../../constants/config";
export { getListOrderOfCustomerUser, getdetailOrderOfCustomerUser };
function getListOrderOfCustomerUser(searchStr,page, page_size) {
 
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .orderOfCustomerUser(searchStr,page, page_size)
        .then((res) => {
          console.log("orderOfCustomerUser", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listOrderSuccess(res));
          } else {
            dispatch(actions.listOrderFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getdetailOrderOfCustomerUser(order_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .detailOrderOfCustomerUser(order_id)
        .then((res) => {
          console.log("detailOrderOfCustomerUser", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailOrderOfCustomerSuccess(res));
          } else {
            dispatch(actions.detailOrderOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
