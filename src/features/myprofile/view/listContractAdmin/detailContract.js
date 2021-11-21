import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Col, Row, Table, Typography } from "antd";
import moment from "moment";
import React, { Component } from "react";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { hidePopup } from "../../../../app/services";
import { IMAGES } from "../../../../assets";
import BoxLoading from "../../../../components/LoadingBox";
import { formatCurrency } from "../../../../utils/fotmat";
import "./detailcontract.css";
import { detailContractAdmin } from "./services/services";
const { Title, Paragraph, Text } = Typography;
class Detailcontract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    const item = this.props.detailContract;
    this.props
      .dispatchDetailContract(item.id)
      .then((res) => {
        // console.log("onHandleSubmit!", res);
        if (res.status === 200) {
          this.setState(
            {
              isLoading: false,
              detailContra: res.data,
            },
            () => {
              console.log("detailContra", this.state.detailContra);
            }
          );
        } else {
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  }

  renderListOrder() {
    const { detailContract } = this.props;
    console.log("renderListOrderpopup", detailContract);
    let detailContractNew = [];
    if (
      detailContract &&
      detailContract.service &&
      detailContract.service.length > 0
    ) {
      detailContractNew = detailContract.service;
    }

    if (detailContract) {
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
        {
          title: "Endtime",
          dataIndex: "product_of_order",
          render: (value) => {
            return moment(value.end_time).format("DD-MM-YYYY");
          },
        },
      ];
      // const dataSource = detailContract.product.map((item) => {
      //   const pricearr = detailContract.price.find((data) => {
      //     return data.product_id === item.id;
      //   });
      //   return { ...item, price: pricearr.price };
      // });
      // console.log("datasource: ", dataSource);

      return (
        <Table
          dataSource={detailContractNew}
          pagination={false}
          columns={columns}
        />
      );
    }
  }
  rederUI() {
    let productPrice =
      this.state.detailContra && this.state.detailContra.service
        ? this.state.detailContra.service.reduce((acc, item) => {
            return (productPrice = acc + parseInt(item.price));
          }, 0)
        : 0;
    if (this.state.detailContra) {
      let item = this.state.detailContra;
      console.log("rederUI", item);
      const detailCompany = JSON.parse(item.view.replace(/'/g, '"'));
      let amountTotal = 0;
      let amountTemp = item.service.forEach((element) => {
        amountTotal += parseInt(element.price);
      });
      return (
        <React.Fragment>
          <div className="card-body">
            <Row className="head-card-body">
              <Col className="head-card-body-left" xs={8} sm={8} md={8} lg={8}>
                <div className="media">
                  <img
                    src={IMAGES.logo_menu}
                    className="img-responsive"
                    alt="logo"
                  />
                </div>
              </Col>
              <Col
                className="text-right head-card-body-right"
                xs={16}
                sm={16}
                md={16}
                lg={16}
              >
                <h2>{item.contract_name}</h2>
                <div className="contract-details" style={{ marginTop: "2px" }}>
                  <h6>Contract NO.</h6>
                  <p>{item.contract_id}</p>
                  <h6
                    // className="mt-2"
                    style={{ marginTop: "2" }}
                  >
                    Contract DATE
                  </h6>
                  <p>{moment(item.created_at).format("DD-MM-YYYY")}</p>
                </div>
              </Col>
            </Row>
            <Row className="pt-2 info-contract">
              <Col
                // className="col-sm-12 col-md-6"
                sm={24}
                md={12}
              >
                <h2>
                  {this.props.detailContract.order.customer.customer_name}
                </h2>
                <div className="recipient-info my-2">
                  <p>{this.props.detailContract.order.customer.address}</p>
                  {/* <p>{item.buyer.Street}</p> */}
                  {/* 
            <p>{item.buyer.address}</p>
            <p>{item.buyer.code}</p> */}
                </div>
                <div className="recipient-contact pb-2">
                  <span className="lineblock">
                    <MailOutlined />
                    {this.props.detailContract.order.customer.main_email}
                  </span>

                  <span className="lineblock">
                    <PhoneOutlined />
                    {this.props.detailContract.order.customer.phone_number}
                  </span>
                </div>
              </Col>
              <Col className="text-right " sm={24} md={12}>
                <h2>{detailCompany.company_name}</h2>
                <div className="company-info my-2">
                  <p>{detailCompany.registration_address}</p>
                  {/* 
            <p>item.seller.address</p>
            <p>item.seller.code</p> */}
                </div>
                <div className="company-contact">
                  <span className="lineblock">
                    <MailOutlined />
                    {detailCompany.email}
                  </span>
                  <span className="lineblock">
                    <PhoneOutlined />
                    {detailCompany.hotline}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          <div className="contract-item">
            {this.renderListOrder()}
            <Row>
              <Col lg={{ span: 12, offset: 12 }} style={{ padding: "0px" }}>
                <Row className="invoice-total-table">
                  <Col xs={14} sm={14} md={14} lg={14}>
                    <p>Product Price total</p>
                    <p>Order time(month)</p>
                    <p>Subtotal</p>
                    <p>VAT</p>
                    <p>Total</p>
                  </Col>
                  <Col
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    style={{ textAlign: "right", paddingRight: "20px" }}
                  >
                    <p>{formatCurrency(parseInt(productPrice))} VND</p>
                    <p>{item.order.order_time}</p>
                    <p>
                      {formatCurrency(productPrice * item.order.order_time)} VND
                    </p>
                    <p>
                      {formatCurrency(
                        Math.floor(
                          (productPrice * item.order.order_time * 10) / 100
                        )
                      )}{" "}
                      VND
                    </p>
                    <p>
                      {formatCurrency(
                        Math.floor(productPrice * item.order.order_time) +
                          Math.floor(
                            (productPrice * item.order.order_time * 10) / 100
                          )
                      )}{" "}
                      VND
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </React.Fragment>
      );
    }
  }
  render() {
    let { isLoading } = this.state;
    return (
      <React.Fragment>
        {isLoading ? (
          <BoxLoading />
        ) : (
          <div className="detail-contract">
            <div className="row content_profile">
              <div className="off_box">
                <Link
                  to="#"
                  onClick={() => {
                    this.props.toggleDisplay();
                  }}
                >
                  <Icon.ArrowLeft size={20} className="mr-1 cursor-pointer" />
                </Link>
              </div>
              <div className="contract-wrapper col-sm-12">
                <div className="contract-page">
                  <div className="">{this.rederUI()}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  detailContractNew: state.contractadmin.detailContractSuccess,
});

const mapDispatchToProps = {
  dispatchHidePopup: (popupType) => hidePopup(popupType),
  dispatchDetailContract: (id_contract) => detailContractAdmin(id_contract),
};

export default connect(mapStateToProps, mapDispatchToProps)(Detailcontract);
