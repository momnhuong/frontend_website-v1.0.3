import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { get, isEmpty } from "lodash";

class ErrorMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkError: false,
    };
  }

  // componentDidUpdate(prevProps) {
  //   console.log("didupdate errorrrrr");
  //   if (!isEmpty(this.props.error) || prevProps.error) {
  //     console.log("didupdate if");
  //     setTimeout(() => {
  //       this.setState({
  //         ...this.state,
  //         checkError: false,
  //       });
  //     }, 3000);
  //     this.setState({
  //       ...this.state,
  //       checkError: true,
  //     });
  //   }
  // }

  render() {
    return (
      <div
        className={`error-message-box ${
          !isEmpty(this.props.error) ? "show" : ""
        }`}
      >
        <div className="error-message-content">
          <p>{this.props.error}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: get(state, "root.error"),
  };
};

export default connect(mapStateToProps, null)(ErrorMessageBox);
