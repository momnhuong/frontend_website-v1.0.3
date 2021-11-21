import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../../../../../store/history";
import { Form, Input, Button } from "antd";
import { offLoading } from "../../../../../../app/services";

import Notification from "../../../../../../components/Notification";
import { Link } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { createCustomer } from "../../services/services";
import { checkVNPhone } from "../../../../../../utils/validate";

import "./create-customer.css";
import { from } from "seamless-immutable";

class AddCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onFinish = (values) => {
    // console.log("onHandleSubmit", values);
    this.props
      .dpCreateCustomer(values)
      .then((res) => {
        if (res.status === 201) {
          history.push("/list-customer");
          window.location.reload();
        } else {
          this.props.dispatchoffLoading();
          Notification("error", res.data.message);
          // console.log('reserro',res)
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
  renderformAdd() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <Form
        className="form-add-customer"
        layout="horizontal"
        size="large"
        onFinish={this.onFinish}
      >
        <Form.Item
          {...formItemLayout}
          label="Customer Name:"
          name="customer_name"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Customer Name" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Tax Number:"
          name="tax_code"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Tax Number" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Email:"
          name="main_email"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Email" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Phone Number:"
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
            { validator: checkVNPhone },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Phone Number" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Address:" name="address">
          <Input autoComplete="off" autoFocus placeholder="Address" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Fax number:" name="fax_number">
          <Input autoComplete="off" autoFocus placeholder="Fax number" />
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit" className="btn-add">
            <span>Add</span>
          </Button>
        </Form.Item>
      </Form>
    );
  }
  render() {
    return (
      <div className="create-customer">
        <div className="row-header">
          <Link to="/list-customer" className="btn-back">
            <LeftCircleOutlined />
            {/* Back */}
          </Link>
          <span className="title-create-customer">Create Customer</span>
        </div>

        {this.renderformAdd()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dpCreateCustomer: (data) => createCustomer(data),
  dispatchoffLoading: () => offLoading(),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
