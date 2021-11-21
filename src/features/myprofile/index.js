import { Card } from "@material-ui/core";
import { Col, Menu, Row } from "antd";
import React from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  CodepenOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  FolderOutlined,
  UnorderedListOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import * as Icon from "react-feather";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { offLoading, setMenu } from "../../app/services";
import LoadingBox from "../../components/LoadingBox";
import { store } from "../../store";
import { history } from "../../store/history";
import HomePage from "../homepage/views/homePage";
import Cart from "../products/view/cart/Cart";
import DetailProduct from "../products/view/products/detailProduct";
import Product from "../products/view/products/products";
import TicketPage from "./../myprofile/view/ticket/views/ticketPage";
import "./styles.css";
import ListBilling from "./view/billing";
import EditBilling from "./view/billing/editBilling";
import ChangePassword from "./view/changepass/views/changepass";
import MainContract from "./view/contract/contract";
import ListCatelog from "./view/listCatelog";
import AddCatelog from "./view/listCatelog/addCatelog";
import EditCatelog from "./view/listCatelog/editCatelog";
import ListContractAdmin from "./view/listContractAdmin";
import ListOrderCustomer from "./view/listOrderCustomer/views";
import ListProduct from "./view/listProduct";
import CreatProduct from "./view/listProduct/creatProduct";
import EditProduct from "./view/listProduct/editProduct";
import ListProductCustomer from "./view/listProductCustomer/views";
import AddProductOfCustomer from "./view/listProductCustomer/views/addProductOfCustomer";
import EditProductOfCustomer from "./view/listProductCustomer/views/editProduct";
import ListMessage from "./view/message";
import GeneralTab from "./view/myprofile/views/myprofile";
import Order from "./view/order/order";
import Package from "./view/package";
import AddPackage from "./view/package/addPackage";
import EditPackage from "./view/package/editPackage";
import ProductCustom from "./view/products/view/products";
import SiteStaticManagement from "./view/siteStaticManagement";
import AddCustomerAccount from "./view/user/views/listCustomerAccount/addCustomerAccount";
import EditCustomerAccount from "./view/user/views/listCustomerAccount/detailAccount";
import ListCustomerAccount from "./view/user/views/listCustomerAccount/listCustomerAccount";
import AddCustomer from "./view/user/views/listCustommer/addCustomer";
import EditCustomer from "./view/user/views/listCustommer/detailCustomer";
import ListCustomer from "./view/user/views/listCustommer/listCustomer";

