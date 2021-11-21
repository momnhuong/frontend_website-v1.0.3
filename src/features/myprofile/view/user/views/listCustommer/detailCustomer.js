import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { animations } from "react-animation";
import Notification from "../../../../../../components/Notification";
import moment from "moment";
import { LeftCircleOutlined, EditOutlined } from "@ant-design/icons";
import {
  editDetailCustomer,
  getDetailCustommer,
  getListCustomer,
  getListAccountOfCustomer,
} from "../../services/services";
import { getListProductOfCustomer } from "../../../../../products/services/services";
import { Table, Form, Input, Button, Row, Col, Tabs, Select,Switch } from "antd";

import { withRouter } from "react-router";
import * as Icon from "react-feather";
import "./detailCustomer.css";
const style = {
  animation: animations.fadeInUp,
};
const { Option } = Select;

class DetailCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingCustomerDetail: true,
    };
  }

  onFinish = (values) => {
    // console.log("onHandleSubmit", values);
    const id = this.props.detailCustomer.data.id;
    this.props
      .dpEditDetailCustomer(id, values)
      .then((res) => {
        if (res.status === 201) {
          this.props.dpgetDetailCustomer(id);
          Notification("success", "Update success");
          this.props.dispatchGetListCustomer();
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
    // console.log("onFinish", values);
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props
      .dpgetDetailCustomer(id)
      .then((res) => {
        this.setState({ 
          isLoadingCustomerDetail: false,
          on_active:res.data.on_active
        });
      })
      .catch((error) => console.log(error));

    await this.props.dpgetListAccountOfCustomer(id);
    await this.props.dbgetListProductOfCustomer(id);
  }

  onChangeStatus =()=> {
    this.setState({
      on_active: !this.state.on_active
    },()=>{
      console.log('onChangeStatus',this.state.on_active)
    })
   
  }

  renderListOfCustomer() {
    const { TabPane } = Tabs;
    let listAccountOfCustomer = this.props.listAccountofCustomer
      ? this.props.listAccountofCustomer.data
      : [];
    let listProductOfCustomer =
      this.props.listProductOfCustomer &&
      this.props.listProductOfCustomer.data &&
      this.props.listProductOfCustomer.data.length > 0
        ? this.props.listProductOfCustomer.data
        : [];
    console.log("listAccountOfCustomer", listAccountOfCustomer);
    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: "Username",
        dataIndex: "username",
      },
      {
        title: "Full Name",
        dataIndex: "fullname",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      { title: "Phone", dataIndex: "phone" },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Link to={`/customer-account/edit/${record.id}`}>
            <EditOutlined />
          </Link>
        ),
      },
    ];
    const columnProducts = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: "Picture",
        dataIndex: "product",
        render: (product) => {
          return (
            <img
              src={product.src}
              className="img-responsive"
              alt="name"
              style={{ height: "60px" }}
            />
          );
        },
      },
      {
        title: "System Name",
        render: (value) => {
          return value.system_name;
        },
      },
      {
        title: "Product Name",
        dataIndex: "product",
        render: (value) => {
          return value.name;
        },
      },
      {
        title: "Created",
        dataIndex: "created_at",
        render: (value) => {
          return moment(value).format('DD/MM/YYYY');
        },
      },
      {
        title: "Expired",
        render: (value) => {
          return moment(value.expired).format('DD/MM/YYYY');
        },
      },
    ];
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="List Account" key="1">
          <Link to="/customer-account/add">
            <Button type="button" className="btn btn-default btn-add">
              <Icon.Plus /> Add New
            </Button>
          </Link>
          <Table
            rowClassName={() => "editable-row"}
            dataSource={listAccountOfCustomer}
            columns={columns}
            className="table-content"
            // pagination={{
            //   total: this.props.listCustomer.data.total,
            //   // showTotal: (total) => `Tổng ${total}`,
            //   current: this.state.page,
            //   pageSize: this.state.page_size,
            //   // onChange:{(current) => this.setData(current)}
            //   onChange: (page) => {
            //     this.setState(
            //       {
            //         page: page,
            //       },
            //       () => {
            //         this.props.dispatchGetListCustomer(
            //           this.state.page,
            //           this.state.page_size
            //         );
            //       }
            //     );
            //   },
            // }}
          />
        </TabPane>
        <TabPane tab="List Product" key="2">
          <Link to="/list-product-customer">
            <Button type="button" className="btn btn-default btn-add">
              <Icon.Plus /> Add New
            </Button>
          </Link>
          <Table
            rowClassName={() => "editable-row"}
            dataSource={listProductOfCustomer}
            columns={columnProducts}
            className="table-content"
            // pagination={{
            //   total: this.props.listCustomer.data.total,
            //   // showTotal: (total) => `Tổng ${total}`,
            //   current: this.state.page,
            //   pageSize: this.state.page_size,
            //   // onChange:{(current) => this.setData(current)}
            //   onChange: (page) => {
            //     this.setState(
            //       {
            //         page: page,
            //       },
            //       () => {
            //         this.props.dispatchGetListCustomer(
            //           this.state.page,
            //           this.state.page_size
            //         );
            //       }
            //     );
            //   },
            // }}
          />
        </TabPane>
      </Tabs>
    );
  }
  renderformEdit() {
    const { isLoadingCustomerDetail } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    // console.log("renderformEdit", this.props);
    if (isLoadingCustomerDetail) return;
    if (this.props.detailCustomer && this.props.detailCustomer.data) {
      let item = this.props.detailCustomer.data;
      // console.log("detailCustomer", item);
      return (
        <Form
          className="form-edit-customer"
          layout="horizontal"
          size="large"
          initialValues={{
            customer_name: item.customer_name|| '',
            main_email: item.main_email|| '',
            phone_number: item.phone_number|| '',
            fax_number: item.fax_number|| '',
            address: item.address|| '',
            tax_code: item.tax_code|| '',
            on_active:item.on_active || true
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            {...formItemLayout}
            label="Company:"
            name="customer_name"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống",
              },
            ]}
          >
            <Input autoComplete="off" autoFocus placeholder="Company" />
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
            <Input autoComplete="off" placeholder="email" type="text" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Phone number:"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống",
              },
            ]}
          >
            <Input autoComplete="off" placeholder="Phone number" type="text" />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Fax:" name="fax_number">
            <Input autoComplete="off" placeholder="Fax" type="text" />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Address:" name="address">
            <Input autoComplete="off" placeholder="Adress" type="text" />
          </Form.Item>

          <Form.Item {...formItemLayout} label="Status:" name="on_active">
            <Switch  checked={this.state.on_active} className="btn-switch" onChange={()=>{this.onChangeStatus()}} />
          </Form.Item>
          <Row >
          <Col offset = {6}>
            <Form.Item >
              <Button  block htmlType="submit" className="btn-login-cus">
                <span>Update</span>
              </Button>
            </Form.Item>
          </Col>
        </Row>
          {/* <Form.Item>
            <Button block htmlType="submit" className="btn-login">
              <span>Update</span>
            </Button>
          </Form.Item> */}
        </Form>
      );
    }
  }
  render() {
    // console.log("componentDidMountrender", this.props);

    return (
      <div style={style} className="detail-account-customer">
        <div className="card-header">
          <Link to="/list-customer">
            <LeftCircleOutlined />
          </Link>
          <div className="card-title">Edit Customer</div>
        </div>
        <Row gutter={[15, 15]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            {this.renderformEdit()}
          </Col>
        </Row>
        {this.props.listAccountofCustomer &&
        this.props.listAccountofCustomer.data &&
        this.props.listAccountofCustomer.data.length > 0 ? (
          <div className="listAccountOfCustomer">
            {this.renderListOfCustomer()}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  detailCustomer: state.customer.detailCustomerSuccess,
  listAccountofCustomer: state.customer.listAccountofCustomerSuccess,
  listProductOfCustomer: state.products.listProductOfCustomerSuccess,
});

const mapDispatchToProps = {
  dispatchGetListCustomer: () => getListCustomer(),
  dpEditDetailCustomer: (customer_id, data) =>
    editDetailCustomer(customer_id, data),
  dpgetDetailCustomer: (customer_id) => getDetailCustommer(customer_id),
  dpgetListAccountOfCustomer: (customer_id) =>
    getListAccountOfCustomer(customer_id),
  dbgetListProductOfCustomer: (customer_id) =>
    getListProductOfCustomer(customer_id),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DetailCustomer));
