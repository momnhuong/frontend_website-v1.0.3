import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { Form, Upload, Spin } from "antd";
import "./styles.css";
import { IMAGES } from "../../assets";
import { PlusOutlined } from "@ant-design/icons";

class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      base64: null,
      imageLink: "",
    };
  }
  componentDidMount(){
    if(this.props.src){
      this.setState({
        base64:this.props.src
      })
    }
    
  }
  handleBeforeUpload = (file) => {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const reader = new FileReader();

      reader.addEventListener("loadstart", () => {
        this.setState({
          isLoading: true,
        });
      });

      reader.addEventListener("load", () => {
        this.setState({
          base64: reader.result,
        });
      });

      reader.addEventListener("loadend", () => {
        this.setState({
          isLoading: false,
        });
      });

      reader.readAsDataURL(file);
    }

    return false;
  };

  render() {
    let src =(this.props.src?this.props.src:this.state.base64)
    return (
      <Form.Item
        name="file"
        label="Hình ảnh"
        rules={[
          { required: true, message: "Trường này không được để trống" },
        ]}
      >
        <Upload
          name="image"
          listType="picture-card"
          className="image-upload"
          multiple={false}
          accept=".jpeg, .png, .jpg"
          showUploadList={false}
          fileList={false}
          beforeUpload={this.handleBeforeUpload}
        >
          <Spin spinning={this.state.isLoading}>
            {this.state.base64 ? (
              <img src={this.state.base64} alt="" style={{ height: 140 }} />
            ) : (
              <PlusOutlined />
            )}
          </Spin>
        </Upload>
      </Form.Item>
    );
  }
}

ImageComponent.propTypes = {
  imageLink: PropTypes.string,
};
export default ImageComponent;
