import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Breadcrumb,
  Divider,
  Table,
  Card,
  Button,
  Select,
  Space,
  InputNumber
} from "antd";
import { HomeOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatCurrency } from "../../../../utils/fotmat";
import { showPopup, shoppingCartFailed ,shoppingCart} from "../../../../app/services";
import {Link} from 'react-router-dom'
import { getListCustomer } from "../../../myprofile/view/user/services/services";
import {getListProduct} from '../../services/services'
import { StorageKey } from "../../../../constants/storageKeys";
import { createOrder } from "../../services/services";
import { history } from "../../../../store/history";
import Notification from "../../../../components/Notification";
import { store } from "../../../../store";
import _ from "lodash";

import "./cart.css";
import { IMAGES } from "../../../../assets";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id: null,
      order_time:1,
      searchString:"",
      page:1,
      page_size:1000
    };
  }
  showPopup = () => {
    this.props.dispatchShowPopup("notificationCartCart");
  };
  componentDidMount() {
    const { userProfile } = store.getState().root;
    this.props.dispatchListProduct()
    if (userProfile.data.role === "SUPPER_ADMIN") {
      this.props.dispatchGetListCustomer(this.state.searchString,this.state.page,this.state.page_size);
    }
  }
  onChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      customer_id: value,
    });
  };

  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = (val) => {
    console.log("search:", val);
    this.setState({
      searchString:val
    })

  };
  Delete = async (item: any, rowIndex: Number) => {
    try {
      let shoppingCarts = {};
      shoppingCarts = await JSON.parse(
        localStorage.getItem(StorageKey.SHOPPING_CARTS)
      );
      if (_.isEmpty(shoppingCarts)) {
        // return;
      } else {
        if (!_.isEmpty(shoppingCarts.package_of_product_order)) {
          if (
            rowIndex !== -1 &&
            item.id === shoppingCarts.package_of_product_order[rowIndex].id
          ) {
            shoppingCarts.amount =
              shoppingCarts.amount -
              item.price *
                shoppingCarts.package_of_product_order[rowIndex].quantity;
            shoppingCarts.package_of_product_order.splice(rowIndex, 1);
            shoppingCarts.shoppingSum -= 1
            this.props.dispatchshoppingCart(shoppingCarts)
          }
        }
      }

      localStorage.setItem(
        StorageKey.SHOPPING_CARTS,
        JSON.stringify(shoppingCarts)
      );
      this.setState({
        amount: shoppingCarts.amount,
        shoppingCart: shoppingCarts,
      });
    } catch (error) {
      console.log("add shopping cart", error);
    }
  };
  onChangeTime=(value)=>{
    this.setState({
      order_time:`${value}`
    })
  }
  renderProduct() {
    let shoppingCarts = JSON.parse(
      localStorage.getItem(StorageKey.SHOPPING_CARTS)
    );
    const { userProfile } = store.getState().root;
    let listCustomernew =
      this.props.listCustomer &&
      this.props.listCustomer.data &&
      this.props.listCustomer.data.results &&
      this.props.listCustomer.data.results.length > 0
        ? this.props.listCustomer.data.results
        : [];
    let listPackage = shoppingCarts
      ? shoppingCarts.package_of_product_order
      : [];
    let listProductMap = (this.props.listProduct && this.props.listProduct.data && this.props.listProduct.data.results && this.props.listProduct.data.results.length>0)?this.props.listProduct.data.results:[]
    // const dataMap = listPackage.map((item, index) => {
    //   let itemFind = listProductMap.find(
    //     (item_product) => item_product.id === item.product
    //   );

    //   return { ...item, nameProduct: itemFind.name };
    // });
    const columns = [
      {
        title: "#",
        dataIndex: "package",
      },
      {
        title: "Name Product",
        dataIndex: "product",
        render: (value) => {
          return value.name;
        },
      },
      {
        title: "Package",
        dataIndex: "packageName",
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (value) => {
          return formatCurrency(value);
        },
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
      },
      {
        title: "Total",
        dataIndex: "totalAmout",
        render: (value) => {
          return formatCurrency(value);
        },
      },
      {
        title: "Action",
        key: "action",
        render: (text, record ,rowIndex) => {
          return (
            <Space size="middle">
              <a
                onClick={() => this.Delete(record,rowIndex)}
              >
                <DeleteOutlined />
              </a>
            </Space>
          );
        },
      },
    ];
    const { Option } = Select;

    return (
      <div>
        <Row>
          {userProfile.data.role === "SUPPER_ADMIN" ? (
            <div className="select-customer">
              <span className="title-select-customer">Customer:</span>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {listCustomernew.map((item) => {
                  let value = {
                    item: item,
                  };
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.customer_name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          ) : null}
        </Row>
        <Row>
          <Table
            rowClassName={() => "editable-row"}
            dataSource={listPackage}
            columns={columns}
            className="table-content"
            pagination={false}
          />
        </Row>
      </div>
    );
  }
  onCustomerChange = (value) => {
    this.setState({
      customer_id: value,
    });
  };
  renderTotalOrder() {
    let shoppingCarts = JSON.parse(
      localStorage.getItem(StorageKey.SHOPPING_CARTS)
    );

    return (
      <div className="content-box-order">
        <Row className="row-order-box">
          <span className="title-provisional">Product Price total</span>
          <span className="provisional-amount">
            {formatCurrency(Math.floor(shoppingCarts.amount))} VND
          </span>
        </Row>
        <Row className="time-order">
          <span className="title-provisional">Order time (month):</span>
          <InputNumber 
          min={1} 
          defaultValue={1}
          onChange={this.onChangeTime}
          type="number"
          />
        </Row>
        <hr />
        <Row className="row-order-box">
          <span className="title-provisional">Subtotal</span>
          <span className="provisional-amount">
            {formatCurrency(Math.floor(shoppingCarts.amount)*this.state.order_time)} VND
          </span>
        </Row>
        <Row className="row-order-box">
          <span className="title-provisional">VAT</span>
          <span className="provisional-amount">
            {formatCurrency(Math.floor((shoppingCarts.amount*this.state.order_time * 10) / 100))} VND
          </span>
        </Row>
        <hr />
        <Row className="row-order-box">
          <span className="title-provisional">Total</span>
          <span className="provisional-amount">
            {formatCurrency(
              Math.floor(shoppingCarts.amount*this.state.order_time + 
              Math.floor(shoppingCarts.amount*this.state.order_time * 10) / 100))
              }
            VND
          </span>
        </Row>
        <hr />
        
        <Button
          className="btn-order-box"
          onClick={() => {
            this.createPayment();
          }}
        >
          Continue payment
        </Button>
      </div>
    );
  }
  createPayment = () => {
    let shoppingCarts = JSON.parse(
      localStorage.getItem(StorageKey.SHOPPING_CARTS)
    );

    let customer_id_new = shoppingCarts.customer_id
      ? `${shoppingCarts.customer_id}`
      : `${this.state.customer_id}`;
    // console.log("customer_id_new", customer_id_new);
    let temp = shoppingCarts;
    let today = new Date();
    let time = today.getTime().toString();
    let timeLength = time.length;
    console.log("timeLength", timeLength);
    let subString = time.slice(timeLength - 4);

    console.log("subString", subString);

    let dataPayment = {
      customer_id: customer_id_new,
      order_id: `${today.getFullYear()}${
        today.getMonth() + 1
      }${today.getDate()}${shoppingCarts.customer_id}${subString}`,
    };

    const product_of_order = [];

    shoppingCarts.package_of_product_order.forEach((item) => {
      const findIndexItem = product_of_order.findIndex(
        (x) => x.product === item.product
      );
      if (findIndexItem !== -1) {
        product_of_order[findIndexItem].package_of_product_order.push({
          package: item.package,
          on_active: true,
        });
      } else {
        product_of_order.push({
          product: item.product.id,
          on_active: item.on_active,
          package_of_product_order: [
            { package: item.package, on_active: true },
          ],
        });
      }
    });

    let dataPaymentnew = {
      customer_id: customer_id_new,
      order_id: `${today.getFullYear()}${
        today.getMonth() + 1
      }${today.getDate()}${parseInt(customer_id_new)}${subString}`,
      product_of_order,
      order_time: this.state.order_time,
      amount: `${shoppingCarts.amount * this.state.order_time}`
    };
    console.log("dataPaymentnew", dataPaymentnew);
    if (shoppingCarts.customer_id === null && this.state.customer_id === null) {
      Notification("error", "Please choose Customer");
    } else{
      if(this.state.order_time === null){
        Notification("error", "Please set order time");
      }else {
        this.props
          .dispatchcreateOrder(dataPaymentnew)
          .then((res) => {
            if (res.status === 201) {
              this.props.dispatchshoppingCartFailed();
              this.props.history.goBack();
            } else {
              this.props.dpOffloading();
            }
          })
          .catch((message_code) => {
            console.log("error: ", message_code);
          });
      }
    }
  };
  renderUI() {
    let shoppingCarts = JSON.parse(
      localStorage.getItem(StorageKey.SHOPPING_CARTS)
    );
    if ( !shoppingCarts ||(shoppingCarts && shoppingCarts.shoppingSum ===0))  {
      localStorage.removeItem(StorageKey.SHOPPING_CARTS)
      return (
        <div className="view-cart-emty">
          <img src={IMAGES.cart_empty} />
          
        </div>
      );
    } else {
      if(shoppingCarts && shoppingCarts.shoppingSum>0){
        return (
          <React.Fragment>
            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
              {this.renderProduct()}
              <Row><Link to="/products" className="conti-buy">Continue Shopping</Link></Row>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} className="box_total">
              <Card hoverable className="number-provisional">
                {this.renderTotalOrder()}
              </Card>
            </Col>
          </React.Fragment>
        );
      }
    }
  }
  render() {
    return <Row className="content-wrapper-cart">{this.renderUI()}</Row>;
  }
}

const mapStateToProps = (state) => ({
  listCustomer: state.customer.dataSuccess,
  listProduct: state.products.listProductSuccess,
});

const mapDispatchToProps = {
  dispatchShowPopup: (popupType, item) => showPopup(popupType, item),
  dispatchcreateOrder: (data) => createOrder(data),
  dispatchshoppingCartFailed: () => shoppingCartFailed(),
  dispatchGetListCustomer: (searchString,page,page_size) => getListCustomer(searchString,page,page_size),
  dispatchshoppingCart: (data) => shoppingCart(data),
  dispatchListProduct:()=> getListProduct()
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
