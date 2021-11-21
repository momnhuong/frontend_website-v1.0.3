import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import "../header/header.css";

class Lang extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Link className="nav-link" to="#" id="navbarDropdown">
          <ReactCountryFlag
            countryCode="VN"
            svg
            style={{
              width: "2em",
              height: "2em",
            }}
            title="VN"
          />
        </Link>
        <div className="dropdown-content">
          <Link className="dropdown-item" to="#">
            <ReactCountryFlag
              countryCode="US"
              svg
              style={{
                width: "2em",
                height: "2em",
              }}
              title="US"
            />
            <span>English</span>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Lang);
