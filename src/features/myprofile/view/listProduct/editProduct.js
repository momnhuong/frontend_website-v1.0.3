import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Switch } from "antd";
import CKEditor from "ckeditor4-react";
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../../../components/LoadingBox";
import Notification from "../../../../components/Notification";
import ImageComponent from "../../../../components/UploadImage";
import { history } from "../../../../store/history";
import {
  editProduct,
  getDetailProduct,
} from "../../../products/services/services";
// import { UI } from "../../../../components";
// import { IMAGES } from "../../../../assets";
// import JoditEditor from "jodit-react";
import { getlistCatelog } from "../listCatelog/services/services";
import "./editProduct.css";

// const config = {
//   readonly: false, // all options from https://xdsoft.net/jodit/doc/
// };

// const { Option } = Select;
class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: "",
      specifications: "",
      description_en: "",
      setContent: "",
      detailProduct: {},
      listCatelog: [],
      isLoading: true,
    };
    // refFormik = React.createRef();
  }

  onFinish = ({ file, ...values }) => {
    let detailProductNew = this.props.detailProduct;

    let data = {
      name: values.name,
      brief_description_en: values.brief_description_en,
      description_en: this.state.description_en,
      catelog_id: `${values.catelog_id}`,
      on_active: this.state.on_active,
      specifications: this.state.specifications,
      src: file,
    };
    const imageData = new FormData();
    const imageDataNew = new FormData();
    if (!_.isEmpty(file)) {
      if (
        detailProductNew &&
        detailProductNew.data &&
        detailProductNew.data.src === file
      ) {
        imageData.append("name", values.name);
        imageData.append("brief_description_en", values.brief_description_en);
        imageData.append("specifications", this.state.specifications);
        imageData.append("description_en", this.state.description_en);
        imageData.append("catelog_id", `${values.catelog_id}`);
        imageData.append("on_active", this.state.on_active);
      } else {
        imageDataNew.append("src", file.file);
        imageDataNew.append("name", values.name);
        imageDataNew.append(
          "brief_description_en",
          values.brief_description_en
        );
        imageDataNew.append("specifications", this.state.specifications);
        imageDataNew.append("description_en", this.state.description_en);
        imageDataNew.append("catelog_id", `${values.catelog_id}`);
        imageDataNew.append("on_active", this.state.on_active);
      }
    }
    let detailProduct = this.state.detailProduct;
    let dataPost;

    if (!_.isEmpty(file)) {
      console.log('co file')
      if (detailProductNew.data.src === file) {
        dataPost = imageData;
      } else {
        dataPost = imageDataNew;
      }
    } else {
      dataPost = data;
    }
    this.props
      .dispatchEditProduct(detailProduct.id, dataPost)
      .then((res) => {
        Notification("success", "Update success");
        history.push("/list-product");
        window.location.reload();
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
  onChangeEdit = (e) => {
    console.log(e);
    this.setState({
      description_vn: e,
    });
  };
  onChangeEditEN = (e) => {
    console.log(e);
    this.setState({
      description_en: e,
    });
  };
  async componentDidMount() {
    let id = this.props.match.params.id;
    // console.log("componentDidMount", id);
    await this.props
      .dispatchListCatelog()
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.results &&
          res.data.results.length > 0
        ) {
          this.props
            .dispatchGetDetailProduct(id)
            .then((resProd) => {
              if (res.status === 200) {
                this.setState({
                  listCatelog: res.data.results,
                  detailProduct: resProd.data,
                  specifications: resProd.data.specifications,
                  description_en: resProd.data.description_en,
                  isLoading: false,
                  on_active: resProd.data.on_active,
                });
              }
            })
            .catch((message_code) => {
              console.log("error: ", message_code);
            });
        }
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
  }
  onEditorChangeEN = (evt) => {
    this.setState(
      {
        description_en: evt.editor.getData(),
      },
      () => {
        console.log("onEditorChange", this.state.description_en);
      }
    );
  };
  onEditorChange = (evt) => {
    this.setState(
      {
        specifications: evt.editor.getData(),
      },
      () => {
        console.log("specifications:", this.state.specifications);
      }
    );
  };
  onChangeStatus = () => {
    this.setState(
      {
        on_active: !this.state.on_active,
      },
      () => {
        console.log("onChangeStatus", this.state.on_active);
      }
    );
  };
  renderformEdit() {
    const { TextArea } = Input;
    const { isLoading } = this.state;
    // console.log("isLoading", isLoading);
    if (isLoading) return;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
    };
    // const listCatelog =
    //   this.props.listCatelog &&
    //   this.props.listCatelog.data &&
    //   this.props.listCatelog.data.results > 0
    //     ? this.props.listCatelog.data.results
    //     : [];
    let detailProduct = this.props.detailProduct
      ? this.props.detailProduct.data
      : {};
    return (
      <Form
        className="form-add-product"
        layout="vertical"
        size="large"
        initialValues={{
          file: detailProduct.src || "",
          name: detailProduct.name || "",
          brief_description_en: detailProduct.brief_description_en || "",
          description_en: detailProduct.description_en || "",
          catelog_id: detailProduct.catelog_id || "",
          on_active: this.state.on_active,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          {...formItemLayout}
          name="catelog_id"
          label="Catelog:"
          rules={[
            { required: true, message: "Trường này không được để trống" },
          ]}
        >
          <Select>
            {this.state.listCatelog.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <ImageComponent src={detailProduct.src} />
        <Form.Item
          {...formItemLayout}
          label="Product Name:"
          name="name"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Product Name" />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Link video:" name="link">
          <Input autoComplete="off" placeholder="Link video" type="text" />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="Sort Description:"
          name="brief_description_en"
        >
          <TextArea
            rows={4}
            placeholder="Sort Description"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          {...formItemLayout}
          label="Description:"
          name="description_en"
        >
          <CKEditor
            className="CKEditor"
            data={this.state.description_en}
            onChange={this.onEditorChangeEN}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Specifications:"
          name="specifications"
        >
          <CKEditor
            className="CKEditor"
            data={this.state.specifications}
            onChange={this.onEditorChange}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Status:" name="on_active">
          <Switch
            checked={this.state.on_active}
            onChange={() => {
              this.onChangeStatus();
            }}
          />
          {/* <Select defaultValue={detailProduct.on_active}>
            <Option value={true}>Active</Option>
            <Option value={false}>Deactive</Option>
          </Select> */}
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" className="btn-add">
            <span>Update</span>
          </Button>
        </Form.Item>
      </Form>
    );
  }
  render() {
    let { isLoading } = this.state;
    return (
      <div className="box-edit">
        <div className="card-header">
          <Link to="/list-product">
            <LeftCircleOutlined />
          </Link>
          <div className="card-title">Update Product</div>
        </div>
        {!isLoading ? this.renderformEdit() : <LoadingBox />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  detailProduct: state.products.detailProductSuccess,
  listCatelog: state.catelog.listCatelogSuccess,
});

const mapDispatchToProps = {
  dispatchGetDetailProduct: (id) => getDetailProduct(id),
  dispatchListCatelog: (page, page_size) => getlistCatelog(page, page_size),

  dispatchEditProduct: (product_id, data) => editProduct(product_id, data),
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
