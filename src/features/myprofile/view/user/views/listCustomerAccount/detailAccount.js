import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Switch } from "antd";
import React, { Component } from "react";
import { animations } from "react-animation";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BoxLoading from "../../../../../../components/LoadingBox";
import Notification from "../../../../../../components/Notification";
import { passwordType } from "../../../../../../utils/validate";
import {
  detailAccountCustomer,
  getListCustomersAccount,
  getRule,
  updateCustomerAccount,
} from "../../services/services";
import "./detailAccount.css";
const style = {
  animation: animations.fadeInUp,
};
const { Option } = Select;

class DetailAccountCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailAccount: {},
      isLoading: true,
    };
  }

  onFinish = (values) => {
    console.log("onHandleSubmit", values);
    this.props
      .dpEditDetailCustomer(this.props.match.params.id, values)
      .then((res) => {
        if (res.status === 200) {
          this.props.dpdetailAccountCustomer(this.props.match.params.id);
          this.props.history.goBack();
          Notification("success", "Update success");
          this.props.dispatchGetListCustomer();
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
  onChangeStatus = () => {
    this.setState(
      {
        on_active: !this.state.on_active,
      },
      () => {
        console.log("onChangeStatus", this.state.on_active);
      }
    );
  };
  renderformEdit() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    let item = this.state.detailAccount;
    console.log("renderformEdit", item);
    // this.props.detailAccountCustomer &&
    // this.props.detailAccountCustomer.data &&
    // this.props.detailAccountCustomer.data.length > 0
    //   ? this.props.detailAccountCustomer.data[0]
    //   : [];
    console.log("renderformEdit", item);
    return (
      <Form
        className="form-edit-account"
        layout="horizontal"
        size="large"
        initialValues={{
          role: item.role,
          fullname: item.fullname,
          username: item.username,
          password: item.password,
          email: item.email,

          identity_card: item.identity_card,
          phone: item.phone,
          mobile: item.mobile,
          fax: item.fax,
          address: item.address,
          on_active: item.on_active || true,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          {...formItemLayout}
          name="role"
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
        <Form.Item {...formItemLayout} label="Email:" name="email" type="email">
          <Input autoComplete="off" autoFocus placeholder="Email" />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Phone:" name="phone">
          <Input autoComplete="off" autoFocus placeholder="Phone" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Mobile phone:" name="mobile">
          <Input autoComplete="off" autoFocus placeholder="Mobile phone" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Fax:" name="fax">
          <Input autoComplete="off" autoFocus placeholder="Fax" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Address:" name="address">
          <Input autoComplete="off" autoFocus placeholder="Address" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Status:" name="on_active">
          <Switch
            checked={this.state.on_active}
            className="btn-switch"
            onChange={() => {
              this.onChangeStatus();
            }}
          />
        </Form.Item>
        <Row>
          <Col offset={6}>
            <Form.Item>
              <Button block htmlType="submit" className="btn-login">
                <span>Update</span>
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
  componentDidMount() {
    let id =
      this.props.match && this.props.match.params
        ? this.props.match.params.id
        : undefined;

    this.props
      .dpdetailAccountCustomer(id)
      .then((res) => {
        if (res && res.data) {
          this.setState(
            {
              detailAccount: res.data,
              isLoading: false,
              on_active: res.data.on_active,
            },
            () => {
              console.log("componentDidMount", this.state.detailAccount);
            }
          );
        }
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
    console.log("componentDidMountdetail", this.props.detailAccountCustomer);
  }
  render() {
    console.log("DetailAccountCustomer", this.props.match.params.id);
    let { isLoading } = this.state;
    return (
      <div style={style} className="detail-account">
        <div className="card-header">
          <Link to="/customer-account">
            <LeftCircleOutlined />
          </Link>
          <div className="card-title">Account</div>
        </div>
        <Row gutter={[15, 15]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            {isLoading ? <BoxLoading /> : this.renderformEdit()}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  detailAccountCustomer: state.customer.detailAccountCustomerSuccess,
  listRole: state.customer.dataRuleSuccess,
});

const mapDispatchToProps = {
  dpEditDetailCustomer: (customer_id, data) =>
    updateCustomerAccount(customer_id, data),
  dpdetailAccountCustomer: (account_id) => detailAccountCustomer(account_id),
  dispatchGetListCustomerAccount: () => getListCustomersAccount(),
  dbGetRoleSuccess: () => getRule(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailAccountCustomer);
