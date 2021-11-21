import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "./../../features/auth/login/services";
import { hidePopup } from "../../app/services";
import { IMAGES } from "../../assets";
import { SESSION_KEY } from "../../constants/config";
import { history } from "../../store/history";
import { CloseOutlined } from "@ant-design/icons";
import { Row, Col, Button } from "antd";

import "./styles.css";
import { ApiToken } from "../../features/myprofile/view/ticket/services";
import { getApiToken } from "../../constants/common";
import { deleteApiToken } from "../../utils/utils";

class BoxLogout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  logout = () => {
    this.setState({ modalIsOpen: false });
    this.props.dpLogout();
    localStorage.removeItem(SESSION_KEY);
    // this.props.dispatchHidePopup();
    // history.push("/login");
    // window.location.reload();
  };

  render() {
    return (
      <div className="box_logout">
        <div className="off_box">
          <Row className="modal-header">
            <h6 className="modal-title">Thông báo</h6>
            <Link
              className="close"
              to="#"
              onClick={() => {
                this.props.dispatchHidePopup();
              }}
            >
              <CloseOutlined />
            </Link>
          </Row>
        </div>
        <div className="content_box_logout">
          <p>Bạn có chắc muốn kết thúc phiên làm việc không?</p>
        </div>

        <div className="btn_gr_logout">
          <Button
            type="button"
            className="btn btn-default btn_logout"
            onClick={this.logout}
          >
            Đăng xuất
          </Button>
          <Button
            type="button"
            className="btn btn-default btn_cancel_logout"
            onClick={() => {
              this.props.dispatchHidePopup();
            }}
          >
            Huỷ
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dpLogout: () => logout(),
  dispatchHidePopup: (popupType) => hidePopup(popupType),
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxLogout);
