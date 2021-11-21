import React, { Component } from "react";
import "./style.css";
import { IMAGES } from "../../assets";
import { get } from "lodash";
import { connect } from "react-redux";

class LoadingBox extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div
        className={`loading-box ${
          get(loading, "full", false) ? "full show" : "full hide"
        } ${get(loading, "popup", false) ? "popup" : ""}`}
      >
        <div className="loading-box-content">
          <img src={IMAGES.loading_icon} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: get(state, "root.loading"),
  };
};

export default connect(mapStateToProps, null)(LoadingBox);
