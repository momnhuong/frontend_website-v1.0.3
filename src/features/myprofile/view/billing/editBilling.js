import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Switch } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BoxLoading from "../../../../components/LoadingBox";
import "./edit.css";
import {
  detailBilling,
  editBilling,
  getListBilling,
} from "./services/services";

class EditBilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_status: true,
      payment_time: moment().format(),
      detailBilling: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    // let id_billing = this.props.mar
    this.props
      .pbdetailBilling(this.props.match.params.id)
      .then((res) => {
        this.setState({
          detailBilling: res.data,
          payment_status: res.data.payment_status,
          isLoading: false,
        });
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
    console.log("pbdetailBilling", this.props.match.params.id);
    // console.log('detailBilling',this.props.detailBilling)
  }

  onChangeStatus = () => {
    this.setState(
      {
        payment_status: !this.state.payment_status,
      },
      () => {
        console.log("onChangeStatus", this.state.payment_status);
      }
    );
  };
  onChangeDate = (values) => {
    console.log("onChangeDate", values);
    this.setState(
      {
        payment_time: moment(values).format(),
      },
      () => {
        console.log(this.state.payment_time);
      }
    );
  };
  onFinish = (values) => {
    let data = {
      invoice_number: values.invoice_number,
      payment_status: this.state.payment_status,
      payment_time: this.state.payment_time,
    };
    console.log("onFinish", data);
    this.props
      .dpeditBilling(this.props.match.params.id, data)
      .then((res) => {
        this.props.dbgetListBilling();
        this.props.history.goBack();
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    let { detailBilling, isLoading } = this.state;
    return (
      <React.Fragment>
        {isLoading ? (
          <BoxLoading />
        ) : (
          <React.Fragment>
            <Row className="row-header">
              <Link to="/list-billing" className="btn-back">
                <LeftCircleOutlined />
              </Link>
              <span className="title-create-customer">Edit Billing</span>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <Form
                  className="form-add-billing"
                  layout="horizontal"
                  size="large"
                  initialValues={{
                    invoice_number: detailBilling.invoice_number,
                    payment_status: detailBilling.payment_status,
                    payment_time: detailBilling
                      ? moment(detailBilling.payment_time)
                      : null,
                  }}
                  onFinish={this.onFinish}
                >
                  <Form.Item
                    {...formItemLayout}
                    label="Invoice number:"
                    name="invoice_number"
                    rules={[
                      {
                        required: true,
                        message: "Trường này không được để trống",
                      },
                    ]}
                  >
                    <Input
                      autoComplete="off"
                      autoFocus
                      placeholder="Invoice number"
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    name="payment_time"
                    label="Payment time:"
                    rules={[
                      {
                        required: true,
                        message: "Trường này không được để trống",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={this.onChangeDate}
                    />
                  </Form.Item>
                  {/* </React.Fragment> */}
                  <Form.Item
                    {...formItemLayout}
                    label="Status:"
                    name="payment_status"
                    rules={[
                      {
                        required: true,
                        message: "Trường này không được để trống",
                      },
                    ]}
                  >
                    <Switch
                      checked={this.state.payment_status}
                      onChange={() => {
                        this.onChangeStatus();
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      block
                      htmlType="submit"
                      className="btn-cancel"
                      onClick={() => {
                        this.handleCancel();
                      }}
                    >
                      <span>Cancel</span>
                    </Button>
                    <Button block htmlType="submit" className="btn-add-billing">
                      <span>Add</span>
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  detailBilling: state.billing.detailBillingSuccess,
});

const mapDispatchToProps = {
  dbgetListBilling: () => getListBilling(),
  pbdetailBilling: (billing_id) => detailBilling(billing_id),
  dpeditBilling: (billing_id, data) => editBilling(billing_id, data),
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBilling);
