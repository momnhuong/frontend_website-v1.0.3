import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { hidePopup } from "../../../../app/services";
import Notification from "../../../../components/Notification";
import IMAGES from "../../../../constants/images";
import { history } from "../../../../store/history";
import { store } from "../../../../store";
import { countAlertOfCustomer, login, updateFcmToken } from "../services";
import "./styles.css";

class LoginPage extends Component {
  onFinish = (values) => {
    let token_firebase;

    const { userProfile } = store.getState().root;
    this.props.dpLogin(values).then((res) => {
      if (res.status === 200) {
        Notification("success", "Login success");

        if (userProfile && userProfile.data && userProfile.data.first_login) {
          history.push("/chage-pass");
          window.location.reload();
        } else {
          history.push("/");
          window.location.reload();
        }
      } else {
        Notification("error", res.data.message);
      }
    });
  };
  componentDidMount() {
    this.props.dispatchHidePopup();
  }

  render() {
    return (
      <div className="LoginWrapper">
        <div className="loginContentWrapper">
          <Row gutter={[0, 0]}>
            <Col span={12} className="loginRight">
              <div className="loginContentRight">
                <img className="loginImage" src={IMAGES.img_login} alt="logo" />
              </div>
            </Col>
            <Col span={12}>
              <div className="loginContent">
                <div className="headerWrapper">
                  {/* <img src={IMAGES.rectangleLogo} alt="logo" /> */}
                  <h4>
                    <FormattedMessage id="features.login.title" />
                  </h4>
                  <p>
                    <FormattedMessage id="features.login.detailLogin" />
                  </p>
                </div>
                <div className="loginForm">
                  <Form
                    layout="vertical"
                    // ref={this.myRef}
                    size="large"
                    onFinish={this.onFinish}
                  >
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: <FormattedMessage id="validate.required" />,
                        },
                      ]}
                    >
                      <Input
                        autoComplete="off"
                        autoFocus
                        placeholder="username"
                        prefix={<UserOutlined />}
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: <FormattedMessage id="validate.required" />,
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="password"
                        prefix={<LockOutlined />}
                      />
                    </Form.Item>
                    <Row>
                      <Link to="/forgetpass" className="forget-pass">
                        <FormattedMessage id="features.login.forgetpassword" />
                      </Link>
                    </Row>
                    <Form.Item>
                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        // loading={isLoading}
                        className="btn-login"
                      >
                        <span>
                          <FormattedMessage id="features.login.button" />
                        </span>
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  intl: PropTypes.object,
  dpLogin: PropTypes.func,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dpLogin: (data) => login(data),
  dispatchHidePopup: () => hidePopup(),
  dispatchupdateFcmToken: (data) => updateFcmToken(data),
  dbcountAlertOfCustomer: () => countAlertOfCustomer(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LoginPage));
// export default injectIntl(LoginPage);
