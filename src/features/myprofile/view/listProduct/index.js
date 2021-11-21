import React, { Component } from "react";
import {
  replaceTiengVietCoDau,
  formatCurrency,
} from "../../../../utils/fotmat";
import Modal from "react-modal";

import { Link } from "react-router-dom";
import { Table, Space, Input, Button, Row, Tag } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import renderHTML from "react-render-html";

import { connect } from "react-redux";
import { ChevronDown } from "react-feather";
import { IMAGES } from "../../../../assets";
import * as Icon from "react-feather";
import "./styles.css";
import {
  getListProduct,
  delProduct,
} from "../../../products/services/services";
import { pushPage } from "../../../../app/actions";

const customStyles = {
  content: {
    top: "53%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
};

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      checkAll: false,
      selectItems: [],
      searchStr: "",
      modalIsOpen: false,
      type: "",
      page: 1,
      page_size: 10,
      dataSource: [],
      total: undefined,
      id: null,
    };
  }

  handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (value === "") {
      console.log("handleChange", value);
      this.setState(
        {
          searchStr: "",
        },
        () => {
          this.props.dpgetListProduct(
            value,
            this.state.page,
            this.state.page_size
          );
        }
      );
    }
    if (value !== "") {
      this.setState(
        {
          [name]: value,
          page:1
        },
        () => {
          this.props.dpgetListProduct(
            value,
            this.state.page,
            this.state.page_size
          );
        }
      );
    }
  };
  renderListProduct() {
    let listProduct =
      this.props.listProduct &&
      this.props.listProduct.data &&
      this.props.listProduct.data.results.length > 0
        ? this.props.listProduct.data.results
        : [];
    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: "Picture",
        dataIndex: "src",
        render: (value) => {
          return (
            <img src={value} className="img-responsive" alt="nam product" />
          );
        },
      },
      {
        title: "Product Name",
        dataIndex: "name",
      },
      {
        title: "Category",
        dataIndex: "catelog_id",
        render: (value) => {
          return value.name;
        },
      },
      {
        title: "Description",
        dataIndex: "brief_description_en",
        render: (value) => {
          return value ? renderHTML(value) : null;
        },
      },
      {
        title: "Status",
        dataIndex: "on_active",
        render: (value) => {
          return value ? (
            <Tag color="#0bcbff" key={1}>
              Active
            </Tag>
          ) : (
            <Tag color="red" key={2}>
              Deactive
            </Tag>
          );
        },
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link to={`editproduct/${record.id}`}>
              <EditOutlined />
            </Link>

            <a
              onClick={() => {
                this.openModal(record.id);
              }}
            >
              <DeleteOutlined />
            </a>
          </Space>
        ),
      },
    ];
    return (
      <Table
        rowClassName={() => "editable-row"}
        dataSource={listProduct}
        columns={columns}
        className="table-content"
        pagination={{
          total:
            this.props.listProduct && this.props.listProduct.data
              ? this.props.listProduct.data.total
              : 0,
          // showTotal: (total) => `Tổng ${total}`,
          current: this.state.page,
          pageSize: this.state.page_size,
          // onChange:{(current) => this.setData(current)}
          onChange: (page) => {
            this.setState(
              {
                page: page,
              },
              () => {
                this.props.dpgetListProduct(
                  this.state.searchStr,
                  this.state.page,
                  this.state.page_size
                );
              }
            );
          },
        }}
      />
    );
  }

  componentDidMount() {
    this.props.dpgetListProduct(
      this.state.searchStr,
      this.state.page,
      this.state.page_size
    );
    if (this.props.listProduct) {
      console.log("listProductnew", this.props.listProduct.data);
    }
  }
  openModal = (item) => {
    console.log("openModal", item);
    this.setState({
      modalIsOpen: true,
      id: item,
    });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  delProduct = () => {
    this.props
      .dpDelProduct(this.state.id)
      .then((res) => {
        if (res.status === 200) {
          this.props.dpgetListProduct(
            this.state.searchStr,
            this.state.page,
            this.state.page_size
          );
          window.location.reload();
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
    this.closeModal();
  };
  contentDel() {
    return (
      <div className="box_logout">
        <div className="off_box" onClick={this.closeModal}>
          <img
            src={IMAGES.icon_close}
            className="img-responsive"
            alt="img_btn_logout"
          />
        </div>
        <div className="content_box_logout">
          <p>Bạn có muốn xoá sản phẩm này không? </p>
        </div>

        <div className="btn_gr_logout">
          <Button
            type="button"
            className="btn btn-default btn_logout"
            onClick={() => {
              this.delProduct();
            }}
          >
            Xoá
          </Button>
          <Button
            type="button"
            className="btn btn-default btn_cancel_logout"
            onClick={this.closeModal}
          >
            Huỷ
          </Button>
        </div>
      </div>
    );
  }
  render() {
    console.log("this.props.match.path", this.props.match, this.props.location);
    const { rowData, checkAll } = this.state;
    console.log("rowData", rowData);
    const location = {
      pathname: `list-product/add/`,
      state: { type: "add" },
    };
    return (
      <div className="container-fluid list-product">
        <Row className="top">
          <div className="actions action-btns">
            <Link to={location}>
              <Button type="button" className="btn btn-default btn-add">
                <Icon.Plus /> Add New
              </Button>
            </Link>
          </div>
          <div className="action-search">
            <Input
              type="text"
              name="searchStr"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
            />
          </div>
        </Row>

        {this.renderListProduct()}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          {this.contentDel()}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listProduct: state.products.listProductSuccess,
});

const mapDispatchToProps = {
  dpgetListProduct: (searchStr, page, page_size) =>
    getListProduct(searchStr, page, page_size),
  dpDelProduct: (product_id) => delProduct(product_id),
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);
