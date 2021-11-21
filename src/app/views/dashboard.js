import React, { lazy, Suspense, Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { history } from "../../store/history";
// import { IMAGES } from "../../assets";
// import LeftNav from "../components/leftNav";
import Loader from "../components/loader";
import { logout } from "../services";
import { Layout, Breadcrumb, Menu } from "antd";
// import { UserOutlined } from "@ant-design/icons";
const { Content } = Layout;
// const { SubMenu } = Menu;

const routes = [
  {
    path: "/homepage",
    exact: true,
    component: lazy(() => import("../../features/homepage/views/homePage")),
  },
  {
    path: "/post",
    component: lazy(() => import("../../features/pgs/views/pgsPage")),
  },
  {
    path: "/createpost",
    component: lazy(() => import("../../features/pgs/views/createPage")),
  },
  {
    path: "/editpost/:id",
    exact: true,
    component: lazy(() => import("../../features/pgs/views/updatePage")),
  },
  // {
  //   path: "/transaction",
  //   exact: true,
  //   component: lazy(() =>
  //     import("../../features/transaction/views/transaction")
  //   ),
  // },
];

class Dashboard extends Component {
  _menuOnClick(e) {
    if (e.key === "SignOut") {
      this.props.dpLogout();
    }
  }

  render() {
    const { userProfile } = this.props;
    console.log("userProfile", userProfile);

    return (
      <Suspense fallback={<Loader />}>
        <Router history={history}>
          <Layout style={{ height: "100vh" }}>
            {/* <Header style={{ backgroundColor: "#FFFFFF" }} className="header">
              <div style={{ display: "block", float: "left" }}>
                <img height={40} src={IMAGES.logo_sm} alt="img logo" />
              </div>
              <div
                style={{
                  display: "block",
                  float: "right",
                  alignItems: "center",
                }}
              >
                <Menu
                  key="user"
                  mode="horizontal"
                  onClick={(e) => this._menuOnClick(e)}
                >
                  <SubMenu
                    title={
                      <Fragment>
                        <span style={{ color: "#999", marginRight: 4 }}>
                          Hi,
                        </span>
                        <span>
                          {userProfile ? userProfile.username : "User"}
                        </span>
                        <Avatar
                          style={{ marginLeft: 8, backgroundColor: "#87d068" }}
                          icon={<UserOutlined />}
                        />
                      </Fragment>
                    }
                    style={{ lineHeight: "64px" }}
                  >
                    <Menu.Item key="SignOut">Sign out</Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            </Header> */}
            <Layout>
              {/* <LeftNav /> */}
              <Layout>
                {/* <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>USDC Demo</Breadcrumb.Item>
                  <Breadcrumb.Item>Post Management</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                </Breadcrumb> */}
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  <Switch>
                    {routes.map((route, idx) => (
                      <Route
                        exact={route.exact}
                        key={idx}
                        path={route.path}
                        render={({ match }) => {
                          return match ? (
                            <route.component match={match} />
                          ) : (
                            <route.component />
                          );
                        }}
                      />
                    ))}
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Router>
      </Suspense>
    );
  }
}

const mapDispatchToProps = {
  dpLogout: () => logout(),
};

const mapStateToProps = (state) => ({
  userProfile: state.root.userProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
