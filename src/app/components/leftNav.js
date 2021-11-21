import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { changeOpenKey } from "../services";

import "antd/dist/antd.css";
import "../views/main.css";

const { SubMenu } = Menu;
const { Sider } = Layout;

class LeftNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultSelectedKeys: "",
      defaultOpenKeys: "menu_0",
    };
  }

  _menuOnClick(e) {
    const keyPath = e.keyPath;
    // this.props.dpChangeOpenKey(keyPath[0], keyPath[1])
  }

  render() {
    const { defaultSelectedKeys, defaultOpenKeys } = this.state;

    return (
      <Sider width={200} className="site-layout-background">
        <Menu
          onClick={(e) => this._menuOnClick(e)}
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKeys]}
          defaultOpenKeys={[defaultOpenKeys]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <SubMenu
            key="post"
            title={
              <span>
                <UserOutlined />
                Post
              </span>
            }
          >
            <Menu.Item key="post1">
              <Link to="/post">List</Link>
            </Menu.Item>
            <Menu.Item key="post2">
              <Link to="/createpost">Add new</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

const mapDispatchToProps = {
  dpChangeOpenKey: (defaultOpenKeys, defaultSelectedKeys) =>
    changeOpenKey(defaultOpenKeys, defaultSelectedKeys),
};

const mapStateToProps = (state) => ({
  defaultSelectedKeys: state.root.defaultSelectedKeys,
  defaultOpenKeys: state.root.defaultOpenKeys,
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
