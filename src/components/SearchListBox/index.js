import React, { Component } from "react";
import "./style.css";
import InputSelectBox from "../InputSelectBox";
import {
  PERSIST_KEY,
  SEARCH_TICKET,
  SEARCH_TICKET_PARAMS,
} from "../../constants/config";
import SearchBox from "../SearchBox";
import { searchTicket } from "../../features/myprofile/view/ticket/services";
import { isEmpty, get } from "lodash";
import { connect } from "react-redux";
import { listTags } from "../../features/myprofile/view/ticket/services";
import { getRequesterID } from "../../constants/common";

class SearchListBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSearch: "",
      valueStatus: "",
      valueTags: "",
      valueTypes: "",
    };
  }

  _handleSearch = (value) => {
    this.setState({
      valueSearch: value,
    });
  };

  _handleInput = (value, type) => {
    switch (type) {
      case "status":
        this.setState({
          ...this.state,
          valueStatus: value,
        });
        break;
      case "tags":
        this.setState({
          ...this.state,
          valueTags: value,
        });
        break;
      case "type":
        this.setState({
          ...this.state,
          valueTypes: value,
        });
        break;
      default:
        break;
    }
  };

  _searchSubmit = () => {
    let requester_id = getRequesterID();
    let _params = `${SEARCH_TICKET_PARAMS} + &query=type:ticket ${
      requester_id === null ? "" : `requester_id:${requester_id}`
    }`;
    !isEmpty(this.state.valueStatus)
      ? (_params += " status:" + this.state.valueStatus)
      : _params;
    !isEmpty(this.state.valueTags)
      ? (_params += " tags:" + this.state.valueTags)
      : _params;
    !isEmpty(this.state.valueSearch)
      ? (_params += " " + this.state.valueSearch)
      : _params;
    this.props.dpSearch(_params, this.props.page);
    this.props.checkParams(_params);
  };

  componentDidMount() {
    this.props.dpTags();
  }

  render() {
    const statusProps = SEARCH_TICKET.status;
    const tagsProps = SEARCH_TICKET.tags;
    const typesProps = SEARCH_TICKET.types;
    return (
      <div className="search-list-box">
        <div className="search-list-header"></div>
        <div className="search-list-content">
          <div className="search-input">
            <SearchBox
              handleSearch={this._handleSearch}
              valueSearch={this.state.valueSearch}
            />
          </div>
          <div className="search-select">
            <InputSelectBox
              {...statusProps}
              type={"status"}
              handleInput={this._handleInput}
              placeholder={"status"}
            />
            <InputSelectBox
              list={this.props.listTags}
              type={"tags"}
              placeholder={"tags"}
              handleInput={this._handleInput}
            />
            {/* <InputSelectBox
              {...typesProps}
              type={"type"}
              placeholder={"type"}
              handleInput={this._handleInput}
            /> */}
            <div className="search-submit" onClick={() => this._searchSubmit()}>
              <p>Search</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: get(state, "ticket.prePage", 1),
    listTags: get(state, "ticket.listTags", []),
  };
};

const mapDispatchToProps = {
  dpSearch: (data, page) => searchTicket(data, page),
  dpTags: () => listTags(),
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchListBox);
