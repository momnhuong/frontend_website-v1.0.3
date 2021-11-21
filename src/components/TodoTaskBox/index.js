import React, { Component } from "react";
import _ from "lodash";
import "./style.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  // open,
  // delete_notification,
} from "./../../features/notification/services";
import { showPopup } from "./../../app/services";
function TaskIconBox(props) {
  const { value } = props;
  return (
    <div className="task-icon-box">
      <div className={`icon ${value}`}></div>
      <div className="content">{value}</div>
    </div>
  );
}

TaskIconBox.propTypes = {
  value: PropTypes.string,
};

TaskIconBox.defaultProps = {
  value: "",
};

class TodoTaskBox extends Component {
  constructor(props) {
    super(props);
  }

  _open = (data) => {
    this.props.dpOpen("popupConfirm", data);
  };

  _onDelete = (data) => {
    this.props.dpDelete(data);
  };
  render() {
    const { id, position, title, content } = this.props;
    const data = {
      title,
      description: content,
    };
    return (
      <div className="todo-task-box">
        <input className="checkbox" type="checkbox" ref={this.checkbox} />
        <div className="todo-icon">
          <i className="fa fa-info-circle ic-info" aria-hidden="true"></i>
          <i
            className="fa fa-trash-o ic-trash"
            aria-hidden="true"
            onClick={() => this._onDelete(id)}
          ></i>
        </div>
        <div className="todo-task" onClick={() => this._open(data)}>
          <div className="todo-title">
            <div className="todo-title-input">
              {/* <input className='checkbox' type='checkbox' ref={this.checkbox} /> */}
            </div>
            <div className="todo-title-content">
              <h3>{title}</h3>
              {_.map(position, (item, key) => {
                return <TaskIconBox {...item} key={key} />;
              })}
            </div>
          </div>
          <div className="todo-content">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = {
  // dpOpen: (data) => open(data),
  dpOpen: (popupType, data) => showPopup(popupType, data),
  // dpDelete: (data) => delete_notification(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoTaskBox);
