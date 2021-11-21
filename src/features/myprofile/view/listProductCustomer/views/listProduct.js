import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { hidePopup } from "../../../../../app/services";
import { IMAGES } from "../../../../../assets";
import "./styles/listProductCustomer.css";

class ListProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderListOrder() {
    const { item } = this.props;
    console.log("renderListOrderpopup", item.item);
    let listProduct = item.product;
    let listCreated = item.created_product;

    if (item) {
      return listProduct.map((item, index) => {
        let item_Created = listCreated.find(
          (item_Created) => item_Created.product_id === item.id
        );
        return (
          <div className="row item-popup" key={index}>
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">{item.id}</div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 img">
              <img
                src={item.src}
                className="img-responsive"
                alt={item.titleProduct}
              />
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              {item.name}
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              {moment(item_Created.created_at).format("DD-MM-YYYY")}
            </div>
          </div>
        );
      });
    }
  }

  render() {
    console.log("DetailOrder", this.props.item);
    let item = this.props.item;
    return (
      <div
        className="pop_up_order"
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
            <span>System {item && item.system_id}</span>
            {/* <span className="status-order">
              Ngày tạo {moment(item.created_at).format("DD-MM-YYYY")}
            </span> */}
          </div>
          <div className="row">
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-popup">
              ID
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 ">Picture</div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              Product Name
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              Created At
            </div>
          </div>
          <hr className="line-name-column top" />
          {this.renderListOrder()}
          {/* <hr className="line-name-column bottom" /> */}
          {/* <div className="invoice-total-table">
            <div className="col-6 offset-6 col-sm-6 offset-sm-6 table-borderless">
              <div className="row">
                <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                  <p>SUBTOTAL</p>
                  <p>DISCOUNT ({item.discount * 100}%)</p>
                  <p>TOTAL</p>
                </div>
                <div
                  className="col-xs-5 col-sm-5 col-md-5 col-lg-5"
                  style={{ marginLeft: "-30px" }}
                >
                  <p>{item.amount} USD</p>
                  <p>{item.item.amount * item.item.discount} USD</p>
                  <p>
                    {item.item.amount - item.item.amount * item.item.discount}{" "}
                    USD
                  </p>
                </div>
              </div>
            </div>
          </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);
