import { Col, Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import renderHTML from "react-render-html";
import { Link } from "react-router-dom";
import NoData from "../../../../../components/nodata";
import { store } from "../../../../../store";
import { getListProductOfCustomer } from "../../../../products/services/services";
import ProductDetail from "../view/detailProduct";
// import * as Icon from "react-feather";
import "./products.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItems: [],
      searchStr: undefined,
      productDetailsVisibility: false,
      currentProduct: [],
      itemProduct: {},
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
  handleProductDetails = (status, product, type) => {
    if (status === "open")
      this.setState({
        productDetailsVisibility: true,
        currentProduct: product,
        itemProduct: product,
      });
    else this.setState({ productDetailsVisibility: false });
  };
  renderProduct() {
    let { listProductOfCustomer } = this.props;
    let result = "";
    if (
      listProductOfCustomer &&
      listProductOfCustomer.data &&
      listProductOfCustomer.data.length > 0
    ) {
      result = listProductOfCustomer.data.map((item, index) => {
        console.log("item", item);
        return (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            className="search-content"
            key={item.id}
            style={{
              display: this.state.productDetailsVisibility ? "none" : "block",
            }}
          >
            <Link
              to="#"
              onClick={() => {
                this.handleProductDetails("open", item);
              }}
            >
              <div className="card">
                <div className="card-body text-center">
                  <div className="view-img">
                    <img
                      src={item.product.src}
                      className="img-responsive"
                      alt={item.product.name}
                    />
                    <div className="bg-overlay"></div>
                  </div>

                  <div
                    className="title-section"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <h4>{item.system_name}</h4>
                    <h5>{item.product.name}</h5>
                    <p>
                      {item.product.brief_description_en
                        ? renderHTML(item.product.brief_description_en)
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        );
      });
      return result;
    } else {
      return <NoData />;
    }
  }
  componentDidMount() {
    const { userProfile } = store.getState().root;
    let role = userProfile.data.customer;
    console.log("dbgetListProductOfCustomer", role);
    this.props.dbgetListProductOfCustomer(role);
  }
  render() {
    return (
      <div className="content-wrapper">
        <div className="knowledge-base-content">
          <Row
            className="container-fluid search-content-info"
            gutter={[16, 16]}
            style={{
              display: this.state.productDetailsVisibility ? "none" : "",
              width: "100%",
            }}
          >
            {this.renderProduct()}
          </Row>
          <ProductDetail
            handleProductDetails={this.handleProductDetails}
            currentStatus={this.state.productDetailsVisibility}
            currentProduct={this.state.currentProduct}
            itemProduct={this.state.itemProduct}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listProductOfCustomer: state.products.listProductOfCustomerSuccess,
});

const mapDispatchToProps = {
  dbgetListProductOfCustomer: (customer_id) =>
    getListProductOfCustomer(customer_id),
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
