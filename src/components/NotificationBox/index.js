import React, { Component } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { open } from "./../../features/notification/services";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { showPopup } from "./../../app/services";
class NotificationBox extends Component {
  constructor(props) {
    super(props);
  }
  _onOpen = (data) => {
    this.props.dpOpen("popupConfirm", data);
    createBrowserHistory().push("/");
  };

  render() {
    const { type, icon, title, content, time } = this.props;
    const data = {
      title,
      description: content,
    };
    return (
      <Link
        to={"#"}
        className={`notification-box ${type}`}
        onClick={() => this._onOpen(data)}
      >
        <div className="no-box-icon">
          <i className={`${icon}`} aria-hidden="true"></i>
        </div>
        <div className="no-box-content">
          <p className="box-title">{title}</p>
          <p className="box-content">{content}</p>
        </div>
        <div className="no-box-time">
          <p className="box-time">{time}</p>
        </div>
      </Link>
    );
  }
}

NotificationBox.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.string,
};

NotificationBox.defaultProps = {
  type: "",
  icon: "",
  title: "",
  content: "",
  time: "",
};

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = {
  dpOpen: (popupType, data) => showPopup(popupType, data),
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBox);