const MENU = [
  {
    to: "/",
    title: "menu.home",
    role_active: ["SUPPER_ADMIN", "ADMIN", "TECHNICAL", "ACCOUNTANT"],
    child: null,
  },
  {
    to: "/product-custom",
    title: "menu.monitoring",
    role_active: ["ADMIN", "TECHNICAL"],
    child: null,
  },
  {
    to: "/products",
    title: "menu.promotion",
    role_active: ["ADMIN", "TECHNICAL", "ACCOUNTANT", "SUPPER_ADMIN"],
    child: null,
  },
  {
    to: null,
    title: "menu.customer",
    role_active: ["SUPPER_ADMIN"],
    child: [
      {
        icon: <AppstoreOutlined />,
        to: "/list-customer",
        title: "menu.company",
        role_active: ["SUPPER_ADMIN"],
      },
      {
        icon: <UserOutlined />,
        to: "/customer-account",
        title: "menu.account",
        role_active: ["SUPPER_ADMIN"],
      },
      {
        icon: <CodepenOutlined />,
        to: "/list-product-customer",
        title: "menu.productservice",
        role_active: ["SUPPER_ADMIN"],
      },
    ],
  },
  {
    to: null,
    title: "menu.salesmanagement",
    role_active: ["SUPPER_ADMIN"],
    child: [
      // {
      //   icon: <ShoppingOutlined />,
      //   to: "/list-order-customer",
      //   title: "menu.order",
      //   role_active: ["SUPPER_ADMIN"],
      // },
      {
        icon: <FileTextOutlined />,
        to: "/list-contract",
        title: "menu.contract",
        role_active: ["SUPPER_ADMIN"],
      },
      // {
      //   icon: <CreditCardOutlined />,
      //   to: "/list-billing",
      //   title: "menu.billing",
      //   role_active: ["SUPPER_ADMIN"],
      // },
    ],
  },
  {
    to: null,
    title: "menu.productmanagement",
    role_active: ["SUPPER_ADMIN"],
    child: [
      {
        icon: <FolderOutlined />,
        to: "/list-catelog",
        title: "menu.category",
        role_active: ["SUPPER_ADMIN"],
      },
      {
        icon: <UnorderedListOutlined />,
        to: "/list-product",
        title: "menu.product",
        role_active: ["SUPPER_ADMIN"],
      },
      {
        icon: <DatabaseOutlined />,
        to: "/package",
        title: "menu.package",
        role_active: ["SUPPER_ADMIN"],
      },
    ],
  },
  // {
  //   to: "/list-message",
  //   title: "menu.alert",
  //   role_active: ["SUPPER_ADMIN", "ACCOUNTANT", "ADMIN"],
  //   child: null,
  // },
  {
    to: null,
    title: "menu.purchasehistory",
    role_active: ["ACCOUNTANT", "ADMIN"],
    child: [
      // {
      //   icon: <ShoppingOutlined />,
      //   to: "/order",
      //   title: "menu.order",
      //   role_active: ["ACCOUNTANT", "ADMIN"],
      // },
      {
        icon: <FileTextOutlined />,
        to: "/contract",
        title: "menu.contract",
        role_active: ["ACCOUNTANT", "ADMIN"],
      },
      // {
      //   icon: <CreditCardOutlined />,
      //   to: "/list-billing",
      //   title: "menu.billing",
      //   role_active: ["ACCOUNTANT", "ADMIN"],
      // },
    ],
  },
];

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: null,
    };

    this.ROLE = {
      SUPPER_ADMIN: [
        {
          key: (
            <li>
              <NavLink to={`/`}>
                <Icon.Tag />
                {/* Home */}
              </NavLink>
            </li>
          ),
          router: <Route exact path={`/`} component={HomePage} />,
        },
        {
          key: null,
          router: <Route exact path={`/products`} component={Product} />,
        },
        {
          key: null,
          router: (
            <Route exact path={`/products/:id`} component={DetailProduct} />
          ),
        },
        {
          key: null,
          router: <Route exact path={"/cart"} component={Cart} />,
        },
        {
          key: null,
          router: <Route path={`/chage-pass`} component={ChangePassword} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/chage-pass`}>
                <Icon.Tag />
                Change Password
              </NavLink>
            </li>
          ),
          router: (
            <Route
              path={`${this.props.match.path}/chage-pass`}
              component={ChangePassword}
            />
          ),
        },
        {
          key: null,
          router: (
            <Route exact path="/account-setting" component={GeneralTab} />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/ticket`}>
                <Icon.Tag />
                Ticket
              </NavLink>
            </li>
          ),
          router: <Route path={`/ticket`} component={TicketPage} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/site-static-management`}>
                <Icon.Settings />
                Configuration
              </NavLink>
            </li>
          ),
          router: (
            <Route
              path={`/site-static-management`}
              component={SiteStaticManagement}
            />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/list-customer`}>
                <Icon.Users />
                List Customer
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-customer`} exact component={ListCustomer} />
          ),
        },
        {
          router: <Route path={`/list-customer/add`} component={AddCustomer} />,
        },
        {
          router: (
            <Route path={`/list-customer/edit/:id`} component={EditCustomer} />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/customer-account`}>
                <Icon.User />
                Customer Account
              </NavLink>
            </li>
          ),
          router: (
            <Route
              path={`/customer-account`}
              exact
              component={ListCustomerAccount}
            />
          ),
        },

        {
          key: (
            <li>
              <NavLink to={`/list-message`}>
                <Icon.Layers />
                List Message
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-message`} exact component={ListMessage} />
          ),
        },

        {
          router: (
            <Route
              path={`/customer-account/add`}
              component={AddCustomerAccount}
            />
          ),
        },
        {
          router: (
            <Route
              path={`/customer-account/edit/:id`}
              component={EditCustomerAccount}
            />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/list-catelog`}>
                <Icon.Folder />
                Product Catelog
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-catelog`} exact component={ListCatelog} />
          ),
        },
        // {
        //   router: (
        //     <Route path={`/list-catelog/edit/:id`} component={AddCatelog} />
        //   ),
        // },
        {
          router: <Route path={`/list-catelog/add`} component={AddCatelog} />,
        },
        {
          router: (
            <Route path={`/list-catelog/edit/:id`} component={EditCatelog} />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/list-product`}>
                <Icon.Layers />
                List Product
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-product`} exact component={ListProduct} />
          ),
        },
        {
          router: <Route path={`/list-product/add`} component={CreatProduct} />,
        },
        {
          router: <Route path={`/editproduct/:id`} component={EditProduct} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/package`}>
                <Icon.Package />
                Product Package
              </NavLink>
            </li>
          ),
          router: <Route path={`/package`} exact component={Package} />,
        },
        {
          router: <Route path={`/package/add`} component={AddPackage} />,
        },
        {
          router: <Route path={`/package/edit/:id`} component={EditPackage} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/list-order-customer`}>
                <Icon.ShoppingBag />
                List Order
              </NavLink>
            </li>
          ),
          router: (
            <Route
              path={`/list-order-customer`}
              component={ListOrderCustomer}
            />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/list-product-customer`}>
                <Icon.Codepen />
                Product of Customer
              </NavLink>
            </li>
          ),
          router: (
            <Route
              path={`/list-product-customer`}
              exact
              component={ListProductCustomer}
            />
          ),
        },
        {
          router: (
            <Route
              path={`/list-product-customer/add`}
              component={AddProductOfCustomer}
            />
          ),
        },
        {
          router: (
            <Route
              path={`/list-product-customer/edit/:id`}
              component={EditProductOfCustomer}
            />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/list-contract`}>
                <Icon.FileText />
                List Contract
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-contract`} component={ListContractAdmin} />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/list-billing`}>
                <Icon.Layers />
                List Billing
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-billing`} exact component={ListBilling} />
          ),
        },
        {
          router: <Route path={`/edit-billing/:id`} component={EditBilling} />,
        },
      ],
      ACCOUNTANT: [
        {
          router: <Route exact path={`/`} component={HomePage} />,
        },
        {
          key: null,
          router: (
            <Route exact path="/account-setting" component={GeneralTab} />
          ),
        },
        {
          key: null,
          router: <Route path={`/chage-pass`} component={ChangePassword} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/ticket`}>
                <Icon.Tag />
                Ticket
              </NavLink>
            </li>
          ),
          router: <Route path={`/ticket`} component={TicketPage} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/order`}>
                <Icon.ShoppingBag />
                Order
              </NavLink>
            </li>
          ),
          router: <Route path={`/order`} component={Order} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/contract`}>
                <Icon.FileText />
                Contract
              </NavLink>
            </li>
          ),
          router: <Route path={`/contract`} component={MainContract} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/list-billing`}>
                <Icon.Inbox />
                Billing
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-billing`} exact component={ListBilling} />
          ),
        },
        {
          key: null,
          router: <Route exact path={`/products`} component={Product} />,
        },
        {
          key: null,
          router: (
            <Route exact path={`/products/:id`} component={DetailProduct} />
          ),
        },
        {
          key: null,
          router: <Route exact path={"/cart"} component={Cart} />,
        },
      ],
      TECHNICAL: [
        {
          key: null,
          router: <Route exact path={`/`} component={HomePage} />,
        },
        {
          key: null,
          router: (
            <Route exact path="/account-setting" component={GeneralTab} />
          ),
        },
        {
          key: null,
          router: <Route exact path={`/products`} component={Product} />,
        },
        {
          key: null,
          router: (
            <Route exact path={`/products/:id`} component={DetailProduct} />
          ),
        },
        {
          key: null,
          router: <Route exact path={"/cart"} component={Cart} />,
        },
        {
          key: null,
          router: <Route path={`/chage-pass`} component={ChangePassword} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/ticket`}>
                <Icon.Tag />
                Ticket
              </NavLink>
            </li>
          ),
          router: <Route path={`/ticket`} component={TicketPage} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/list-billing`}>
                <Icon.Layers />
                List Billing
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-billing`} exact component={ListBilling} />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/list-message`}>
                <Icon.Layers />
                List Message
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-message`} exact component={ListMessage} />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/product-custom`}>
                <Icon.Activity />
                Monitor
              </NavLink>
            </li>
          ),
          router: <Route path={`/product-custom`} component={ProductCustom} />,
        },
      ],
      ADMIN: [
        {
          key: null,
          router: <Route exact path={`/products`} component={Product} />,
        },
        {
          key: null,
          router: (
            <Route exact path={`/products/:id`} component={DetailProduct} />
          ),
        },
        {
          key: null,
          router: (
            <Route exact path="/account-setting" component={GeneralTab} />
          ),
        },

        {
          key: null,
          router: <Route exact path={`/`} component={HomePage} />,
        },
        {
          key: null,
          router: <Route exact path={"/cart"} component={Cart} />,
        },
        {
          key: null,
          router: <Route path={`/chage-pass`} component={ChangePassword} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/ticket`}>
                <Icon.Tag />
                Ticket
              </NavLink>
            </li>
          ),
          router: <Route path={`/ticket`} component={TicketPage} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/list-message`}>
                <Icon.Layers />
                List Message
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-message`} exact component={ListMessage} />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/list-billing`}>
                <Icon.Layers />
                List Billing
              </NavLink>
            </li>
          ),
          router: (
            <Route path={`/list-billing`} exact component={ListBilling} />
          ),
        },
        {
          key: (
            <li>
              <NavLink to={`/order`}>
                <Icon.ShoppingBag />
                Order
              </NavLink>
            </li>
          ),
          router: <Route path={`/order`} component={Order} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/contract`}>
                <Icon.FileText />
                Contract
              </NavLink>
            </li>
          ),
          router: <Route path={`/contract`} component={MainContract} />,
        },
        {
          key: (
            <li>
              <NavLink to={`/product-custom`}>
                <Icon.Activity />
                Monitor
              </NavLink>
            </li>
          ),
          router: <Route path={`/product-custom`} component={ProductCustom} />,
        },
      ],
    };
  }

  updateWidth = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    this.props.dispatchoffLoading();
    const { userProfile } = store.getState().root;
    if (userProfile === null) {
      history.push("/login");
      window.location.reload();
    }
    if (window !== undefined) {
      // console.log("da vo");
      this.updateWidth();
      window.addEventListener("resize", this.updateWidth);
    }
  }

  _handleMenuClick(e) {
    // console.log("_handleMenuClick", e);
    const keyPath = e.keyPath;
    const defaultOpenKeys = keyPath.length > 1 ? keyPath[1] : keyPath[0];
    const defaultSelectedKeys = keyPath.length > 1 ? keyPath[0] : "";
    this.props.dispatchSetMenu(defaultOpenKeys, defaultSelectedKeys);
  }

  render() {
    const { userProfile } = store.getState().root;
    const { formatMessage } = this.props.intl;
    let role = userProfile.data.role;
    const { SubMenu } = Menu;
    const { defaultOpenKeys, defaultSelectedKeys } = this.props;
    // console.log("defaultOpenKeys", defaultOpenKeys);
    // console.log("defaultSelectedKeys", defaultSelectedKeys);
    let menuKeyConvert = defaultOpenKeys;

    if (defaultSelectedKeys) {
      menuKeyConvert = defaultSelectedKeys;
    }

    return (
      <div>
        <div className="account-setting">
          <Row className="wapper-account-setting">
            <Col xs={24} sm={24} md={5} lg={5} xl={5}>
              <Card className="menu-main">
                <Menu
                  className="menu-setting-my-profile"
                  defaultSelectedKeys={[menuKeyConvert]}
                  defaultOpenKeys={[defaultOpenKeys]}
                  mode="inline"
                  inlineCollapsed={this.state.collapsed}
                  onClick={(e) => this._handleMenuClick(e)}
                >
                  {MENU.map((item, index) => {
                    if (item.role_active.includes(role)) {
                      if (item.child === null) {
                        return (
                          <Menu.Item key={`menu_${index}`}>
                            {item.to ? (
                              <Link to={item.to}>
                                {" "}
                                <FormattedMessage id={item.title} />
                              </Link>
                            ) : (
                              <FormattedMessage id={item.title} />
                            )}
                          </Menu.Item>
                        );
                      }

                      return (
                        <SubMenu
                          key={`menu_${index}`}
                          title={formatMessage({ id: item.title })}
                        >
                          {item.child.map((subMenu, subIndex) => {
                            if (subMenu.role_active.includes(role)) {
                              return (
                                <Menu.Item
                                  key={`sub_menu_${index}_${subIndex}`}
                                  icon={subMenu.icon}
                                >
                                  <Link to={subMenu.to}>
                                    <FormattedMessage id={subMenu.title} />
                                  </Link>
                                </Menu.Item>
                              );
                            }
                          })}
                        </SubMenu>
                      );
                    }
                  })}
                </Menu>
              </Card>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={19}
              lg={19}
              xl={19}
              className="container-main"
              style={{
                paddingRight: "24px !important",
                minHeight: window.innerHeight - 63,
              }}
            >
              <Switch>
                {this.ROLE[role].map((item, index) => {
                  return item.router;
                })}
              </Switch>
              <LoadingBox />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  infoProfile: state.getProfile.dataSuccess,
  defaultOpenKeys: state.root.defaultOpenKeys,
  defaultSelectedKeys: state.root.defaultSelectedKeys,
});

const mapDispatchToProps = {
  dispatchoffLoading: () => offLoading(),
  dispatchSetMenu: (defaultOpenKeys, defaultSelectedKeys) =>
    setMenu(defaultOpenKeys, defaultSelectedKeys),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(injectIntl(AccountSettings)));
// export default withRouter(AccountSettings);
