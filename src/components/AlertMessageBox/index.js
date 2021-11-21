import React, { Component } from "react";
import "./style.css";
import _ from "lodash";
import { LIST_NOTIFICATION } from "../../constants/config";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NotificationBox from "../NotificationBox";
class AlertMessageBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notificationProps = LIST_NOTIFICATION;
    return (
      <div className="alert-message-box">
        <div className="alert-notification">
          <h4>{_.size(notificationProps)} new</h4>
          <p>App notifications</p>
        </div>
        <div className="list-message">
          {_.map(notificationProps, (item, index) => {
            return <NotificationBox {...item} key={index} />;
          })}
        </div>
        <Link to={"/list-message"}>
          <div className="alert-all">
            <p>Read all notification</p>
          </div>
        </Link>
      </div>
    );
  }
}

AlertMessageBox.propTypes = {
  notificationProps: PropTypes.arrayOf(PropTypes.shape()),
};

AlertMessageBox.defaultProps = {
  type: "",
  icon: "",
  title: "",
  content: "",
  time: "",
};

export default AlertMessageBox;
