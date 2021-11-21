import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import renderHTML from "react-render-html";
import { Link } from "react-router-dom";
import { getProductOfCatelog } from "../../services/services";
import "./detailProduct.css"

class ProductCatelog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    let id = this.props.id;
    this.props.dpgetProductOfCatelog(id).then((res) => {
      this.setState({
        data: res.data.results,
      });
    });
  }
  renderProduct() {
    return this.state.data.map((item, index) => {
      // console.log("item", item);
      const location = {
        pathname: `products/${item.id}/`,
        state: { idProduct: item.id },
      };
      return (
        <Col
          xs={24}
          sm={12}
          md={8}
          lg={8}
          xl={6}
          className="search-content"
          key={index}
        >
          <Link to={location}>
            <div className="card z-depth-5">
              <div className="card-body text-center">
                <div
                  className="view-img"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <img
                    src={item.src}
                    className="img-responsive"
                    alt={item.titleProduct}
                  />
                  <div className="bg-overlay"></div>
                </div>
                <div
                  className="title-section"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <h4>{item.name}</h4>

                  <p>
                    {item.brief_description_en
                      ? renderHTML(item.brief_description_en)
                      : null}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </Col>
      );
    });
  }

  render() {
    return (
      <Row className="container-fluid search-content-info" gutter={16,16}>
        {this.renderProduct()}
      </Row>
    );
  }
}

const mapDispatchToProps = {
  dpgetProductOfCatelog: (catelog_id) => getProductOfCatelog(catelog_id),
};

export default connect(null, mapDispatchToProps)(ProductCatelog);
