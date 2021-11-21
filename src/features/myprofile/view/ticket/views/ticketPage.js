import { Button, Select } from "antd";
import _, { isEmpty, map } from "lodash";
import React, { Component } from "react";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import { showPopup } from "../../../../../app/services";
import PaginationBox from "../../../../../components/PaginationBox";
import SearchListBox from "../../../../../components/SearchListBox";
import StatusBox from "../../../../../components/StatusBox";
import TicketBox from "../../../../../components/TicketBox";
import { getIndexOf, getRequesterID } from "../../../../../constants/common";
import {
  PAGINATION,
  SEARCH_TICKET,
  SEARCH_TICKET_PARAMS,
} from "../../../../../constants/config";
import {
  deleteTicket,
  getListCustomer,
  listService,
  listTicket,
  SearchCountStatus,
  searchTicket,
} from "./../services";
import "./style.css";

class TicketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTicket: [],
      selectCheckbox: [],
      checkRefresh: false,
      showSearch: false,
      searchParams: SEARCH_TICKET_PARAMS,
      activeStatus: -1,
      searchText: "",
      searchStatus: "",
      searchRequester: -1,
    };
  }

  componentDidMount() {
    this.props.dpListService();
    this.props.dpListTicket(1, this.props.requesterId);
    this.props.dpCountStatus(SEARCH_TICKET.status.list[0].name);
    this.props.dpCountStatus(SEARCH_TICKET.status.list[1].name);
    this.props.dpCountStatus(SEARCH_TICKET.status.list[2].name);
    this.props.dpCountStatus(SEARCH_TICKET.status.list[3].name);
    this.props.dpCountStatus(SEARCH_TICKET.status.list[4].name);
    this.props.dpListCustomer("");
  }
  _onClickSearch = () => {
    this.setState({
      ...this.state,
      activeStatus: -1,
    });
  };
  _onClear = (val) => {
    console.log("clear: ", val);
  };
  _onClickStatus = (id, value) => {
    let requester_id = getRequesterID();
    let _params =
      `${SEARCH_TICKET_PARAMS} ${
        requester_id === null ? "" : `requester_id:${requester_id}`
      }` +
      " status:" +
      value;
    if (this.state.searchRequester !== -1)
      _params += ` requester_id:${this.state.searchRequester}`;
    this.props.dpSearch(_params, 1);
    this.setState({
      ...this.state,
      searchStatus: value,
      searchText: "",
      activeStatus: id,
      searchParams: _params,
    });
  };
  _onSearchCustomer = (val) => {
    console.log("onSearch: ", val);
  };
  _onChangeCustomer = (val) => {
    let requester_id = getIndexOf(val, "-");
    let _params = `${SEARCH_TICKET_PARAMS}`;
    if (requester_id !== -1) _params += ` ${`requester_id:${requester_id}`}`;
    if (!isEmpty(this.state.searchText)) {
      _params += ` ${this.state.searchText}`;
    }
    this.props.dpSearch(_params, 1);
    this.setState({
      ...this.state,
      searchRequester: requester_id,
      searchParams: _params,
    });
  };
  _onChangeSearch = (event) => {
    let requester_id = getRequesterID();
    let _params =
      `${SEARCH_TICKET_PARAMS} ${
        requester_id === null ? "" : `requester_id:${requester_id}`
      }` + ` ${event.target.value}`;
    if (this.state.searchRequester !== -1)
      _params += ` requester_id:${this.state.searchRequester}`;
    this.props.dpSearch(_params, 1);
    this.setState({
      ...this.state,
      searchText: event.target.value,
      searchParams: _params,
    });
  };
  _onCreate = () => {
    const data = {};
    this.props.dpOpen("popupCreateTicket", data);
  };

  _onSelect = (id) => {
    let arrSelect = this.state.selectCheckbox;
    arrSelect.push(id);
    this.setState({
      selectCheckbox: arrSelect,
    });
  };

  _onDelete = () => {
    this.setState({
      ...this.state,
      selectCheckbox: [],
      checkRefresh: !this.state.checkRefresh,
    });
    this.props.dpDelete(this.state.selectCheckbox, this.props.page);
  };

  _onShowSearch = () => {
    this.setState({
      ...this.state,
      activeStatus: -1,
      showSearch: true,
    });
  };

  _onHideSearch = () => {
    this.setState({
      ...this.state,
      showSearch: false,
    });
  };

  _onParams = (params) => {
    this.setState({
      ...this.state,
      showSearch: false,
      searchParams: params,
    });
  };
  render() {
    const { Option } = Select;
    let listTicket = this.props.listTicket;
    return (
      <div className="ticket-page">
        <div className="row top">
          <div className="actions action-btns">
            <Button
              type="button"
              className="btn-add"
              onClick={() => this._onCreate()}
            >
              <Icon.Plus /> Add New
            </Button>
          </div>
          <div className={"list-status"}>
            {map(SEARCH_TICKET.status.list, (item, k) => {
              return (
                <StatusBox
                  {...item}
                  onClickStatus={this._onClickStatus}
                  activeStatus={this.state.activeStatus}
                  count={this.props.statusCount[item.name]}
                  key={k}
                />
              );
            })}
          </div>
          {!getRequesterID() && (
            <Select
              allowClear
              showSearch
              style={{ width: 200 }}
              placeholder={"Search Customer"}
              onSearch={this._onSearchCustomer}
              onChange={this._onChangeCustomer}
              onClear={this._onClear}
            >
              {map(this.props.listCustomerTicket, (item, k) => {
                const val = {
                  customer_name: item.customer_name,
                  requester_id: item.requester_id,
                };
                return (
                  <Option
                    value={`${item.customer_name}-${item.requester_id}`}
                    key={k}
                  >
                    {item.customer_name}
                  </Option>
                );
              })}
            </Select>
          )}
          <div
            className={`ticket-search ${this.state.showSearch ? "show" : ""}`}
          >
            {/* <Button
              // className="search-action"
              type="primary"
              onClick={() => this._onShowSearch()}
            >
              Search
            </Button> */}
            <div className={"search-text"}>
              <i className="fa fa-search" aria-hidden="true"></i>
              <input
                className={"i-search"}
                placeholder={"Search ticket"}
                value={this.state.searchText}
                onClick={() => this._onClickSearch()}
                onChange={this._onChangeSearch}
                // onSearch={this._onSearchCustomer}
              />
            </div>
            {/* <div className="search-action" onClick={() => this._onShowSearch()}>
              <p>Search</p>
            </div> */}
            <SearchListBox
              hideSearch={this._onHideSearch}
              checkParams={this._onParams}
            />
          </div>
        </div>
        <div className="list-todo-ticket">
          {_.map(listTicket, (item, key) => {
            return (
              <TicketBox
                {...item}
                checkRefresh={!this.state.checkRefresh}
                onSelect={this._onSelect}
                onDelete={this._onDelete}
                arrCheck={this.state.selectCheckbox}
                key={key}
              />
            );
          })}
        </div>
        <PaginationBox
          label={PAGINATION.TICKET}
          params={this.state.searchParams}
          count={this.props.count}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const _listTicket = _.get(state, "ticket.listTicket", []);
  const _page = _.get(state, "ticket.prePage", 1);
  const _count = _.get(state, "ticket.count", 0);
  const _requesterId = _.get(state, "root.userProfile.data.requester_id", null);
  const _statusCount = _.get(state, "ticket.statusCount", {});
  const _listCustomerTicket = _.get(state, "ticket.listCustomer", []);
  return {
    listTicket: _listTicket,
    page: _page,
    count: _count,
    requesterId: _requesterId,
    statusCount: _statusCount,
    listCustomerTicket: _listCustomerTicket,
  };
};

const mapDispatchToProps = {
  dpListTicket: (data, requester_id) => listTicket(data, requester_id),
  dpOpen: (popupType, data) => showPopup(popupType, data),
  dpDelete: (data, page) => deleteTicket(data, page),
  dpListService: () => listService(),
  dpSearch: (data, page) => searchTicket(data, page),
  dpCountStatus: (type) => SearchCountStatus(type),
  dpListCustomer: (data) => getListCustomer(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketPage);
