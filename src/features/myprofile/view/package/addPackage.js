import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import CKEditor from "ckeditor4-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { offLoading } from "../../../../app/actions";
import Notification from "../../../../components/Notification";
import { history } from "../../../../store/history";
import { getListProduct } from "../../../products/services/services";
import { addPackage } from "./services/services";
import "./styles.css";

class AddPackage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listProduct: [],
      description: "",
      searchString: "",
      page: 1,
      page_size: 1000,
    };
  }

  componentDidMount() {
    this.props.dpoffLoading();
    this.props
      .dpgetListProduct(
        this.state.searchString,
        this.state.page,
        this.state.page_size
      )
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.results &&
          res.data.results.length > 0
        ) {
          this.setState({
            listProduct: res.data.results,
            isLoading: false,
          });
        }
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
  }
  onFinish = (values) => {
    console.log("onHandleSubmit", values);
    let datanew = {
      product_id: `${values.product_id}`,
      name: values.name,
      price: values.price,
      discount: values.discount,
      description: this.state.description,
    };
    this.props
      .dpaddPackage(datanew)
      .then((res) => {
        if (res.status === 201) {
          Notification("success", "Create package success");
          history.push("/package");
          window.location.reload();
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
    this.setState(
      {
        searchString: val,
      },
      () => {
        this.props.dpgetListProduct(
          this.state.searchString,
          this.state.page,
          this.state.page_size
        );
      }
    );
  };
  renderformAdd() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const { Option } = Select;
    return (
      <Form
        className="form-add-package"
        layout="horizontal"
        size="large"
        onFinish={this.onFinish}
      >
        <Form.Item
          {...formItemLayout}
          name="product_id"
          label="Product Name:"
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
          <Input autoComplete="off" autoFocus placeholder="Price" />
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
            data={this.state.description}
            onChange={this.onEditorChange}
          />
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit" className="btn-add">
            <span>Add</span>
          </Button>
        </Form.Item>
      </Form>
    );
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
          <span className="title-create-customer">create package</span>
        </div>

        <Row gutter={[15, 15]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            {/* {isLoading ? <LoadingBox /> : this.renderformAdd()} */}
            {this.renderformAdd()}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listProduct: state.products.listProductSuccess,
});

const mapDispatchToProps = {
  dpgetListProduct: (searchString, page, page_size) =>
    getListProduct(searchString, page, page_size),
  dpaddPackage: (data) => addPackage(data),
  dpoffLoading: () => offLoading(),
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPackage);
