import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import _, { isEmpty, get } from "lodash";
import { hidePopup } from "../../app/services";
import { Select } from "antd";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
  STATUS_TICKET,
  PRIORITY_TICKET,
  PERSIST_KEY,
  SEARCH_TICKET,
} from "../../constants/config";
import {
  createTicket,
  editTicket,
} from "../../features/myprofile/view/ticket/services";
import moment from "moment";
const { Option } = Select;
class ConfirmBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      date: moment(),
      focused: false,
      sellectShow: false,
      priorityInput: "",
      statusInput: "",
      titleInput: "",
      // assigneeInput: "",
      desInput: "",
      serviceInput: "",
    };
  }
  _onClose = () => {
    this.props.dpClose();
  };

  _onOpenSellect = (data) => {
    this.setState({
      sellectShow: data,
    });
  };

  _onChoose = (type, data) => {
    switch (type) {
      case "status":
        this.setState({
          ...this.state,
          sellectShow: "",
          statusInput: data,
        });
        break;
      case "priority":
        this.setState({
          ...this.state,
          sellectShow: "",
          priorityInput: data,
        });
        break;
      case "service":
        this.setState({
          ...this.state,
          sellectShow: "",
          serviceInput: data,
        });
        break;
      default:
        break;
    }
  };

  _onSubmit = (data) => {
    const newTicket = {
      ticket: {
        id: this.state.id,
        subject: this.state.titleInput,
        description: this.state.desInput,
        priority: this.state.priorityInput,
        status: this.state.statusInput,
        requester_id: JSON.parse(
          JSON.parse(window.localStorage.getItem(PERSIST_KEY)).root
        ).userProfile.data.requester_id,
        fields: [{ id: 900003515483, value: this.state.serviceInput }],
      },
    };
    !data && isEmpty(this.props.item)
      ? this.props.dpCreate(newTicket, this.props.page)
      : !data && !isEmpty(this.props.item)
      ? delete newTicket.ticket.requester_id &&
        this.props.dpEdit(newTicket, this.props.page)
      : null;
    !data ? this.props.dpClose() : null;
  };

  _onChange = (e) => {
    const name = e.target.name;
    switch (name) {
      case "title":
        this.setState({
          ...this.state,
          titleInput: e.target.value,
        });
        break;
      case "assignee":
        this.setState({
          ...this.state,
          assigneeInput: e.target.value,
        });
        break;
      case "description":
        this.setState({
          ...this.state,
          desInput: e.target.value,
        });
      default:
        break;
    }
  };

  _onCheckSubmit = () => {
    const arrState = [
      this.state.priorityInput,
      this.state.statusInput,
      this.state.titleInput,
      this.state.assigneeInput,
      this.state.desInput,
      this.state.date,
      this.state.serviceInput,
    ];
    const arrCheck = _.filter(arrState, (item, key) => {
      return item !== "";
    });
    if (_.isEqual(_.size(arrCheck), _.size(arrState))) {
      return false;
    } else {
      return true;
    }
  };

  componentDidMount() {
    if (!isEmpty(this.props.item)) {
      this.setState({
        ...this.state,
        id: this.props.item.id,
        date: moment(this.props.item.created_at, "YYYY-MM-DD"),
        priorityInput: this.props.item.priority,
        statusInput: this.props.item.status,
        titleInput: this.props.item.raw_subject,
        desInput: this.props.item.description,
        serviceInput: get(this.props.item, "fields[2].value", ""),
      });
    }
  }

  render() {
    return (
      <div className={`create-ticket`}>
        <div className="create-ticket-box-child">
          <div className="create-ticket-box-title">
            <p>{isEmpty(this.props.item) ? "Create" : "Edit"} Ticket</p>
            <div className="close-box" onClick={() => this._onClose()}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
          <div className="create-ticket-box-icon">
            {/* <div className="todo-icon">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
              <i className="fa fa-tag" aria-hidden="true"></i>
            </div> */}
          </div>
          <div className="create-ticket-box-content">
            <div className="input-box title">
              <p className={"detail-box"}>Ticket title</p>
              <input
                className="cls-input"
                placeholder="Title"
                name="title"
                value={this.state.titleInput}
                onChange={(e) => this._onChange(e)}
              />
            </div>
            {/* <div className="title assignee">
              <input
                className="cls-input"
                placeholder="Assignee"
                name="assignee"
                value={this.state.assigneeInput}
                onChange={(e) => this._onChange(e)}
              />
            </div> */}
            {/* <div className="input-box title"> */}
            {/* <SingleDatePicker
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={(date) => this.setState({ date })} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })}
              placeholder={"Due date"}
              numberOfMonths={1}
            /> */}
            {/* </div> */}

            <div
              className={`input-box title dropdown status ${this.state.sellectShow} `}
            >
              <p className={"detail-box"}>Status</p>
              <input
                className="cls-input"
                placeholder="Status"
                onClick={() => this._onOpenSellect("s-show")}
                value={this.state.statusInput}
                // value={STATUS_TICKET[1].status}
                s
              />
              <div className="title-sellect">
                {_.map(SEARCH_TICKET.status.list, (item, key) => {
                  return (
                    <div
                      className="sellect-item"
                      key={key}
                      onClick={() => this._onChoose("status", item.value)}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className={`input-box title dropdown priority ${this.state.sellectShow} `}
            >
              <p className={"detail-box"}>Priority</p>
              <input
                className="cls-input"
                placeholder="Priority"
                onClick={() => this._onOpenSellect("p-show")}
                value={this.state.priorityInput}
              />
              <div className="title-sellect">
                {_.map(PRIORITY_TICKET, (item, key) => {
                  return (
                    <div
                      className="sellect-item"
                      key={key}
                      onClick={() => this._onChoose("priority", item.value)}
                    >
                      {item.priority}
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`input-box title dropdown service ${this.state.sellectShow} `}
            >
              <p className={"detail-box"}>Service</p>
              <input
                className="cls-input"
                placeholder="Service"
                onClick={() => this._onOpenSellect("se-show")}
                value={this.state.serviceInput}
              />
              <div className="title-sellect">
                {_.map(this.props.listService, (item, key) => {
                  return (
                    <div
                      className="sellect-item"
                      key={key}
                      onClick={() => this._onChoose("service", item.value)}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="input-box description">
              <p className={"detail-box"}>Message</p>
              <textarea
                placeholder="Add description"
                name={"description"}
                value={this.state.desInput}
                readOnly={!isEmpty(this.props.item) ? true : false}
                onChange={(e) => this._onChange(e)}
              />
            </div>
            <div
              className={`validation-ticket ${
                !this._onCheckSubmit() ? "hide" : ""
              }`}
            >
              <p>Fill full the information, please!</p>
            </div>
          </div>
          <div className="create-ticket-action">
            <div
              className={`btns update ${this._onCheckSubmit() ? "hide" : ""}`}
              onClick={() => this._onSubmit(this._onCheckSubmit())}
            >
              {isEmpty(this.props.item) ? "Create" : "Edit"}
            </div>
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
    page: _.get(state, "ticket.prePage", 1),
    listService: _.get(state, "ticket.listService", []),
  };
};

const mapDispatchToProps = {
  dpClose: () => hidePopup(),
  dpCreate: (data, page) => createTicket(data, page),
  dpEdit: (data, page) => editTicket(data, page),
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBox);
