import React, { Component } from "react";
import { Menu, Dropdown, Avatar, Badge, Popover } from "antd";
import Logo from "../Logo";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { store } from "../../../store";
import {
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  PhoneOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  MailOutlined,
  UserOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { getListAlert } from "../../../features/notification/services";
import { countAlertOfCustomer } from "../../../features/auth/login/services";
import { logout } from "../../../features/auth/login/services";
import { showPopup } from "../../services";
import { staticInfo } from "../../../features/auth/login/services";
import PropTypes from "prop-types";
import { Header } from "./Sidebar.styles";
import { withRouter } from "react-router-dom";
import AlertMessageBox from "../../../components/AlertMessageBox";

const CUSTOMER_ROLE = ["ACCOUNTANT", "ADMIN", "TECHNICAL"];
class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sumShopping: 0,
    };
  }
  componentDidMount() {
    this.props.dispatchStaticInfo();
    this.props.dbcountAlertOfCustomer();
  }

  render() {
    const { location, listAlertAdmin, countAlertOfCustomer } = this.props;
    // console.log(this.props.shoppingCart);
    let sumShopping = this.props.shoppingCart
      ? this.props.shoppingCart.shoppingSum
      : 0;
    const { userProfile, shoppingCart } = store.getState().root;
    const { listAlertAdminSuccess } = store.getState().alert;
    let listAlert =
      listAlertAdmin !== null &&
      listAlertAdmin.data &&
      listAlertAdmin.data.results &&
      listAlertAdmin.data.results.length > 0
        ? listAlertAdmin.data.results
        : [];
    console.log("countAlertOfCustomer", countAlertOfCustomer);
    let countAlert =
      countAlertOfCustomer && countAlertOfCustomer.data
        ? countAlertOfCustomer && countAlertOfCustomer.data
        : 0;

    let Role = userProfile && userProfile.data ? userProfile.data.role : "";
    let name = userProfile && userProfile.data ? userProfile.data.fullname : "";
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/account-setting">
            <UserOutlined style={{ marginRight: 10 }} />
            My Profile
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link rel="noopener noreferrer" to="/chage-pass">
            <LockOutlined style={{ marginRight: 10 }} />
            Change Password
          </Link>
        </Menu.Item>

        {!CUSTOMER_ROLE.includes(Role) ? (
          <Menu.Item>
            <Link rel="noopener noreferrer" to="/site-static-management">
              <ToolOutlined style={{ marginRight: 10 }} />
              Configuration
            </Link>
          </Menu.Item>
        ) : null}

        <Menu.Item>
          <a
            rel="noopener noreferrer"
            href="#"
            onClick={() => this.props.dispatchShowPopup("popuplogout")}
          >
            <LogoutOutlined style={{ marginRight: 10 }} /> Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    const content = <AlertMessageBox />;

    return (
      <Header className="menu">
        <div className="menu-left">
          <Logo />
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["/homepage"]}
          className="custom-menu menu-right"
          selectedKeys={[location.pathname]}
        >
          <React.Fragment>
            {/* <Menu.Item key="/homepage" className="item-menu">
              <NavLink to="/homepage">
                <HomeOutlined className="item-icon" />
                <span>
                  <FormattedMessage id="menu.home" />
                </span>
              </NavLink>
            </Menu.Item> */}
          </React.Fragment>
          <div className="support">
            <div className="hot-line">
              <MailOutlined className="img-avatar" />

              <div className="right-hotline">
                <span className="title-number-hotline">Email</span>
                <span className="number-hotline">
                  {" "}
                  <a
                    href={`mailto:${
                      this.props.staticInfo && this.props.staticInfo.data
                        ? this.props.staticInfo.data.email
                        : ""
                    }`}
                  >
                    {this.props.staticInfo && this.props.staticInfo.data
                      ? this.props.staticInfo.data.email
                      : ""}
                  </a>
                </span>
              </div>
            </div>
            <div className="hot-line" style={{ marginRight: 20 }}>
              <PhoneOutlined className="img-avatar" />

              <div className="right-hotline">
                <span className="title-number-hotline">Hotline</span>
                <span className="number-hotline">
                  {" "}
                  {this.props.staticInfo && this.props.staticInfo.data
                    ? this.props.staticInfo.data.hotline
                    : ""}
                </span>
              </div>
            </div>

            <Link to="/cart">
              <Badge count={sumShopping}>
                <ShoppingCartOutlined className="img-avatar" />
              </Badge>
            </Link>
            {/* {CUSTOMER_ROLE.includes(Role) ? (
             
            ) : null} */}

            {CUSTOMER_ROLE.includes(Role) ? (
              <Link to="/list-message">
                <Badge count={countAlert}>
                  <BellOutlined className="img-avatar" />
                </Badge>
              </Link>
            ) : null}

            <div className="info-account">
              <div className="right-info-account">
                <span className="name-account"> {name}</span>

                {/* <span className="user-status">Available</span> */}
              </div>
              <Dropdown overlay={menu}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </a>
              </Dropdown>
            </div>
          </div>
        </Menu>
      </Header>
    );
  }
}
const mapStateToProps = (state) => ({
  userProfile: state.root.userProfile,
  staticInfo: state.auth.staticInfoSuccess,
  shoppingCart: state.root.shoppingCart,
  listAlertAdmin: state.alert.listAlertAdminSuccess,
  countAlertOfCustomer: state.auth.countAlertOfCustomerSuccess,
});

const mapDispatchToProps = {
  dpLogout: () => logout(),
  dispatchShowPopup: (popupType) => showPopup(popupType),
  dispatchStaticInfo: () => staticInfo(),
  dpgetListAlert: () => getListAlert(),
  dbcountAlertOfCustomer: () => countAlertOfCustomer(),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(injectIntl(Sidebar)));
Sidebar.propTypes = {
  location: PropTypes.object.isRequired,
};
