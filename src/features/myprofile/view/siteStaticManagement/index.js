import { Button, Form, Input, Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import Notification from "../../../../components/Notification";
import { staticInfo } from "../../../auth/login/services";
import { updateStatic } from "./service/services";
import "./styles.css";

class SiteStaticManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.props.dbstaticInfo();
  }
  onFinish = (values) => {
    console.log("onHandleSubmit", values);
    this.props
      .dpupdateStatic(values)
      .then((res) => {
        if (res.status === 201) {
          Notification("success", "Update Info Static success");
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
  renderFormEditSaticInfo() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    let { staticInfo } = this.props;
    console.log("staticInfo", staticInfo);
    return (
      <Form
        className="form-static-management"
        layout="horizontal"
        size="large"
        initialValues={{
          company_name:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.company_name
              : "",
          email:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.email
              : "",
          hotline:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.hotline
              : "",
          registration_address:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.registration_address
              : "",
          tranding_address:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.tranding_address
              : "",
          tax_code:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.tax_code
              : "",
          account_number:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.account_number
              : "",
          account_holder:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.account_holder
              : "",
          bank:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.bank
              : "",
          facebook:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.facebook
              : "",
          instagram:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.instagram
              : "",
          twitter:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.twitter
              : "",
          linkedin:
            this.props.staticInfo && this.props.staticInfo.data
              ? this.props.staticInfo.data.linkedin
              : "",
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          {...formItemLayout}
          label="Company Name:"
          name="company_name"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Company Name" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Email:" name="email">
          <Input autoComplete="off" autoFocus placeholder="Email" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Hotline:" name="hotline">
          <Input autoComplete="off" autoFocus placeholder="Hotline" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Tax code:" name="tax_code">
          <Input autoComplete="off" autoFocus placeholder="Tax code" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Account number:"
          name="account_number"
        >
          <Input autoComplete="off" autoFocus placeholder="Account number" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Account holder:"
          name="account_holder"
        >
          <Input autoComplete="off" autoFocus placeholder="Account holder" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Bank name:" name="bank">
          <Input autoComplete="off" autoFocus placeholder="Bank name" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Link Facebook:" name="facebook">
          <Input autoComplete="off" autoFocus placeholder="Link Facebook" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Link Instagram:" name="instagram">
          <Input autoComplete="off" autoFocus placeholder="Link Instagram" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Link Twitter:" name="twitter">
          <Input autoComplete="off" autoFocus placeholder="Link Twitter" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Link Linkedin:" name="linkedin">
          <Input autoComplete="off" autoFocus placeholder="Link Linkedin" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Registration address:"
          name="registration_address"
        >
          <Input
            autoComplete="off"
            autoFocus
            placeholder="Registration address"
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Tranding address:"
          name="tranding_address"
        >
          <Input autoComplete="off" autoFocus placeholder="Tranding address" />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" className="btn-login">
            <span>Update</span>
          </Button>
        </Form.Item>
      </Form>
    );
  }
  render() {
    return (
      <div className="static-management">
        <Row>
          <span className="title-static-management">Configuration</span>
        </Row>

        {this.renderFormEditSaticInfo()}
        <div className="row-header"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  staticInfo: state.auth.staticInfoSuccess,
});

const mapDispatchToProps = {
  dbstaticInfo: () => staticInfo(),
  dpupdateStatic: (data) => updateStatic(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteStaticManagement);
