import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../../../../store/history";
import { hidePopup } from "../../../../../app/services";
import "./notification.css";

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  HidePopup = () => {
    this.props.dispatchHidePopup();
    history.push("/homepage");
    window.location.reload();
  };

  render() {
    return (
      <div className="wrapper-notification-cart">
        <div className="content-notification-cart">
          Chúng tôi đã gửi thông tin sản phẩm mong muốn của bạn tới đội ngũ
          sales, sẽ sớm có nhân viên liên hệ trực tiếp với bạn
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
          <button
            type="button"
            className="btn btn-default btn-cancel"
            onClick={() => {
              this.props.dispatchHidePopup();
            }}
          >
            Hủy
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dispatchHidePopup: () => hidePopup(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
