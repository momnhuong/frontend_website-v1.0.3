import { Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGES } from "../../../../assets";
import { UI } from "../../../../components";
import { emailRecover } from "../services";
import "./styles.css";

class ForgetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typepass: "password",
    };
    this.myRef = React.createRef();
  }

  onHandleSubmit = (values) => {
    this.props
      .dispatchEmailRecover(values)
      .then((response) => {
        switch (response.status) {
          case 200:
            return this.myRef.current.setFieldError(
              "email",
              response.data.message
            );
            break;
          case 400:
            return this.myRef.current.setFieldError(
              "email",
              response.data.email
                ? response.data.email[0]
                : response.data.message
            );
            break;

          default:
            break;
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  render() {
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
                  initialValues={{ email: "" }}
                  validationSchema={UI.yup.object().shape({
                    email: UI.yup
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
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={props.values.email}
                            onChange={props.handleChange}
                            autoComplete="off"
                            leftImage={IMAGES.icons_email}
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
  dispatchEmailRecover: (data) => emailRecover(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPass);
