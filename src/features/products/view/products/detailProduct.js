import React, { Component } from "react";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
import LoadingBox from "../../../../components/LoadingBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { getDetailProduct } from "../../services/services";
import { shoppingCart } from "../../../../app/services";
import { Row, Col, Card, Button } from "antd";
import { getListPackageProduct } from "../../../myprofile/view/package/services/services";
import {getstaticInfo} from '../../../myprofile/view/siteStaticManagement/service/services'
import { StorageKey } from "../../../../constants/storageKeys";
import { formatCurrency } from "../../../../utils/fotmat";
import { store } from "../../../../store";
import _ from "lodash";

import "react-tabs/style/react-tabs.css";
import "./detailProduct.css";

class DetailProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      detailProduct: null,
      page: 1,
      page_size: 10,
      showItems: true,
    };
  }

  async componentDidMount() {
    let id = this.props.location.state.idProduct;
    await this.props.getstaticInfo()
    await this.props
      .dispatchGetDetailProduct(id)
      .then((res) => {
        if (res && res.data) {
          this.setState({
            detailProduct: res.data,
            isLoading: false,
          });
        }
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
    await this.props
      .dispatchgetListPackageProduct(id, this.state.page, this.state.page_size)
      .then((res) => {
        if (res && res.data) {
          this.setState({
            ListPackageProduct: res.data,
          });
        }
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
    const { userProfile } = store.getState().root;
    console.log("userProfile.data.role: ", userProfile.data.role);
    if (
      userProfile &&
      userProfile.data &&
      userProfile.data.role === "SUPPER_ADMIN"
    ) {
      this.setState({
        showItems: false,
        isLoading: false,
      });
    }
  }
  Add = async (item: any) => {
    try {
      let shoppingCarts = {};
      shoppingCarts = await JSON.parse(
        localStorage.getItem(StorageKey.SHOPPING_CARTS)
      );
      const { userProfile } = store.getState().root;
      if (_.isEmpty(shoppingCarts)) {
        shoppingCarts = {
          amount: parseInt(item.price),
          shoppingSum: 1,
          customer_id: userProfile.data.customer,
          package_of_product_order: [
            {
              package: item.id,
              packageName: item.name,
              product: item.product,
              quantity: 1,
              price: parseInt(item.price),
              on_active: true,
              totalAmout: parseInt(item.price),
            },
          ],
        };
      } else {
        shoppingCarts.amount = shoppingCarts.amount + parseInt(item.price);
        let loop = false;
        if (!_.isEmpty(shoppingCarts.package_of_product_order)) {
          (shoppingCarts.shoppingSum = shoppingCarts.shoppingSum + 1),
            shoppingCarts.package_of_product_order.push({
              package: item.id,
              quantity: 1,
              packageName: item.name,
              product: item.product,
              price: parseInt(item.price),
              on_active: true,
              totalAmout: parseInt(item.price),
            });
          // shoppingCarts.package_of_product_order.forEach((element) => {
          //   if (element.package === item.id) {
          //     element.quantity = element.quantity + 1;
          //     element.totalAmout = element.price * element.quantity;
          //     loop = true;
          //     return;
          //   }
          // });
        }
      }

      localStorage.setItem(
        StorageKey.SHOPPING_CARTS,
        JSON.stringify(shoppingCarts)
      );

      this.props.dispatchshoppingCart(shoppingCarts);
    } catch (error) {}
  };

  renderListPackage() {
    let ListPackageProduct =
      this.props.listPackageProduct &&
      this.props.listPackageProduct.data &&
      this.props.listPackageProduct.data.length > 0
        ? this.props.listPackageProduct.data
        : [];
    console.log("renderListPackage", this.props.listPackageProduct);
    const { userProfile } = store.getState().root;

    return ListPackageProduct.map((item, index) => {
      return (
        <Col xs={24} sm={12} md={12} lg={8} xl={8} key={index}>
          <Card
            className="item-package"
            title={`${formatCurrency(parseInt(item.price))} VNĐ`}
            bordered={true}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <span
                style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}
              >
                {item.name}
              </span>
            </div>
            {item.description ? renderHTML(item.description) : null}
            <div
              className="content-btn"
              // style={{ display: this.state.showItems ? "block" : "none" }}
            >
              <Button className="btn-add-card" onClick={() => this.Add(item)}>
                Add
              </Button>
            </div>
          </Card>
        </Col>
      );
    });
  }
  renderSocialNetwork(){
    
  }
  renderUI() {
    const { detailProduct } = this.state;
    let {staticInfo} =this.props
    // if(staticInfo && staticInfo.data){
    //   return
    // }
    if (detailProduct && staticInfo && staticInfo.data) {
      let staticInfoNew = staticInfo.data
      return (
        <div className="card" style={{ paddingTop: "80px" }}>
          <Row className="card-body">
            <Col
              xs={24}
              sm={24}
              md={10}
              lg={10}
              xl={10}
              className=" img-product"
            >
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={detailProduct.src}
                  className="img-responsive"
                  alt={detailProduct.name}
                />
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={14}
              lg={14}
              xl={14}
              className="detail-product-right"
            >
              <div className="names-products">
                <Link to="/products">
                  <Icon.ArrowLeft size={20} className="mr-1 cursor-pointer" />
                </Link>
                <h5 className="name-product" style={{ marginLeft: 10 }}>
                  {detailProduct.name}
                </h5>
              </div>
              <Tabs>
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Specifications</Tab>
                  {detailProduct.link ? <Tab>Video</Tab> : null}
                </TabList>
                <TabPanel>
                  {detailProduct.description_en
                    ? renderHTML(detailProduct.description_en)
                    : null}
                </TabPanel>

                <TabPanel>
                  {" "}
                  {detailProduct.specifications
                    ? renderHTML(detailProduct.specifications)
                    : null}
                </TabPanel>
                {detailProduct.link ? (
                  <TabPanel style={{ textAlign: "center" }}>
                    <iframe
                      width="560"
                      height="315"
                      src={detailProduct.link}
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </TabPanel>
                ) : null}
              </Tabs>

              <hr />
              <div className="gr-btn-social">
                <div className="btn-social">
                  <a
                    href={staticInfoNew.facebook}
                    target="_blank"
                  >
                    <Icon.Facebook />
                  </a>
                </div>
                <div className="btn-social">
                  <a
                    href={staticInfoNew.instagram}
                    target="_blank"
                  >
                    <Icon.Instagram />
                  </a>
                </div>
                <div className="btn-social">
                  <a href={staticInfoNew.twitter} target="_blank">
                    <Icon.Twitter />
                  </a>
                </div>
                <div className="btn-social">
                  <a
                    href={staticInfoNew.linkedin}
                    target="_blank"
                  >
                    <Icon.Linkedin />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          {this.props.listPackageProduct &&
          this.props.listPackageProduct.data &&
          this.props.listPackageProduct.data.length > 0 ? (
            <React.Fragment>
              <Row>
                <p className="title-package-product">Packages</p>
              </Row>
              <Row className="package-product" gutter={[16, 16]}>
                {this.renderListPackage()}
              </Row>
            </React.Fragment>
          ) : null}
        </div>
      );
    }
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="container-fluid wrapper-detail-product-main main-product public">
        {isLoading ? <LoadingBox /> : this.renderUI()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  detailProduct: state.products.detailProductSuccess,
  listPackageProduct: state.packages.listPackageProductSuccess,
  staticInfo: state.putStaticManagement.getSaticSuccess
});

const mapDispatchToProps = {
  dispatchGetDetailProduct: (id) => getDetailProduct(id),
  dispatchgetListPackageProduct: (product_id, page, page_size) =>
    getListPackageProduct(product_id, page, page_size),
  dispatchshoppingCart: (data) => shoppingCart(data),
  getstaticInfo:()=>getstaticInfo()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DetailProduct));
