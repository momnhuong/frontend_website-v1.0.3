import React, { Component } from "react";
import { connect } from "react-redux";
import Notification from "../../../notification/views/notificationPage";

class ListMessage extends Component {
  constructor(props) {
    super(props);
  }
  renderListMessage() {
    return <Notification />;
  }
  render() {
    return <div>{this.renderListMessage()}</div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ListMessage);
