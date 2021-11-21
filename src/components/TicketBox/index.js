import React, { Component } from "react";
import "./style.css";
import _, { isEqual, filter } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showPopup } from "./../../app/services";
import { detailTicket } from "../../features/myprofile/view/ticket/services";
import { getRequesterID } from "../../constants/common";
class TicketBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      idCheck: -1,
    };
  }

  _onClick = (data) => {
    this.props.dpOpen("popupTicket", data);
    this.props.dpDetailTicket(data.id);
  };

  _onEditTicket = (data) => {
    !isEqual(data.status, "closed")
      ? this.props.dpOpen("popupCreateTicket", data)
      : null;
  };

  _onSelect = (e, id) => {
    if (!this.state.checked) {
      this.props.onSelect(id);
      this.setState({
        checked: true,
        idCheck: id,
      });
    } else {
      this.setState({
        checked: false,
        idCheck: id,
      });
    }
  };

  componentDidMount() {
    if (this.props.checkRefresh) {
      this.setState({
        ...this.state,
        checked: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.checkRefresh !== prevProps.checkRefresh) {
      const _filCheck = filter(this.props.arrCheck, (item, key) => {
        return item === this.props.id;
      });
      this.setState({
        ...this.state,
        checked: false,
        idCheck: _filCheck,
      });
    }
  }

  render() {
    const {
      id,
      status,
      raw_subject,
      description,
      priority,
      category,
      created_at,
      assignee_id,
      requester_id,
      tags,
      submitter_id,
      fields,
      via,
    } = this.props;

    const dataTicket = {
      id,
      status,
      raw_subject,
      description,
      priority,
      category,
      created_at,
      assignee_id,
      requester_id,
      tags,
      submitter_id,
      fields,
      via,
    };

    return (
      <div className="ticket-box">
        <div className="ticket-checkbox">
          <input
            className="i-checkbox"
            type="checkbox"
            name="checkbox"
            checked={
              this.state.idCheck === id && this.state.checked ? true : false
            }
            onChange={(e) => this._onSelect(e, id)}
          />
        </div>

        <div
          className={`ticket-edit ${isEqual(status, "closed") ? "closed" : ""}`}
          onClick={() => this._onEditTicket(dataTicket)}
        >
          <div className="ticket-alert">
            <p>Can't Edit ticket Closed</p>
          </div>

          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        </div>

        <div
          className="ticket-box-item"
          onClick={() => this._onClick(dataTicket)}
        >
          <div className="ticket-top">
            <div className="ticket-code">
              <div className="code">#{id}</div>
              <div
                className={`status ${
                  _.isEqual(status, "solved") ? "new" : ""
                } ${_.isEqual(status, "closed") ? "closed" : ""}
                ${_.isEqual(status, "solved") ? "solved" : ""} ${
                  _.isEqual(status, "hold") ? "hold" : ""
                } ${_.isEqual(status, "pending") ? "pending" : ""}`}
              >
                <p>{status.toUpperCase()}</p>
              </div>
            </div>
            <div className="ticket-top-title">
              <div className="top-title-box">
                <h4>{raw_subject}</h4>
                <p className="title-box-content">{description}</p>
              </div>
            </div>
          </div>
          <div className="ticket-bottom">
            <div className="bottom-icon">
              <i className="fa fa-ticket" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-commenting-o" aria-hidden="true"></i>
            </div>
            <div className="bottom-info">
              <div className="bottom-priority">
                <p className="priority-title">priority</p>
                <p className="priority-content">{priority}</p>
              </div>
              <div className="bottom-category">
                <p className="category-title">Requester ID</p>
                <p className="category-content">{requester_id}</p>
              </div>
              <div className="bottom-due-date">
                <p className="date-title">Create day</p>
                <p className="date-content">{created_at}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TicketBox.propTypes = {
  status: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  raw_subject: PropTypes.string,
  content: PropTypes.string,
  time: PropTypes.string,
  created_at: PropTypes.string,
};

TicketBox.defaultProps = {
  status: "",
  type: "",
  icon: "",
  title: "",
  content: "",
  time: "",
  created_at: "",
};

const mapDispatchToProps = {
  // dpOpen: (data) => openTicketPopup(data),
  dpDetailTicket: (id) => detailTicket(id),
  dpOpen: (popupType, data) => showPopup(popupType, data),
};

export default connect(null, mapDispatchToProps)(TicketBox);
