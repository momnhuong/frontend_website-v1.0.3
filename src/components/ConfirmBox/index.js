import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import _ from "lodash";
import { hidePopup } from "../../app/services";
class ConfirmBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };
  }
  _onClose = () => {
    this.props.dpClose();
  };

  componentDidMount() {
    this.setState({
      title: this.props.item.title,
      description: this.props.item.description,
    });
  }

  render() {
    const { title, description } = this.props.item;
    return (
      <div className={`confirm ${!this.props.isClose ? "" : "show"}`}>
        {/* <div className="confirm-box"></div> */}
        <div className="confirm-box-child">
          <div className="confirm-box-title">
            <p>Edit Task</p>
            <div className="close-box" onClick={() => this._onClose()}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
          <div className="confirm-box-icon">
            <div className="todo-icon">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-tag" aria-hidden="true"></i>
            </div>
          </div>
          <div className="confirm-box-content">
            <div className="title">
              {/* <input placeholder='Title' value={this.props.title} /> */}
              <input
                className="cls-input"
                placeholder="Title"
                value={title}
                readOnly
              />
            </div>
            <div className="description">
              {/* <textarea placeholder='Add description' value={this.props.description} onChange={} /> */}
              <textarea
                placeholder="Add description"
                value={description}
                readOnly
              />
            </div>
          </div>
          <div className="confirm-action">
            <div className="btns update">Update</div>
            <div className="btns cancel" onClick={() => this._onClose()}>
              Cancel
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isClose: _.get(state, "notification.close", "false"),
    description: _.get(state, "notification.description", ""),
    title: _.get(state, "notification.title", ""),
  };
};

const mapDispatchToProps = {
  dpClose: () => hidePopup(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBox);
