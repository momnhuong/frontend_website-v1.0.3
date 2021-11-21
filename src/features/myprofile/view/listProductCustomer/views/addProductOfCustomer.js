import React, { Component } from "react";
import { connect } from "react-redux";
import { UI } from "../../../../../components";
import { FastField } from "formik";
import SelectField from "../../../../../components/Formik/SelectField";
import LoadingBox from "../../../../../components/LoadingBox";
import NoData from "../../../../../components/nodata";
import {
  Form,
  Input,
  Button,
  Table,
  Select,
  DatePicker,
  Switch,
  Space,
} from "antd";
import {
  getDetailProductOfCustomer,
  createProductOfCustomer,
  updateStatusProductOfCustomer,
  getListContractOfCustomer,
} from "../services/services";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { getListPackageProduct } from "../../package/services/services";
import { getListProduct } from "../../../../products/services/services";
import moment from "moment";
import "./styles/AddProductOfCustomer.css";
import { values } from "lodash";
import { withRouter } from "react-router";
import { store } from "../../../../../store";

class AddProductOfCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      searchString: "",
      page: 1,
      page_size: 1000,
      dataSource: [],
      total: undefined,
      id_product: null,
      package_id: null,
    };
    this.myRef = React.createRef();
  }
  async componentDidMount() {
    const { userProfile } = store.getState().root;
    let id_customer = this.props.location.state.id_customer;
    await this.props
      .dpgetDetailProductOfCustomer(id_customer)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            id_product: res.data.results[0].id,
          });
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
    await this.props.dpgetListContractOfCustomer(id_customer);
    await this.props
      .dispatchListProducts( this.state.searchString,
        this.state.page,
        this.state.page_size)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            isLoading: true,
          });
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  }
  renderListOrder() {
    let listProductCustomer =
      this.props.detailProductCustomerSuccess &&
      this.props.detailProductCustomerSuccess.data &&
      this.props.detailProductCustomerSuccess.data.results.length > 0
        ? this.props.detailProductCustomerSuccess.data.results
        : [];

    let listProductNew = [];
    // if (listProduct && listProduct.length > 0) {
    //   listProduct.map((item, index) => {
    //     let item_Created = listCreated.find(
    //       (item_Created) => item_Created.product_id === item.id
    //     );
    //     item = Object.assign(item, item_Created);

    //     listProductNew.push(item);
    //     console.log("listProductNew", listProductNew);
    //   });
    const columns = [
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
        title: "Package Name",
        dataIndex: "package",
        render: (value) => {
          return value !== null ? value.name : "";
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
        title: "Status",
        dataIndex: "on_active",
        render: (record, rowIndex) => {
          console.log("status", record);
          return (
            <Switch
              checked={record}
              onChange={() => {
                this.onChangeStatus(record, rowIndex);
              }}
            />
          );
        },
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link
              to={{
                pathname: `/list-product-customer/edit/${record.id}`,
                state: { id_customer: this.props.location.state.id_customer },
              }}
              // to={`/list-product-customer/edit/${record.id}`}
            >
              <EditOutlined />
            </Link>
          </Space>
        ),
      },
    ];
    return (
      <Table
        rowClassName={() => "editable-row"}
        dataSource={listProductCustomer}
        columns={columns}
        className="table-content"
      />
    );
  }
  onChangeStatus = (record, rowIndex) => {
    console.log(`switch to ${record}`);
    console.log("rowIndex", rowIndex);
    this.props
      .dispatchupdateStatusProductOfCustomer(rowIndex.id)
      .then((res) => {
        this.props.dpgetDetailProductOfCustomer(
          this.props.location.state.id_customer
        );
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
  };
  onFinish = (values) => {
    console.log("values: ", moment(values.expired).format());
    let customer_id = this.props.location.state.item.customer.id;
    let data = {
      product_id: `${values.product_id}`,
      package_id: `${values.package_id}`,
      customer_id: `${customer_id}`,
      address_ip: `${values.ip_prouduct}`,
      contract_id: `${values.contract_id}`,
      system_name: `${values.system_name}`,
      system_id: `${values.system_id}`,
      on_active: true,
      expired: moment(values.expired),
    };
    this.props
      .dispatchcreateProductOfCustomer(data)
      .then((res) => {
        if (res.status === 201) {
          this.props
            .dpgetDetailProductOfCustomer(customer_id)
            .then((res) => {
              if (res.status === 200) {
                console.log("ProductOfCustomer", res.data);
              }
            })
            .catch((message_code) => {
              console.log("error: ", message_code);
            });
        } else {
          if (res.status === 400) {
            if (this.myRef.current) {
              this.myRef.current.setFieldError(
                "product_id",
                res.data.non_field_errors[0]
              );
            }
          }
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
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
  onPackageIdChange = (value) => {
    this.setState({
      package_id: value,
    });
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
  render() {
    console.log("addproduct", this.props);
    let infoOrder = this.props.location.state.item;
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
    let listContractOfCustomerNew =
      this.props.listContractOfCustomer &&
      this.props.listContractOfCustomer.data
        ? this.props.listContractOfCustomer.data
        : [];
    // console.log("addproduct", this.props.location.state);
    // const lstProduct = listProduct.map((item) => {
    //   return {
    //     label: item.name,
    //     value: item.id,
    //   };
    // });
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
    };

    let infoCustomer =
      this.props.detailProductCustomerSuccess &&
      this.props.detailProductCustomerSuccess.data
        ? this.props.detailProductCustomerSuccess.data.customer
        : {};
    return (
      <div className="detail-order product">
        <div className="title-add">Choose Product</div>
        <Form
          className="form-add-product-customer"
          layout="vertical"
          size="large"
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
              <DatePicker onChange={this.onChangeDate} />
            </Form.Item>
          </React.Fragment>
          <Form.Item
            {...formItemLayout}
            label="IP Address:"
            name="ip_prouduct"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống",
              },
            ]}
          >
            <Input autoComplete="off" autoFocus placeholder="IP Address" />
          </Form.Item>
          <Form.Item {...formItemLayout} label="System ID:" name="system_id">
            <Input autoComplete="off" autoFocus placeholder="System ID" />
          </Form.Item>
          <Form.Item>
            <Button
              block
              htmlType="submit"
              className="btn-add-product customer"
            >
              <span>ADD</span>
            </Button>
          </Form.Item>
        </Form>

        {this.state.isLoading ? (
          <React.Fragment>
            {" "}
            <div className="title-list-product">
              List product of
              {/* {infoCustomer.customer_name} */}
            </div>
            <div className="name-order">
              <span>System {infoOrder && infoOrder.system_id}</span>
            </div>
            {this.renderListOrder()}
          </React.Fragment>
        ) : (
          <LoadingBox />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listContractOfCustomer: state.productofcustomer.listContractOfCustomerSuccess,
  listProductCustomerSuccess:
    state.productofcustomer.deatailProductOfCustomerSuccess,
  listProduct: state.products.listProductSuccess,
  createProductOfCustomerSuccess:
    state.productofcustomer.createProductOfCustomerSuccess,
  listProductOfCustomer:
    state.productofcustomer.deatailProductOfCustomerSuccess,
  detailProductCustomerSuccess:
    state.productofcustomer.detailProductCustomerSuccess,
  listPackageProduct: state.packages.listPackageProductSuccess,
});

const mapDispatchToProps = {
  dpgetDetailProductOfCustomer: (order_id) =>
    getDetailProductOfCustomer(order_id),
  dispatchListProducts: (searchString, page, page_size) => getListProduct(searchString, page, page_size),
  dispatchcreateProductOfCustomer: (data) => createProductOfCustomer(data),
  dispatchgetListPackageProduct: (product_id, page, page_size) =>
    getListPackageProduct(product_id, page, page_size),
  dispatchupdateStatusProductOfCustomer: (product_of_customer_id) =>
    updateStatusProductOfCustomer(product_of_customer_id),
  dpgetListContractOfCustomer: (customer_id) =>
    getListContractOfCustomer(customer_id),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddProductOfCustomer));
