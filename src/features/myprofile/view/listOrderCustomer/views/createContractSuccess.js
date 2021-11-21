import React, { Component } from "react";
import { connect } from "react-redux";
import { hidePopup } from "../../../../../app/services";
import "./popup.css";

class CreateContractSuccess extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  HidePopup = () => {
    this.props.dispatchHidePopup();
    window.location.reload();
  };

  render() {
    return (
      <div className="wrapper-notification-contract">
        <div className="content-notification-contract">
          Create Contract Success!
        </div>
        <div className="btn-close">
          <button
            type="button"
            className="btn btn-default btn-action"
            onClick={() => {
              this.HidePopup();
            }}
          >
            Đồng ý
          </button>
          {/* <button
            type="button"
            className="btn btn-default btn-cancel"
            onClick={() => {
              this.props.dispatchHidePopup();
            }}
          >
            Hủy
          </button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dispatchHidePopup: () => hidePopup(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContractSuccess);
