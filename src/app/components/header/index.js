import React, { Component } from "react";
import { showPopup } from "../../services";

import "./header.css";

import { connect } from "react-redux";
import { logout } from "../../../features/auth/login/services";
import MenuDestop from "../menuDestop";
import MenuMobile from "../menuMobile";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaymenu: false,
      widthWindows: 0,
    };
  }
  updateWidth = () => {
    this.setState({ windowWidth: window.innerWidth });
  };
  componentDidMount() {
    if (window !== undefined) {
      this.updateWidth();
      window.addEventListener("resize", this.updateWidth);
    }
  }

  onLogout = (popupType) => {
    this.props.dispatchShowPopup(popupType);
  };
  renderMenuDestop() {
    return (
      <React.Fragment>
        <MenuDestop />
      </React.Fragment>
    );
  }
  renderMenuMobile() {
    return <MenuMobile />;
  }
  renderMenu() {
    if (window.innerWidth <= 991) {
      return this.renderMenuMobile();
    } else {
      return this.renderMenuDestop();
    }
  }
  render() {
    return this.renderMenu();
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dpLogout: () => logout(),
  dispatchShowPopup: (popupType) => showPopup(popupType),
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
