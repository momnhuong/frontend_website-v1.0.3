import { Col, Row, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { hidePopup } from "../../../../../app/services";
import { IMAGES } from "../../../../../assets";
import { formatCurrency } from "../../../../../utils/fotmat";
import "./detailOrder.css";

class DetailOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderListOrder() {
    const { item } = this.props;
    console.log("renderListOrderpopup", item.item);
    let listProductOrder = item.item.service;

    if (item.item) {
      const columns = [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "Name Product",
          dataIndex: "product_of_order",
          render: (value) => {
            return value.product.name;
          },
        },
        {
          title: "Package Name",
          dataIndex: "package",
          render: (value) => {
            return value.name;
          },
        },
        {
          title: "Amount",
          dataIndex: "price",
          render: (value) => {
            return formatCurrency(parseInt(value)) + " " + "VND";
          },
        },
        {
          title: "Create",
          dataIndex: "product_of_order",
          render: (value) => {
            return moment(value.created_at).format("DD-MM-YYYY");
          },
        },
      ];
      return (
        <Table
          rowClassName={() => "editable-row"}
          dataSource={listProductOrder}
          columns={columns}
          scroll={{ y: 240 }}
          width={600}
          className="table-content"
          pagination={false}
        />
      );
    }
  }

  render() {
    console.log("DetailOrder", this.props.item);
    let item = this.props.item;
    let totalPrice = 0;
    let itemPrice = item.item.service.forEach((element) => {
      totalPrice += parseInt(element.price);
    });
    return (
      <div className="pop_up_order">
        <div className="off_box">
          <Link
            to="#"
            onClick={() => {
              this.props.dispatchHidePopup();
            }}
          >
            <img
              src={IMAGES.icon_close}
              className="img-responsive"
              alt="img_btn_logout"
            />
          </Link>
        </div>
        <div className="detail-order-pop-up">
          <div className="name-order-popup">
            <span>Oder ID #{item.item.order_id}</span>
            {/* <span>Order time {item.item.order_time}(month)</span> */}
          </div>

          {this.renderListOrder()}
          <Row className="invoice-total-table">
            <Col
              offset={12}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="table-borderless"
            >
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <p>Product Price total</p>
                  <p>Order time(month)</p>
                  <p>Subtotal</p>
                  <p>VAT</p>
                  <p>Total</p>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <p>{formatCurrency(totalPrice)} VND</p>
                  <p>{item.item.order_time}</p>
                  <p>{formatCurrency(totalPrice * item.item.order_time)} VND</p>
                  <p>
                    {formatCurrency(
                      Math.floor((totalPrice * item.item.order_time * 10) / 100)
                    )}{" "}
                    VND
                  </p>
                  <p>
                    {formatCurrency(
                      Math.floor(totalPrice * item.item.order_time) +
                        Math.floor(
                          (totalPrice * item.item.order_time * 10) / 100
                        )
                    )}{" "}
                    VND
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.root.item,
});

const mapDispatchToProps = {
  dispatchHidePopup: (popupType) => hidePopup(popupType),
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrder);
