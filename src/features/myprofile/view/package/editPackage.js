import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import CKEditor from "ckeditor4-react";
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Notification from "../../../../components/Notification";
import { getListProduct } from "../../../products/services/services";
import {
  addPackage,
  detailPackage,
  getListPackage,
  updatePackage,
} from "./services/services";
import "./styles.css";

class EditPackage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listProduct: [],
      description: "",
      detailPackage: {},
      searchString: "",
      page: 1,
      page_size: 1000,
    };
  }

  async componentDidMount() {
    let id_package = this.props.match.params.id;
    this.props
      .dpgetListProduct()
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.results &&
          res.data.results.length > 0
        ) {
          this.setState({
            listProduct: res.data.results,
          });
        }
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
    this.props
      .dbdetailPackage(id_package)
      .then((res) => {
        if (res && res.data) {
          console.log("res.data", res.data);
          this.setState({
            detailPackage: res.data,
            isLoading: false,
            description: res.data.description,
          });
        }
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
  }
  onFinish = (values) => {
    let id = this.props.match.params.id;
    console.log("onHandleSubmit", values, id);
    let datanew = {
      product_id: `${values.product_id}`,
      name: values.name,
      price: values.price,
      discount: values.discount,
      description: this.state.description,
    };
    this.props
      .dbupdatePackage(id, datanew)
      .then((res) => {
        if (res.status === 201) {
          Notification("success", "Update package success");
          this.props.dbgetListPackage();
          this.props.history.goBack();
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
  onEditorChange = (evt) => {
    this.setState(
      {
        description: evt.editor.getData(),
      },
      () => {
        console.log("onEditorChange", this.state.description);
      }
    );
  };
  onChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      product_id: value,
    });
  };

  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = (val) => {
    console.log("search:", val);
    this.setState({
      searchString: val,
    });
  };
  renderformAdd() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const { Option } = Select;
    const detailPackage =
      this.props.detailPackage && this.props.detailPackage.data
        ? this.props.detailPackage.data
        : {};
    if (!_.isEmpty(detailPackage)) {
      return (
        <Form
          className="form-add-package"
          layout="horizontal"
          size="large"
          initialValues={{
            product_id: detailPackage ? detailPackage.product.name : "",
            name: detailPackage ? detailPackage.name : "",
            price: detailPackage ? detailPackage.price : "",
            discount: detailPackage ? detailPackage.discount : "",
            description: detailPackage ? detailPackage.description : "",
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            {...formItemLayout}
            name="product_id"
            label="List Product:"
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}
          >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a product"
              optionFilterProp="children"
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.listProduct.map((item) => {
                let value = {
                  item: item,
                };
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Package Name:"
            name="name"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống",
              },
            ]}
          >
            <Input autoComplete="off" autoFocus placeholder="Package Name" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Price:"
            name="price"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống",
              },
            ]}
          >
            <Input autoComplete="off" placeholder="Price" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Description:"
            name="description"
            rules={[
              {
                required: true,
                message: "Trường này không được để trống",
              },
            ]}
          >
            <CKEditor
              className="CKEditor"
              data={detailPackage.description}
              onChange={this.onEditorChange}
            />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit" className="btn-add">
              <span>Update</span>
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <div className="row-header">
          <Link to="/package" className="btn-back">
            <LeftCircleOutlined />
            {/* Back */}
          </Link>
          <span className="title-create-customer">Update package</span>
        </div>

        <Row gutter={[15, 15]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            {this.renderformAdd()}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listProduct: state.products.listProductSuccess,
  detailPackage: state.packages.detailPackageSuccess,
});

const mapDispatchToProps = {
  dpgetListProduct: (page, page_size) => getListProduct(page, page_size),
  dbgetListPackage: () => getListPackage(),
  dpaddPackage: (data) => addPackage(data),
  dbdetailPackage: (package_id) => detailPackage(package_id),
  dbupdatePackage: (package_id, data) => updatePackage(package_id, data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditPackage));
