import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

import { pushPage } from "../../../../app/services";
import { getListProduct, getListCatelog } from "../../services/services";
import { Row, Input, Tabs } from "antd";
import ProductCatelog from "./productCatelog";

import "./products.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItems: [],
      searchStr: undefined,
      page: 1,
      page_size: 1000,
    };
  }

  handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (value === "") {
      console.log("handleChange", value);
      this.setState({
        searchStr: undefined,
      });
    }
    if (value !== "") {
      this.setState(
        {
          [name]: value,
        },
        () => {
          console.log("searchStr", this.state.searchStr);
        }
      );
    }
  };

  componentDidMount() {
    console.log("page_size", this.state.page_size);
    this.props.dispatchListProducts(this.state.page, this.state.page_size);
    this.props.dispatchlistCatelogSuccess(
      this.state.page,
      this.state.page_size
    );
    console.log("listCatelog", this.props.listCatelog);
  }
  renderMenucatelog() {
    const { TabPane } = Tabs;
    let listcatelog =
      this.props.listCatelog && this.props.listCatelog.data
        ? this.props.listCatelog.data.results
        : [];
    let listCatelogNew;
    return listcatelog.map((item, index) => {
      // console.log("item.id");
      // console.log("item", item);
      if (item.on_active)
        return (
          <TabPane tab={item.name} key={`${item.id}`}>
            <ProductCatelog id={item.id} />
          </TabPane>
        );
    });
  }
  callback = (key) => {
    console.log(key);
  };
  render() {
    return (
      <div className="content-wrapper">
        {/* <Row className="knowledge-base-bg card">
          <div className="card-body p-sm-4 p-2">
            <h1 className="title-card-body">
              THE VALUES WE CREATED AND DELIVER TO OUR BELOVED CUSTOMERS
            </h1>
            <p className="mb-2 white">
              USDC Technology provides solutions and services that contribute to
              the efficiency and productivity of IT systems in particular, and
              business apparatus in general.
            </p>
          </div>
        </Row> */}
        <div className="knowledge-base-content">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            {this.renderMenucatelog()}
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listProduct: state.products.listProductSuccess,
  detailproduct: state.products.detailProductSuccess,
  listCatelog: state.products.listCatelogSuccess,
});

const mapDispatchToProps = {
  dispatchPushPage: (item) => pushPage(item),
  dispatchListProducts: () => getListProduct(),
  dispatchlistCatelogSuccess: (page, page_size) =>
    getListCatelog(page, page_size),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Products));
