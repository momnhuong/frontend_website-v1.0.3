import * as base64 from "base-64";
import FETCH from "../utils/fetch";
import FETCH_VCLOUD from "../utils/fetch_vcloud";
import axiosCaller from "../utils/apiCaller";

import { store } from "../store";

export {
  login,
  logout,
  chagePass,
  getPost,
  createPost,
  updatePost,
  deletePost,
  detailPost,
  forgetPassPost,
  emailRecover,
  resetComplete,
  getProfile,
  updateProfile,
  getListCustomers,
  getDetailCustomer,
  editDetailCustomer,
  delCustomer,
  getListCustomersAccount,
  getRole,
  updateCustomerAccount,
  delCustomerAccount,
  staticInfo,
  editstaticInfo,
  getListProducts,
  getDetailProduct,
  createProduct,
  editProduct,
  delProduct,
  getListAccountOfCustomer,
  getDetailAccountOfCustomer,
  listOrderOfCustomer,
  detailOrderOfCustomer,
  delOrderOfCustomer,
  listProductOfCustomer,
  listProductCustomer,
  detailProductCustomer,
  updateStatusProductOfCustomer,
  delProductCustomer,
  listContract,
  detailContract,
  createCustomer,
  createCustomerAccount,
  getListContract,
  detailContractAdmin,
  postProductOfCustomer,
  createContract,
  addProductForCustomer,
  createProductOfCustomer,
  infoCustomer,
  getProductOfCustomer,
  orderOfCustomerUser,
  detailOrderOfCustomerUser,
  getCatalog,
  getDetailCatelog,
  getProductOfCatelog,
  getCatelog,
  delCatelog,
  addCatelog,
  detailCatelog,
  updateCatelog,
  addPackage,
  getListPackage,
  detailPackage,
  updatePackage,
  editPackage,
  getListPackageProduct,
  createOrder,
  countPackageAdmin,
  countPackageCustomer,
  countTicketAdmin,
  countTicketCustomer,
  getlistProductServicesAdmin,
  getlistProductServicesCustomer,
  listCustomerOfProductAdminHome,
  packageofOfProductCustomerHome,
  getListContractOfCustomer,
  updateItemproductOfCustomer,
  getAlertAdmin,
  putAlert,
  getBilling,
  getDetailBilling,
  editBilling,
  createBilling,
  getBalance,
  vCloudDirectorSessions,
  updateFcmToken,
  countAlertOfCustomer,
};
function updateItemproductOfCustomer(product_of_customer_id, data) {
  const { userProfile } = store.getState().root;
  let path = `admin/product-of-customer/detail/${product_of_customer_id}/`;
  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function getListContractOfCustomer(customer_id) {
  const { userProfile } = store.getState().root;
  const path = `admin/contract/customer/${customer_id}/`;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function login(data) {
  const path = "account/login/";
  let dataPost = {
    username: data.username,
    password: data.password,
  };
  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
    },
    dataPost
  );
}
function logout(data) {
  const path = "account/logout/";
  const { userProfile } = store.getState().root;

  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function chagePass(data) {
  const path = "account/change-password/";

  const { userProfile } = store.getState().root;

  let dataPost = {
    old_password: data.oldpass,
    new_password: data.newpass,
  };
  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    dataPost
  );
}

function getPost() {
  const path = "post";

  return FETCH(path, "GET", {});
}

function createPost(data) {
  const path = "post/create/";
  const { userProfile } = store.getState().root;

  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.token,
    },
    data
  );
}

function detailPost(post_id) {
  const path = `post/${post_id}/`;
  const { userProfile } = store.getState().root;

  return FETCH(path, "GET", {
    Authorization: userProfile.token,
  });
}

function updatePost(data, post_id) {
  const path = `post/${post_id}/`;
  const { userProfile } = store.getState().root;

  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.token,
    },
    data
  );
}

