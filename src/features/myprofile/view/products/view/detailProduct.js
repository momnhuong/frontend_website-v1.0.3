import React, { Component } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { animations } from "react-animation";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import "react-tabs/style/react-tabs.css";
import NoData from "../../../../../components/nodata";
import BackupService from "./backUp";
import "./detailProduct.css";
import DRaaS from "./DRaaS";
import ObjectStorage from "./ObjectStorage";
import VPC from "./vpc";

const style = {
  animation: animations.fadeInUp,
};

class DetailProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemProduct: {},
    };
  }
  renderDetailProduct() {
    let name =
      this.props.itemProduct && this.props.itemProduct.product
        ? this.props.itemProduct.product.name
        : "";
    console.log("renderDetailProduct", name);
    switch (name) {
      case "Virtual Private Cloud":
        return <VPC />;
        break;
      case "DR as a Service":
        return <DRaaS />;
        break;
      case "Object Storage":
        return <ObjectStorage />;
      case "Backup as a Service":
        return <BackupService />;
        break;
      default:
        return <NoData />;
        break;
    }
  }

  render() {
    // console.log("detailprodyuct", this.props.itemProduct);
    return (
      <div
        style={style}
        className={`wrapper-detail-product ${
          this.props.currentStatus ? "show" : ""
        }`}
      >
        <div className="name-products">
          <Icon.ArrowLeft
            size={20}
            className="mr-1 cursor-pointer"
            onClick={() => {
              this.props.handleProductDetails("close");
            }}
          />
          <div className="name">{this.props.itemProduct.name}</div>
        </div>

        <div>{this.renderDetailProduct()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
