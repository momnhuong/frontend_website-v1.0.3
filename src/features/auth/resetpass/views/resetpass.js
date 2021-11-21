import { Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { IMAGES } from "../../../../assets";
import { UI } from "../../../../components";
import { parseParams } from "../../../../utils/fotmat";
import { resetComplete } from "../services";
import "./resetpass.css";

class ResetPass extends Component {
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

  onHandleSubmit = (values) => {
    if (values.newpassword !== values.renewpassword) {
      this.myRef.current.setFieldError(
        "newpassword",
        "Hai mật khẩu không khớp"
      );
      this.myRef.current.setFieldError(
        "renewpassword",
        "Hai mật khẩu không khớp"
      );
    } else {
      let parsed = parseParams(this.props.history.location.search);
      let param = {
        password: values.newpassword,
        token: parsed.token,
        uidb64: parsed.uidb64,
      };
      this.props
        .dispatchResetComplete(param)
        .then((response) => {
          if (response.status === 401) {
            this.myRef.current.setFieldError(
              "newpassword",
              response.data.message
            );
            this.myRef.current.setFieldError(
              "renewpassword",
              response.data.message
            );
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  };
  render() {
    console.log("parseParams", parseParams(this.props.history.location.search));
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
                  <h4>Recover your password</h4>
                </div>
              </div>
              <p>
                Please enter your email address and we'll send you instructions
                on how to reset your password.
              </p>
              <div className="forgetForm">
                <UI.Formik
                  ref={this.myRef}
                  initialValues={{ newpassword: "", renewpassword: "" }}
                  validationSchema={UI.yup.object().shape({
                    newpassword: UI.yup
                      .string()
                      .required("Trường này không được để trống"),
                    renewpassword: UI.yup
                      .string()
                      .required("Trường này không được để trống"),
                  })}
                  onSubmit={this.onHandleSubmit}
                  render={(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <ul className="box-login">
                        <li>
                          <UI.Field
                            {...props}
                            name="newpassword"
                            type="password"
                            placeholder="Enter new pass"
                            value={props.values.newpassword}
                            onChange={props.handleChange}
                            autoComplete="off"
                            leftImage={IMAGES.icon_hide}
                          />
                        </li>
                        <li>
                          <UI.Field
                            {...props}
                            name="renewpassword"
                            type="password"
                            placeholder="Enter re  new pass"
                            value={props.values.renewpassword}
                            onChange={props.handleChange}
                            autoComplete="off"
                            leftImage={IMAGES.icon_hide}
                          />
                        </li>
                      </ul>

                      <ul className="gr-btn">
                        <li>
                          <Link to="/login">Back to Login</Link>
                        </li>
                        <li>
                          {" "}
                          <Button
                            type="primary"
                            size="large"
                            block
                            htmlType="submit"
                          >
                            Recover Password
                          </Button>
                        </li>
                      </ul>
                    </form>
                  )}
                />
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
  dispatchResetComplete: (data) => resetComplete(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPass));
