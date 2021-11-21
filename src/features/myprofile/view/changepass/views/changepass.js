import { Button, Form, Input } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { offLoading } from "../../../../../app/services";
import Notification from "../../../../../components/Notification";
import { history } from "../../../../../store/history";
import { passwordType } from "../../../../../utils/validate";
import { changepass } from "../services";
import { SESSION_KEY, VALIDATION } from "./../../../../../constants/config";
import "./changepass.css";

class ChangePassWord extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.myRef = React.createRef();
  }
  onFinish = (values) => {
    this.props.dispatchChangePass(values).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem(SESSION_KEY);
        history.push("/login");
        window.location.reload();
      } else {
        console.log(response);
        this.props.dpoffLoading();
        Notification("error", response.data.old_password[0]);
      }
    });
  };

  render() {
    const passRequire = VALIDATION.PASSWORD;
    return (
      <div className="container-fluid myprofile">
        <div className="row content_profile">
          <div className="content_password">
            <div className="changeForm">
              <Form
                className="form-chagepass"
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
                    { validator: passwordType },
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
                  <Button block htmlType="submit" className="btn-changpass">
                    <span>SAVE CHANGE</span>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  infoProfile: state.getProfile.dataSuccess,
});

const mapDispatchToProps = {
  dispatchChangePass: (data) => changepass(data),
  dpoffLoading: () => offLoading(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassWord);
