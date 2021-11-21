import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { offLoading } from "../../../../../../app/services";
import Notification from "../../../../../../components/Notification";
import { passwordType } from "../../../../../../utils/validate";
import {
  createCustomerAccount,
  getListCustomer,
  getListCustomersAccount,
  getRule,
} from "../../services/services";
import "./create-customer-account.css";

class AddCustomerAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.dbGetRoleSuccess();
    this.props.dispatchGetListCustomer();
  }
  onFinish = (values) => {
    console.log("onHandleSubmit", values);
    this.props
      .dpCreateCustomerAccount(values)
      .then((res) => {
        if (res.status === 201) {
          this.props.dispatchGetListCustomerAccount();
          this.props.history.goBack();
        } else {
          this.props.dboffLoading();
          Notification("error", res.data.username[0]);
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
          name="customer_of_id"
          label="List Customer:"
          rules={[
            { required: true, message: "Trường này không được để trống" },
          ]}
        >
          <Select>
            {this.props.listCustomer &&
              this.props.listCustomer.data &&
              this.props.listCustomer.data.results.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.customer_name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="role_id"
          label="Role:"
          rules={[
            { required: true, message: "Trường này không được để trống" },
          ]}
        >
          <Select>
            {this.props.listRole.data.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Full name:"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Full name" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Username:"
          name="username"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Username" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Password:"
          name="password"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
            { validator: passwordType },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Password" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Email:"
          name="email"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input
            autoComplete="off"
            type="email"
            autoFocus
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col offset={6} style={{ width: "100%" }}>
              <Button block htmlType="submit" className="btn-add">
                <span>ADD</span>
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    );
  }
  render() {
    return (
      <div className="create-customer-account">
        <div className="row-header">
          <Link to="/customer-account" className="btn-back">
            <LeftCircleOutlined />
            {/* Back */}
          </Link>
          <span className="title-create-customer">create customer account</span>
        </div>

        <Row gutter={[15, 15]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            {this.renderformAdd()}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listRole: state.customer.dataRuleSuccess,
  listCustomer: state.customer.dataSuccess,
});

const mapDispatchToProps = {
  dpCreateCustomerAccount: (data) => createCustomerAccount(data),
  dbGetRoleSuccess: () => getRule(),
  dispatchGetListCustomerAccount: () => getListCustomersAccount(),
  dispatchGetListCustomer: () => getListCustomer(),
  dboffLoading: () => offLoading(),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerAccount);