function deletePost(post_id) {
  const path = `post/${post_id}/`;
  const { userProfile } = store.getState().root;

  return FETCH(path, "DELETE", {
    "Content-Type": "application/json",
    Authorization: userProfile.token,
  });
}
function forgetPassPost(data) {
  const path = "forgetpass/";

  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
    },
    data
  );
}
function emailRecover(data) {
  const path = "account/request-reset-email/";

  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
    },
    data
  );
}
function resetComplete(data) {
  const path = "account/password-reset-complete/";
  return FETCH(
    path,
    "PATCH",
    {
      "Content-Type": "application/json",
    },
    data
  );
}
function getProfile() {
  const path = "profile/";

  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function updateProfile(data) {
  const path = "profile/";

  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function getListCustomers(custome_name, page = 1, page_size = 10) {
  let param = `page=${page}&page_size=${page_size}`;
  if (custome_name) {
    param = `search=${custome_name}&${param}`;
  } else {
    param;
  }
  const path = `admin/customers/?${param}`;
  // customers/?page=1&page_size=10
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getDetailCustomer(customer_id) {
  const path = `admin/customers/${customer_id}/`;
  console.log("getDetailCustomerapi", customer_id);
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function editDetailCustomer(customer_id, data) {
  console.log("apieditDetailCustomer", customer_id, data);
  const path = `admin/customers/${customer_id}/`;

  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function delCustomer(customer_id) {
  const path = `admin/customers/${customer_id}/`;

  const { userProfile } = store.getState().root;
  return FETCH(path, "DELETE", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getListCustomersAccount(page, page_size) {
  const path = `admin/customers/accounts/?page=${page}&page_size=${page_size}`;

  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getRole() {
  const path = `admin/roles/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function updateCustomerAccount(customer_id, data) {
  console.log("apieditDetailCustomer", customer_id, data);
  const path = `admin/customers/account/${customer_id}`;

  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function delCustomerAccount(customer_account_id) {
  const path = `admin/customers/account/${customer_account_id}`;

  const { userProfile } = store.getState().root;
  return FETCH(path, "DELETE", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function staticInfo() {
  const path = `static/`;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
  });
}
function editstaticInfo(data) {
  const path = `static/edit/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function getListProducts(searchStr, page, page_size) {
  // const path = `page=${page}&page_size=${page_size}`;
  let param = `page=${page}&page_size=${page_size}`;
  if (searchStr) {
    param = `search=${searchStr}&${param}`;
  } else {
    param;
  }
  const { userProfile } = store.getState().root;
  const path = `products/?${param}`;
  return axiosCaller(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function createProduct(data) {
  const path = `admin/product/create/`;
  const { userProfile } = store.getState().root;
  // return FETCH(
  return axiosCaller(
    path,
    "POST",
    {
      "Content-Type": "multipart/form-data",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function getDetailProduct(product_id) {
  console.log("api", product_id);
  const path = `products/${product_id}/`;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
  });
}
function editProduct(product_id, data) {
  const path = `admin/products/${product_id}/`;

  const { userProfile } = store.getState().root;
  return axiosCaller(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function delProduct(product_id) {
  const path = `admin/products/${product_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "DELETE", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getListAccountOfCustomer(customer_id) {
  const path = `admin/customers/accounts/${customer_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getDetailAccountOfCustomer(account_id) {
  const path = `admin/customers/accounts/account_id/${account_id}`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function listOrderOfCustomer(serchSgtring, page, page_size) {
  let param = `page=${page}&page_size=${page_size}`;
  if (serchSgtring) {
    param = `search=${serchSgtring}&${param}`;
  } else {
    param;
  }
  const path = `admin/order-of-customer/?${param}`;
  // const path = `admin/order-of-customer/?page=${page}&page_size=${page_size}`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function detailOrderOfCustomer(order_id) {
  const path = `admin/order-of-customer/${order_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function delOrderOfCustomer(order_id) {
  const path = `admin/order-of-customer/${order_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "DELETE", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function listProductOfCustomer(page, page_size) {
  const path = `admin/product-of-customer/?page=${page}&page_size=${page_size}`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function listProductCustomer(product_oc_id) {
  const path = `admin/product-of-customer/${product_oc_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function detailProductCustomer(product_of_customer_id) {
  const path = `admin/product-of-customer/detail/${product_of_customer_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function updateStatusProductOfCustomer(product_of_customer_id) {
  const path = `admin/product-of-customer/change-status/${product_of_customer_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "PUT", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function delProductCustomer(product_oc_id) {
  const path = `admin/product-of-customer/${product_oc_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "DELETE", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function listContract() {
  const path = `contract/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function detailContract(contract_id) {
  const path = `contract/${contract_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function createCustomer(data) {
  const path = `admin/customer/create/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function createCustomerAccount(data) {
  const path = `account/create/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function getListContract(serchSgtring, page = 1, page_size = 10) {
  let param = `page=${page}&page_size=${page_size}`;
  if (serchSgtring) {
    param = `search=${serchSgtring}&${param}`;
  } else {
    param;
  }
  // const path = `admin/order-of-customer/?${param}`;
  const path = `admin/contract/?${param}`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function detailContractAdmin(contract_id) {
  const path = `admin/contract/${contract_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function postProductOfCustomer(data) {
  const path = `admin/product-of-customer/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function createContract(data) {
  const path = `admin/contract/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function addProductForCustomer(data) {
  const path = `admin/product-of-customer/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function createProductOfCustomer(data) {
  const path = `admin/product-of-customer/create/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function infoCustomer() {
  const path = `customer/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getProductOfCustomer(customer_id) {
  console.log("linkApi", customer_id);
  const path = `product-of-customer/${customer_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function orderOfCustomerUser(custome_name, page = 1, page_size = 10) {
  const path = `order/?page=${page}&page_size=${page_size}`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function detailOrderOfCustomerUser(order_id) {
  const path = `order/${order_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getCatalog(page, page_size) {
  const path = `admin/catelog/?page=${page}&page_size=${page_size}`;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
  });
}
function getDetailCatelog(catelog_id) {
  const path = `admin/catelog/${catelog_id}/`;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
  });
}
function getProductOfCatelog(catelog_id) {
  const path = `admin/product-of-catelog/${catelog_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
  });
}
function getCatelog(page, page_size) {
  const path = `admin/catelog/?page=${page}&page_size=${page_size}`;
  const { userProfile } = store.getState().root;
  return axiosCaller(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function delCatelog(catelog_id) {
  const path = `admin/catelog/${catelog_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "DELETE", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function addCatelog(data) {
  const path = `admin/catelog/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function detailCatelog(catelog_id) {
  const path = `admin/catelog/${catelog_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function updateCatelog(catelog_id, data) {
  const path = `admin/catelog/${catelog_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}

function getListPackage(searchStr, page, page_size) {
  let param = `page=${page}&page_size=${page_size}`;
  if (searchStr) {
    param = `search=${searchStr}&${param}`;
  } else {
    param;
  }
  const path = `admin/package/?${param}`;
  const { userProfile } = store.getState().root;
  // const path = `admin/package/?page=${page}&page_size=${page_size}`;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function addPackage(data) {
  const path = `admin/package/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function updatePackage(package_id) {
  const path = `admin/package/update-status/${package_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "PUT", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function detailPackage(package_id) {
  const path = `package/${package_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function editPackage(package_id, data) {
  const path = `admin/package/${package_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function getListPackageProduct(product_id, page, page_size) {
  const path = `package/product/${product_id}/?page=${page}&page_size=${page_size}`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function createOrder(data) {
  const path = `order/create/`;
  const { userProfile } = store.getState().root;
  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function countPackageAdmin() {
  const path = `admin/homepage/count_package_of_customer/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}

function countPackageCustomer() {
  const path = `homepage/count_package_of_customer/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function countTicketAdmin() {
  const path = `admin/homepage/count_ticket/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function countTicketCustomer() {
  const path = `homepage/count_ticket/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getlistProductServicesAdmin() {
  const path = `admin/homepage/package_of_customer/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getlistProductServicesCustomer() {
  const path = `homepage/package_of_customer/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function listCustomerOfProductAdminHome(product_id) {
  const path = `admin/homepage/list-customer-of-product/${product_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function packageofOfProductCustomerHome(product_id) {
  const path = `homepage/package-of-customer/${product_id}/`;
  const { userProfile } = store.getState().root;
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getAlertAdmin(read, page, page_size) {
  const { userProfile } = store.getState().root;

  let param;
  switch (read) {
    case 2:
      param = `read=${true}&page=${page}&page_size=${page_size}`;
      break;
    case 3:
      param = `read=${false}&page=${page}&page_size=${page_size}`;
      break;
    default:
      param = `page=${page}&page_size=${page_size}`;
      break;
  }
  let path;
  if (userProfile.data.role === "SUPPER_ADMIN") {
    path = `admin/alert/?${param}`;
  } else {
    path = `alert/?${param}`;
  }

  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
function getBilling(payment_status, page, page_size) {
  console.log("getBilling", payment_status);
  let param;
  switch (payment_status) {
    case 2:
      param = `payment_status=${true}&page=${page}&page_size=${page_size}`;
      break;
    case 3:
      param = `payment_status=${false}&page=${page}&page_size=${page_size}`;
      break;
    default:
      param = `page=${page}&page_size=${page_size}`;
      break;
  }

  const { userProfile } = store.getState().root;
  let path;
  if (userProfile.data.role === "SUPPER_ADMIN") {
    path = `admin/billing/?${param}`;
  } else {
    path = `billing/?${param}`;
  }

  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}

function editBilling(billing_id, data) {
  const { userProfile } = store.getState().root;
  let path = `admin/billing/${billing_id}/`;
  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function getDetailBilling(billing_id) {
  const { userProfile } = store.getState().root;
  let path;
  if (userProfile.data.role === "SUPPER_ADMIN") {
    path = `admin/billing/${billing_id}/`;
  } else {
    path = `billing/${billing_id}/`;
  }
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}

function putAlert(alert_id, data) {
  const { userProfile } = store.getState().root;
  let path = `alert/${alert_id}/`;

  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function createBilling(data) {
  const { userProfile } = store.getState().root;
  let path = `admin/billing/`;

  return FETCH(
    path,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function getBalance() {
  const { userProfile } = store.getState().root;
  let path;
  if (userProfile.data.role === "SUPPER_ADMIN") {
    path = `admin/homepage/list-balance/`;
  } else {
    path = `homepage/balance/`;
  }
  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}

function vCloudDirectorSessions() {
  const path = "https://vpc.vcpp.vn/api/sessions";
  let headers = new Headers();
  headers.set("Accept", "application/*+json;version=33.0");
  headers.set(
    "Authorization",
    `Basic ${base64.encode("vpcusdcvi@usdc:Abc@123456")}`
  );

  return FETCH_VCLOUD(path, "POST", headers);
}

function updateFcmToken(data) {
  const { userProfile } = store.getState().root;
  let path = "fcm-token/";

  return FETCH(
    path,
    "PUT",
    {
      "Content-Type": "application/json",
      Authorization: userProfile.data.token,
    },
    data
  );
}
function countAlertOfCustomer() {
  const { userProfile } = store.getState().root;
  let path = "homepage/count-alert-of-customer/";

  return FETCH(path, "GET", {
    "Content-Type": "application/json",
    Authorization: userProfile.data.token,
  });
}
