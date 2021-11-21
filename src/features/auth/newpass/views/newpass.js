import { Button, Form, Input } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { IMAGES } from "../../../../assets";
import { VALIDATION } from "../../../../constants/config";
import { changepass } from "../../../myprofile/view/changepass/services";
import "./newpass.css";

class NewPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typepass: "password",
    };
    this.myRef = React.createRef();
  }

  handleChangeCheck = (name) => (event) => {
    console.log("handleChange");
    // this.setState({ checkSaveBill: !this.state.checkSaveBill }, () => {
    //   console.log('checkB', this.state.checkSaveBill);
    // });
  };
  onFinish = (values) => {
    this.props
      .dpLogin(values)
      .then((response) => {})
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  onFinish = (values) => {
    this.props.dispatchChangePass(values).then((response) => {
      if (response.status === 400) {
        if (this.myRef.current) {
          this.myRef.current.setFieldError("oldpass", response.data.message);
        }
      }
    });
  };
  render() {
    const passRequire = VALIDATION.PASSWORD;
    return (
      <div className="row forgetWrapper">
        <div className="forgetContentWrapper">
          <div className="forgetContent">
            <div className="forgetContentLeft">
              <div className="logo">
                <img src={IMAGES.forgot_password} alt="logo" />
              </div>
            </div>

            <div className="forgetContentRight">
              <div className="card-header">
                <div className="card-title">
                  <h4>Reset Password</h4>
                </div>
              </div>
              <p>Please enter your new password.</p>
              <div className="forgetForm">
                <Form
                  className="form-edit-customer"
                  layout="vertical"
                  size="large"
                  onFinish={this.onFinish}
                >
                  <Form.Item
                    label="Old Password:"
                    name="oldpass"
                    rules={[
                      {
                        required: true,
                        message: "Trường này không được để trống",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="New Password:"
                    name="newpass"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    label="Retype New Password:"
                    dependencies={["newpass"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue("newpass") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "The two passwords that you entered do not match!"
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Button block htmlType="submit" className="btn-login">
                      <span>Update</span>
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dispatchChangePass: (data) => changepass(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewPass));
