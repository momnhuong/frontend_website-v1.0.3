import * as appActions from "../../../app/actions";
import { history } from "../../../store/history";
import { loading, offLoading } from "../../../app/services";
import { LOADING } from "../../../constants/config";
import * as actionApps from "../../../app/actions";
import _ from "lodash";
import * as appAPIs from "../../../api/appAPIs";
import * as actions from "./actions";

export {
  getListProduct,
  getDetailProduct,
  editProduct,
  delProduct,
  createProduct,
  getListProductOfCustomer,
  getListCatelog,
  getProductOfCatelog,
  createOrder,
};
function getListProduct(searchStr, page, page_size) {
  let pagenew, page_sizenew;
  console.log("page_size", page_size);
  pagenew = page === undefined ? 1 : page;
  page_sizenew = page_size === undefined ? 10 : page_size;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .getListProducts(searchStr, pagenew, page_sizenew)
        .then((res) => {
          console.log("getListProduct", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listProductSuccess(res));
          } else {
            dispatch(actions.listProductFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getDetailProduct(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getDetailProduct(data)
        .then((res) => {
          console.log("getDetailProduct", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.detailProductSuccess(res));
          } else {
            dispatch(actions.detailProductFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function editProduct(product_id, data) {
  console.log("editDetailCustomer", product_id, data);
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .editProduct(product_id, data)
        .then((res) => {
          console.log("editProduct", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.editProductSuccess(res));
          } else {
            dispatch(actions.editProductFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function delProduct(product_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .delProduct(product_id)
        .then((res) => {
          console.log("delProduct", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.delProductSuccess(res));
          } else {
            dispatch(actions.delProductFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function createProduct(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .createProduct(data)
        .then((res) => {
          console.log("createProduct", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.createProductSuccess(res));
          } else {
            dispatch(actions.createProductFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getListProductOfCustomer(customer_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));

      appAPIs
        .getProductOfCustomer(customer_id)
        .then((res) => {
          console.log("getProductOfCustomer", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listProductOfCustomerSuccess(res));
          } else {
            dispatch(actions.listProductOfCustomerFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function getListCatelog(page, page_size) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getCatalog(page, page_size)
        .then((res) => {
          console.log("getCatalog", res);
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
function getProductOfCatelog(catelog_id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .getProductOfCatelog(catelog_id)
        .then((res) => {
          console.log("catelog_id", res);
          if (res.status === 200) {
            dispatch(offLoading(LOADING.FULL));
            dispatch(actions.listProductOfCatelogSuccess(res));
          } else {
            dispatch(actions.listProductOfCatelogFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
function createOrder(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loading(LOADING.FULL));
      appAPIs
        .createOrder(data)
        .then((res) => {
          console.log("createOrder", res);
          if (res.status === 201) {
            dispatch(offLoading(LOADING.FULL));
            actionApps.shoppingCartFailed();
            localStorage.removeItem("SHOPPING_CARTS");
          } else {
            dispatch(actions.createOrderFailed(res));
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
