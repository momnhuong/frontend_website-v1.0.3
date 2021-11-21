import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import BoxLoading from "../../../../../components/LoadingBox";
import Notification from "../../../../../components/Notification";
import { getListProduct } from "../../../../products/services/services";
import { getListPackageProduct } from "../../package/services/services";
import {
  detailProductCustomer,
  getDetailProductOfCustomer,
  getListContractOfCustomer,
  updateItemproductOfCustomer,
} from "../services/services";
import "./styles/AddProductOfCustomer.css";
class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      id_product: null,
      package_id: null,
      on_active: true,
    };
  }
  async componentDidMount() {
    let id_product = this.props.match.params.id;
    await this.props
      .dpdetailProductCustomer(id_product)
      .then((res) => {
        if (res.status === 200) {
          this.setState(
            {
              detailProductCustomer: res.data,
              expired: res.data.expired
                ? moment(res.data.expired, "YYYY-MM-DD")
                : null,
            },
            (res) => {
              this.props.dispatchgetListPackageProduct(
                this.state.detailProductCustomer.product.id
              );
            }
          );
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
    await this.props
      .dpgetDetailProductOfCustomer(this.props.location.state.id_customer)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            listProductOfCustomer: res.data.results,
          });
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
    await this.props.dpgetListContractOfCustomer(
      this.props.location.state.id_customer
    );
    await this.props
      .dispatchListProducts()
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            isLoading: false,
            listProduct: res.data.results,
          });
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  }
  handleProductChange = (value) => {
    this.setState(
      {
        id_product: value,
        package_id: null,
      },
      () => {
        this.props.dispatchgetListPackageProduct(this.state.id_product);
      }
    );
  };
  onFinish = (values) => {
    let product_of_customer_id = this.props.match.params.id;
    let expirednew =
      this.state.expired === values.expired
        ? values.expired
        : this.state.expired;
    // console.log("values: ", expirednew);
    let data = {
      expired: moment(expirednew).format(),
      system_name: `${values.system_name}`,
      system_id: `${values.system_id}`,
      address_ip: `${values.address_ip}`,
      contract_id: `${values.contract_id}`,
      on_active: this.state.on_active,
    };
    // console.log('onFinish',data)
    this.props
      .dbupdateItemproductOfCustomer(product_of_customer_id, data)
      .then((res) => {
        if (res.status === 200) {
          Notification("success", "Update product success");
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
  onChangeDate = (values) => {
    console.log("onChangeDate", values);
    this.setState(
      {
        expired: moment(values).format(),
      },
      () => {
        console.log(this.state.expired);
      }
    );
  };
  renderUI() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
    };
    let { listProductOfCustomer, detailProductCustomer } = this.state;
    let listProduct =
      this.props.listProduct &&
      this.props.listProduct.data &&
      this.props.listProduct.data.results.length > 0
        ? this.props.listProduct.data.results
        : [];
    let listPackageProduct =
      this.props.listPackageProduct &&
      this.props.listPackageProduct.data &&
      this.props.listPackageProduct.data.length > 0
        ? this.props.listPackageProduct.data
        : [];
    let detailProductCustomernew =
      this.props.detailProductOfCustomer &&
      this.props.detailProductOfCustomer.data
        ? this.props.detailProductOfCustomer.data
        : {};
    let listContractOfCustomerNew =
      this.props.listContractOfCustomer &&
      this.props.listContractOfCustomer.data
        ? this.props.listContractOfCustomer.data
        : [];
    console.log("detailProductCustomernew", detailProductCustomernew);
    const dateFormat = "YYYY-MM-DD";
    return (
      <Form
        className="form-add-product-customer"
        layout="vertical"
        size="large"
        // form={form}
        initialValues={{
          system_name: detailProductCustomernew.system_name,
          product_id: detailProductCustomernew.product.id,
          package_id: detailProductCustomernew.package.id,
          expired:
            detailProductCustomernew && detailProductCustomernew.expired
              ? moment(detailProductCustomernew.expired)
              : null,
          address_ip: detailProductCustomernew.address_ip,
          system_id: detailProductCustomernew.system_id,
          contract_id:
            detailProductCustomernew &&
            detailProductCustomernew.contract !== null
              ? detailProductCustomernew.contract.id
              : null,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          {...formItemLayout}
          name="contract_id"
          label="Contract:"
          rules={[
            { required: true, message: "Trường này không được để trống" },
          ]}
        >
          <Select>
            {listContractOfCustomerNew.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.contract_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="System Name:"
          name="system_name"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="System Name" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="product_id"
          label="Product:"
          rules={[
            { required: true, message: "Trường này không được để trống" },
          ]}
        >
          <Select
            onChange={this.handleProductChange}
            // defaultValue={listProduct[0].id}
          >
            {listProduct.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <React.Fragment>
          <Form.Item
            {...formItemLayout}
            name="package_id"
            label="Package:"
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}
          >
            <Select
              value={this.state.package_id}
              onChange={this.onPackageIdChange}
            >
              {listPackageProduct.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="expired"
            label="Expired:"
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}
          >
            <DatePicker
              defaultValue={this.state.expired}
              onChange={this.onChangeDate}
            />
          </Form.Item>
        </React.Fragment>
        <Form.Item
          {...formItemLayout}
          label="IP Address:"
          name="address_ip"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="IP Address" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="System ID:"
          name="system_id"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="System ID" />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Status:" name="on_active">
          <Switch
            checked={this.state.on_active}
            onChange={() => {
              this.onChangeStatus();
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" className="btn-add-product customer">
            <span>UPDATE</span>
          </Button>
        </Form.Item>
      </Form>
    );
  }

  render() {
    let { isLoading } = this.state;
    return <div>{isLoading ? <BoxLoading /> : this.renderUI()}</div>;
  }
}

const mapStateToProps = (state) => ({
  listProduct: state.products.listProductSuccess,
  listPackageProduct: state.packages.listPackageProductSuccess,
  detailProductOfCustomer:
    state.productofcustomer.detailProductOfCustomerSuccess,
  listContractOfCustomer: state.productofcustomer.listContractOfCustomerSuccess,
});

const mapDispatchToProps = {
  dispatchListProducts: () => getListProduct(),
  dpgetDetailProductOfCustomer: (order_id) =>
    getDetailProductOfCustomer(order_id),
  dispatchgetListPackageProduct: (product_id, page, page_size) =>
    getListPackageProduct(product_id, page, page_size),
  dpdetailProductCustomer: (product_of_customer_id) =>
    detailProductCustomer(product_of_customer_id),
  dpgetListContractOfCustomer: (customer_id) =>
    getListContractOfCustomer(customer_id),
  dbupdateItemproductOfCustomer: (product_of_customer_id, data) =>
    updateItemproductOfCustomer(product_of_customer_id, data),
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
