import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Select, Space, Table, Tag } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { showPopup } from "../../../../app/services";
import { store } from "../../../../store";
import { formatCurrency } from "../../../../utils/fotmat";
import { getDetailOrderOfCustomer } from "../listOrderCustomer/services/services";
import { getdetailOrderOfCustomerUser } from "../order/services/services";
import { getListBilling } from "./services/services";
import "./styles.css";

class ListBilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      page_size: 10,
      total: undefined,
      isLoading: true,
      payment_status: null,
      invoice_number: "",
      visible: false,
    };
  }
  componentDidMount() {
    this.props.dbgetListBilling(
      this.state.payment_status,
      this.state.page,
      this.state.page_size
    );
  }
  detailOrderCustomer(record) {
    const { userProfile } = store.getState().root;
    let role = userProfile.data.role;
    console.log("detailOrderCustomer", record.contract.order.id);
    if (role === "SUPPER_ADMIN") {
      this.props
        .dpgetDetailOrderOfCustomer(record.contract.order.id)
        .then((res) => {
          console.log("onHandleSubmit!", res);
          if (res.status === 200) {
            let item = {
              id: record.contract.order.id,
              item: res.data,
            };
            this.props.dispatchShowPopup("detailOrderCustomer", item);
          } else {
          }
        })
        .catch((message_code) => {
          console.log("error: ", message_code);
        });
    } else {
      this.props
        .dpgetDetailOrderOfCustomerUser(record.contract.order.id)
        .then((res) => {
          console.log("onHandleSubmit!", res);
          if (res.status === 200) {
            let item = {
              id: record.contract.order.id,
              item: res.data,
            };
            this.props.dispatchShowPopup("detailOrderCustomer", item);
          } else {
          }
        })
        .catch((message_code) => {
          console.log("error: ", message_code);
        });
    }
  }
  renderListBilling() {
    const { userProfile } = store.getState().root;
    const { formatMessage } = this.props.intl;

    let role = userProfile.data.role;
    let { listBilling } = this.props;
    let dataSource =
      listBilling &&
      listBilling.data &&
      listBilling.data.results &&
      listBilling.data.results.length > 0
        ? listBilling.data.results
        : [];
    const columns = [
      {
        title: "#",
        render: (value) => {
          return value.id;
        },
      },
      {
        title: formatMessage({ id: "features.invoice.table.InvoiceNumber" }),
        dataIndex: "invoice_number",
      },
      {
        title: formatMessage({ id: "features.contract.table.id" }),
        dataIndex: "contract",
        render: (value) => {
          return value.contract_id;
        },
      },
      {
        title: formatMessage({ id: "features.order.table.id" }),
        dataIndex: "contract",
        render: (value) => {
          return value.order.order_id;
        },
      },
      {
        title: formatMessage({ id: "features.table.CustomerName" }),
        dataIndex: "contract",
        render: (value) => {
          return value.order.customer.customer_name;
        },
      },
      {
        title: formatMessage({ id: "features.table.Amount" }),
        dataIndex: "contract",
        render: (value) => {
          return (
            formatCurrency(
              Math.floor(
                parseInt(value.order.amount) +
                  (parseInt(value.order.amount) * 10) / 100
              )
            ) +
            " " +
            "VND"
          );
        },
        // render: (value) => {
        //   return (value && value.service)?value.service.reduce((acc, item) =>  {
        //     return acc + parseInt(item.price)
        //   }, 0):0
        // },
      },
      // {
      //   title: "Discount",
      //   dataIndex: "discount",
      //   render: (value) => {
      //     return value * 100 + "%";
      //   },
      // },
      {
        title: formatMessage({ id: "features.table.Create" }),
        dataIndex: "created_at",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
      {
        title: formatMessage({ id: "features.table.paymentStatus" }),
        dataIndex: "payment_status",
        render: (value) => {
          return value ? (
            <Tag color="#0bcbff" key={1}>
              Paid
            </Tag>
          ) : (
            <Tag color="red" key={2}>
              Unpaid
            </Tag>
          );
        },
      },
      {
        title: formatMessage({ id: "features.table.Action" }),
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link
              to="#"
              onClick={() => {
                this.showModal(record);
              }}
              // onClick={() => {
              //   this.detailOrderCustomer(record);
              // }}
            >
              <EyeOutlined />
            </Link>
            {role === "SUPPER_ADMIN" ? (
              <Link to={`/edit-billing/${record.id}`}>
                <EditOutlined />
              </Link>
            ) : null}
          </Space>
        ),
      },
    ];
    return (
      <Table
        rowClassName={() => "editable-row"}
        dataSource={dataSource}
        columns={columns}
        bordered
        className="table-content"
        pagination={{
          total: listBilling && listBilling.data ? listBilling.data.total : 0,
          // showTotal: (total) => `Tổng ${total}`,
          current: this.state.page,
          pageSize: this.state.page_size,
          onChange: (page) => {
            this.setState(
              {
                page: page,
              },
              () => {
                this.props.dbgetListBilling(
                  this.state.payment_status,
                  this.state.page,
                  this.state.page_size
                );
              }
            );
          },
        }}
      />
    );
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState(
      {
        payment_status: value,
        page: 1,
      },
      () => {
        this.props.dbgetListBilling(
          this.state.payment_status,
          this.state.page,
          this.state.page_size
        );
      }
    );
  };

  showModal = (record) => {
    const { userProfile } = store.getState().root;
    this.setState(
      {
        visible: true,
        itemPopup: record,
        invoice_number: record.invoice_number,
      },
      () => {
        if (userProfile.data.role === "SUPPER_ADMIN") {
          this.props
            .dpgetDetailOrderOfCustomer(record.contract.order.id)
            .then((res) => {
              console.log("onHandleSubmit!", res);
              if (res.status === 200) {
                this.setState({
                  itemOrder: res.data,
                });
                // let item = {
                //   id: record.contract.order.id,
                //   itemOrder: res.data,
                // };
                // this.props.dispatchShowPopup("detailOrderCustomer", item);
              } else {
              }
            })
            .catch((message_code) => {
              console.log("error: ", message_code);
            });
        } else {
          this.props
            .dpgetDetailOrderOfCustomerUser(record.contract.order.id)
            .then((res) => {
              console.log("onHandleSubmit!", res);
              if (res.status === 200) {
                this.setState({
                  itemOrder: res.data,
                });
                // this.props.dispatchShowPopup("detailOrderCustomer", item);
              } else {
              }
            })
            .catch((message_code) => {
              console.log("error: ", message_code);
            });
        }

        console.log("itemPopup", this.state.itemPopup);
      }
    );
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  detailBilling() {
    let { itemOrder } = this.state;
    console.log("detailBilling", this.state.itemOrder);
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
    let productPrice =
      this.state.itemOrder && this.state.itemOrder.service
        ? this.state.itemOrder.service.reduce((acc, item) => {
            return (productPrice = acc + parseInt(item.price));
          }, 0)
        : 0;

    return (
      <div className="pop-up-billing">
        <Table
          rowClassName={() => "editable-row"}
          dataSource={this.state.itemOrder ? this.state.itemOrder.service : []}
          columns={columns}
          scroll={{ y: 240 }}
          width={800}
          className="table-content"
          pagination={false}
        />
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
                {this.state.itemOrder ? (
                  <React.Fragment>
                    <p>{formatCurrency(parseInt(productPrice))} VND</p>
                    {/* <p>{formatCurrency(parseInt(this.state.itemOrder.amount))} VND</p> */}
                    <p>
                      {this.state.itemOrder
                        ? this.state.itemOrder.order_time
                        : 0}
                    </p>
                    <p>
                      {formatCurrency(
                        productPrice * this.state.itemOrder.order_time
                      )}{" "}
                      VND
                    </p>
                    <p>
                      {formatCurrency(
                        Math.floor(
                          (productPrice *
                            this.state.itemOrder.order_time *
                            10) /
                            100
                        )
                      )}{" "}
                      VND
                    </p>
                    <p>
                      {formatCurrency(
                        Math.floor(
                          productPrice * this.state.itemOrder.order_time
                        ) +
                          Math.floor(
                            (productPrice *
                              this.state.itemOrder.order_time *
                              10) /
                              100
                          )
                      )}{" "}
                      VND
                    </p>
                  </React.Fragment>
                ) : null}

                {/* <p>{this.state.itemOrder?formatCurrency(parseInt(this.state.itemOrder.amount)):0} VND</p>

                  <p>{this.state.itemOrder?formatCurrency(parseInt(this.state.itemOrder.amount)):0} VND</p> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const { Option } = Select;
    const ArrSelect = [
      {
        id: 1,
        name: "All",
      },
      {
        id: 2,
        name: "Paid",
      },
      {
        id: 3,
        name: "Unpaid",
      },
    ];
    return (
      <div className="list-billing">
        <div className="row top">
          <div className="actions action-btns"></div>
          <div className="action-search">
            <span>Payment Status</span>
            <Select
              defaultValue="All"
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              {ArrSelect.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        {this.renderListBilling()}
        <Modal
          title={`Invoice Number #${this.state.invoice_number}`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ padding: "0px" }}
          width={800}
          footer={false}
        >
          {this.detailBilling()}
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  listBilling: state.billing.listBillingSuccess,
  detailBilling: state.billing.detailBillingSuccess,
});

const mapDispatchToProps = {
  dbgetListBilling: (payment_status, page, page_size) =>
    getListBilling(payment_status, page, page_size),
  dpgetDetailOrderOfCustomer: (order_id) => getDetailOrderOfCustomer(order_id),
  dispatchShowPopup: (popupType, item) => showPopup(popupType, item),
  dpgetDetailOrderOfCustomerUser: (id) => getdetailOrderOfCustomerUser(id),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ListBilling));
