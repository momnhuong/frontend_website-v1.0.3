import { combineReducers } from "redux";
import { root } from "../app/reducers";
import post from "../features/pgs/reducers";
import auth from "../features/auth/login/reducers";
import home from "../features/homepage/reducers";
import notification from "../features/notification/reducers";
import ticket from "../features/myprofile/view/ticket/reducers";
import chat from "../features/chat/reducers";
import changepass from "../features/myprofile/view/changepass/reducers";
import emailRecover from "../features/auth/forgetpass/reducers";
import getProfile from "../features/myprofile/view/myprofile/reducers";
import customer from "../features/myprofile/view/user/services/reducers";
import products from "../features/products/services/reducers";
import orderofcustomer from "../features/myprofile/view/listOrderCustomer/services/reducers";
import productofcustomer from "../features/myprofile/view/listProductCustomer/services/reducers";
import contract from "../features/myprofile/view/contract/services/reducers";
import contractadmin from "../features/myprofile/view/listContractAdmin/services/reducers";
import orderOfCustomerUser from "../features/myprofile/view/order/services/reducers";
import putStaticManagement from "../features/myprofile/view/siteStaticManagement/service/reduces";
import catelog from "../features/myprofile/view/listCatelog/services/reducers";
import packages from "../features/myprofile/view/package/services/reducers";
import alert from '../features/notification/reducers'
import billing from '../features/myprofile/view/billing/services/reducers'

const rootReducer = combineReducers({
  root,
  home,
  post,
  auth,
  notification,
  ticket,
  chat,
  changepass,
  emailRecover,
  getProfile,
  customer,
  products,
  orderofcustomer,
  productofcustomer,
  contract,
  contractadmin,
  orderOfCustomerUser,
  putStaticManagement,
  catelog,
  packages,
  alert,
  billing
});

export default rootReducer;
