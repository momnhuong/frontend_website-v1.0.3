import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import CKEditor from "ckeditor4-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { offLoading } from "../../../../app/services";
import { IMAGES } from "../../../../assets";
import LoadingBox from "../../../../components/LoadingBox";
import ImageComponent from "../../../../components/UploadImage";
import { store } from "../../../../store";
import {
  createProduct,
  getListProduct,
} from "../../../products/services/services";
import { getlistCatelog } from "../listCatelog/services/services";
import "./editProduct.css";

const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
};
class CreatProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: "",
      description_vn: "",
      description_en: "",
      specifications: "",
      setContent: "",
      detailProduct: {},
      src: IMAGES.none_image,
      file: {},
      fileList: "",
      isLoading: true,
      listCatelog: [],
      page: 1,
      page_size: 1000,
    };
    // refFormik = React.createRef();
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props
      .dispatchListCatelog(this.state.page, this.state.page_size)
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.results &&
          res.data.results.length > 0
        ) {
          this.setState({
            listCatelog: res.data.results,
            isLoading: false,
          });
        }
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
  }

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

  handleChange = ({ file }) => {
    console.log("handleChange: ", file);
    if (file.type === "image/jpeg" || file.type === "image/png") {
      this.setState(file);
    }
  };
  onFinish = ({ file, ...values }) => {
    let dataPost = {
      name: values.name,
      link: values.link,
      to: values.to,
      brief_description_en: values.brief_description_en,
      brief_description_vn: values.brief_description_vn,
      description_vn: this.state.description_vn,
      description_en: this.state.description_en,
      catelog_id: `${values.catelog_id}`,
      specifications: this.state.specifications,
    };
    let data = { ...dataPost };
    const imageData = new FormData();
    if (file) {
      imageData.append("src", file.file);
      imageData.append("name", values.name);
      imageData.append("brief_description_en", values.brief_description_en);
      imageData.append("specifications", this.state.specifications);
      imageData.append("description_en", this.state.description_en);
      imageData.append("catelog_id", `${values.catelog_id}`);
    }
    const { userProfile } = store.getState().root;
    this.props
      .dispatchcreatProduct(imageData)
      .then((res) => {
        if (res.status === 201) {
          this.props.dpgetListProduct();
          this.props.history.goBack();
        } else {
          this.props.dpOffloading();
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
  renderformAdd() {
    const { TextArea } = Input;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 24 },
    };
    const listCatelog =
      this.props.listCatelog &&
      this.props.listCatelog.data
        ? this.props.listCatelog.data.results
        : [];
        console.log('listCatelog',listCatelog)
    return (
      <Form
        className="form-add-product"
        layout="vertical"
        size="large"
        initialValues={{
          file: "",
          name: "",
          brief_description_en: "",
          description_en: this.state.description_en,
          // catelog_id: "",
          specifications: this.state.specifications,
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
            {listCatelog.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <ImageComponent />
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
      <div className="box-edit">
        <div className="card-header">
          <Link to="/list-product">
            <LeftCircleOutlined />
          </Link>
          <div className="card-title">Creat Product</div>
        </div>
        {isLoading ? <LoadingBox /> : this.renderformAdd()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listCatelog: state.catelog.listCatelogSuccess,
});

const mapDispatchToProps = {
  dispatchcreatProduct: (data) => createProduct(data),
  dpgetListProduct: (page, page_size) => getListProduct(page, page_size),
  dispatchListCatelog: (page, page_size) => getlistCatelog(page, page_size),
  dpOffloading: () => offLoading(),
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatProduct);
