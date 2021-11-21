import * as appAPIs from "../../../../../api/appAPIs";
import * as actions from "./actions";
import { loading, offLoading } from "../../../../../app/services";
import { LOADING } from "../../../../../constants/config";

export {
  getlistCatelog,
  delCatelog,
  addCatelog,
  getDetailCatelog,
  updateCatalog,
};

function getlistCatelog(page, page_size) {
  let pagenew, page_sizenew;
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getCatelog(pagenew, page_sizenew)
        .then((res) => {
          // console.log("getCatelog", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listCatelogSuccess(res));
          } else {
            dispatch(actions.listCatelogFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function delCatelog(catelog_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .delCatelog(catelog_id)
        .then((res) => {
          console.log("delCatelog", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.delCatelogSuccess(res));
          } else {
            dispatch(actions.delCatelogFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function addCatelog(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .addCatelog(data)
        .then((res) => {
          console.log("addCatelog", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.addCatelogSuccess(res));
          } else {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.addCatelogFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getDetailCatelog(catelog_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .detailCatelog(catelog_id)
        .then((res) => {
          console.log("detailCatelog", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailCatelogSuccess(res));
          } else {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailCatelogFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function updateCatalog(catelog_id, data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .updateCatelog(catelog_id, data)
        .then((res) => {
          console.log("updateCatelog", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.updateCatelogSuccess(res));
          } else {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.updateCatelogFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
