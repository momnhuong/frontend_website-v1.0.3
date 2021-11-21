import React, { Component } from "react";
import "./style.css";

class StatusBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _onClickStatus = (id, value) => {
    this.props.onClickStatus(id, value);
  };
  render() {
    const { name, id, value, activeStatus, count } = this.props;
    return (
      <div
        className={`status-box ${name}`}
        onClick={() => this._onClickStatus(id, value)}
      >
        <div className={"status-title"}>
          <p className={"status-label"}>{name}</p>
        </div>
        <div className={`status-count`}>
          <p className={"number"}>{count}</p>
        </div>
      </div>
    );
  }
}

export default StatusBox;
