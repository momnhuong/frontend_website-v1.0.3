import React, { Component } from "react";
import "./style.css";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="search-box">
        <input
          className="input-box"
          placeholder="search"
          name="searchB"
          defaultValue={this.props.valueSearch}
          onChange={(event) => this.props.handleSearch(event.target.value)}
        />
        <i className="fa fa-search" aria-hidden="true"></i>
      </div>
    );
  }
}

export default SearchBox;
