import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { USER_CONTACT, STATUS } from "../../../constants/config";
import { IMAGES } from "../../../assets";
import BtnMenu from "../../../components/btnMenu";
import { showPopup } from "../../services";
import * as Icon from "react-feather";
import Lang from "../lang";
import "./styles.css";

class MenuMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      display: "none",
    };
  }
  handleClick() {
    this.toggleMenu();
  }
  renderBtnMenu() {
    return (
      <Link
        to="#"
        onClick={() => {
          this.handleClick();
        }}
      >
        <BtnMenu ref="btn" />
      </Link>
    );
  }
  toggleMenu() {
    console.log("toggleMenu", this.refs.btn.handleClick);
    if (this.state.display === "none") {
      console.log(this.state.display);
      this.addClass();
      if (this.refs.btn) this.refs.btn.handleClick();
    } else {
      console.log(this.state.display);
      this.removeClass();
      if (this.refs.btn) this.refs.btn.handleClick();
    }
  }
  addClass() {
    this.setState({
      show: true,
      display: "block",
    });
  }
  removeClass() {
    this.setState({
      show: false,
      display: "none",
    });
  }
  _renderContentMobile() {
    return (
      <div className={this.state.show ? "list-menu active-menu" : "list-menu"}>
        <Link
          to="#"
          onClick={() => {
            this.toggleMenu();
          }}
        >
          <Icon.X className=" img-close" />
        </Link>
        <ul className="info-menu-mobile">
          <li className="user-avatar-box">
            <div className="user-avatar">
              <img src={IMAGES.avatar} className="img-avatar" alt="icon-user" />
            </div>
            <div className="user-info-box">
              <div className="user-name">{USER_CONTACT.NAME}</div>
              <div className="user-status">{STATUS.AVAILABLE}</div>
            </div>
          </li>
        </ul>
        <div className="logout">
          <Link
            to="#"
            onClick={() => this.props.dispatchShowPopup("popuplogout")}
          >
            Log out
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="menu-mobile">
        {this.renderBtnMenu()}
        <img src={IMAGES.logo} className="img-responsive" alt="logo mobile" />
        <div className="dropdown menu_lang">
          <Lang />
        </div>

        {this._renderContentMobile()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dispatchShowPopup: (popupType) => showPopup(popupType),
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuMobile);
