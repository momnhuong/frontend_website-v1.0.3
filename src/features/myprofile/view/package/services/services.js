import * as appAPIs from "../../../../../api/appAPIs";
import * as actions from "./actions";
import { loading, offLoading } from "../../../../../app/services";
import { LOADING } from "../../../../../constants/config";
export {
  addPackage,
  getListPackage,
  detailPackage,
  updatePackage,
  getListPackageProduct,
  updateStatus
};

function getListPackage(searchStr,page, page_size) {
  let pagenew, page_sizenew;
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getListPackage(searchStr,pagenew, page_sizenew)
        .then((res) => {
          console.log("getListPackage", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listPackageSuccess(res));
          } else {
            dispatch(actions.listPackageFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function addPackage(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .addPackage(data)
        .then((res) => {
          console.log("addPackage", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.addPackageSuccess(res));
          } else {
            dispatch(actions.addPackageFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function detailPackage(package_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .detailPackage(package_id)
        .then((res) => {
          console.log("detailPackage", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailPackageSuccess(res));
          } else {
            dispatch(actions.detailPackageFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function updatePackage(package_id, data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .editPackage(package_id, data)
        .then((res) => {
          console.log("editPackage", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.editPackageSuccess(res));
          } else {
            dispatch(actions.editPackageFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getListPackageProduct(product_id, page, page_size) {
  let pagenew, page_sizenew;
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getListPackageProduct(product_id, pagenew, page_sizenew)
        .then((res) => {
          console.log("getListPackageProduct", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listPackageProductSuccess(res));
          } else {
            dispatch(actions.listPackageProductFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function updateStatus(package_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .updatePackage(package_id)
        .then((res) => {
          console.log("updatePackage", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.updateStatusPackageSuccess(res));
          } else {
            dispatch(actions.updateStatusPackageFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
}