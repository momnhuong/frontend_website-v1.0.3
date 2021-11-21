import React, { Component } from "react";
import {
  replaceTiengVietCoDau,
  filterString,
} from "../../../../../../utils/fotmat";

import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

import { connect } from "react-redux";
import { Table, Space, Button, Row, Input, Tag } from "antd";
import { ChevronDown } from "react-feather";
import { IMAGES } from "../../../../../../assets";
import {
  getListCustomer,
  delCustomer,
  getListAccountOfCustomer,
} from "../../services/services";
import DetailCustomer from "./detailCustomer";
import * as Icon from "react-feather";
import "./listcustomer.css";
import Modal from "react-modal";

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

class ListCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      selectItems: [],
      item: {},
      searchStr: "",
      displayDetail: false,
      modalIsOpen: false,
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
    this.setState({
      [name]: value,
    });
    if (value !== "") {
      this.setState(
        {
          [name]: value,
        },
        () => {
          this.props.dispatchGetListCustomer(
            value,
            this.state.page,
            this.state.page_size
          );
        }
      );
    }
    if (value === "") {
      this.setState(
        {
          [name]: value,
        },
        () => {
          this.props.dispatchGetListCustomer(
            value,
            this.state.page,
            this.state.page_size
          );
        }
      );
    }
  };

  deleteItem = (id) => {
    this.props
      .dpdelCustomer(id)
      .then((res) => {
        if (res.status === 200) {
          this.props.dispatchGetListCustomer(
            this.state.searchStr,
            this.state.page,
            this.state.page_size
          );
          this.closeModal();
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
  editItem = (item) => {
    console.log("editItem", item);
  };

  openModal = (id) => {
    console.log("openModal", id);
    this.setState({
      modalIsOpen: true,
      id: id,
    });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
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
          <p>Bạn có muốn xoá customer này không? </p>
        </div>

        <div className="btn_gr_logout">
          <Button
            type="button"
            className="btn btn-default btn_logout"
            onClick={() => {
              this.deleteItem(this.state.id);
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

  renderList() {
    let listCustomer =
      this.props.listCustomer && this.props.listCustomer.data
        ? this.props.listCustomer.data.results
        : [];
    // const finalData = this.state.searchStr
    //   ? listCustomer.filter((item) =>
    //       filterString(
    //         replaceTiengVietCoDau(item.customer_name),
    //         replaceTiengVietCoDau(this.state.searchStr)
    //       )
    //     )
    //   : listCustomer;
    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: "Customer Name",
        dataIndex: "customer_name",
      },
      {
        title: "Tax Number",
        dataIndex: "tax_code",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
      {
        title: "Date",
        dataIndex: "created_at",
        render: (value) => {
          return moment(value).format('DD/MM/YYYY');
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
            <Link to={`list-customer/edit/${record.id}`}>
              <EditOutlined />
            </Link>

            {/* <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <a href="#">
                <DeleteOutlined />
              </a>
            </Popconfirm> */}
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
      <div className="container-fluid list-product">
        <Row className="top">
          <div className="actions action-btns">
            <Link to="list-customer/add">
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

        <Table
          rowClassName={() => "editable-row"}
          dataSource={listCustomer}
          columns={columns}
          className="table-content"
          pagination={{
            total:
              this.props.listCustomer && this.props.listCustomer.data
                ? this.props.listCustomer.data.total
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
                  this.props.dispatchGetListCustomer(
                    this.state.searchStr,
                    this.state.page,
                    this.state.page_size
                  );
                }
              );
            },
          }}
        />
      </div>
    );
  }
  componentDidMount() {
    this.props.dispatchGetListCustomer(
      this.state.searchStr,
      this.state.page,
      this.state.page_size
    );
  }
  render() {
    return (
      <div className="list-customer">
        {this.renderList()}
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
  listCustomer: state.customer.dataSuccess,
  listAccountofCustomer: state.customer.listAccountofCustomerSuccess,
});

const mapDispatchToProps = {
  dispatchGetListCustomer: (custome_name, page, page_size) =>
    getListCustomer(custome_name, page, page_size),
  dpdelCustomer: (id_customer) => delCustomer(id_customer),
  dpgetListAccountOfCustomer: (customer_id) =>
    getListAccountOfCustomer(customer_id),
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCustomer);
