import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { hidePopup } from "../../../../../app/services";
import { IMAGES } from "../../../../../assets";
import "./styles.css";

class DetailTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderListOrder() {
    const { item } = this.props;
    console.log("renderListOrder", item);
    let result = "";
    if (item && item.itemTransaction) {
      result = item.itemTransaction.map((item, index) => {
        return (
          <div className="row item-popup" key={index}>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              {item.nametask}
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              {item.hours}
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              {item.rate}
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              {item.amout}
            </div>
          </div>
        );
      });
      return result;
    }
  }

  render() {
    console.log("DetailTransaction render", this.props.item);
    let item = this.props.item;
    return (
      <div
        className="pop_up_pay"
        style={{ minWidth: "900px", position: "relative" }}
      >
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
            <span>Đơn hàng #{item && item.contract_id}</span>
            <span className="status-order">{item.status}</span>
          </div>
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-popup">
              TASK DESCRIPTION
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 ">HOURS</div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">RATE</div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">AMOUNT</div>
          </div>
          <hr className="line-name-column" />
          {this.renderListOrder()}
          <hr className="line-name-column" />
          <div className="invoice-total-table">
            <div className="col-6 offset-6 col-sm-6 offset-sm-6 table-borderless">
              <div className="row">
                <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                  <p>SUBTOTAL</p>
                  {/* <p>DISCOUNT (5%)</p> */}
                  <p>TOTAL</p>
                </div>
                <div
                  className="col-xs-5 col-sm-5 col-md-5 col-lg-5"
                  style={{ marginLeft: "-30px" }}
                >
                  <p>114000 USD</p>
                  {/* <p>5700 USD</p> */}
                  <p>108300 USD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dispatchHidePopup: (popupType) => hidePopup(popupType),
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTransaction);
