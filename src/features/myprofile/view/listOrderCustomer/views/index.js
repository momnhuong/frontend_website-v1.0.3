import {
  DeleteOutlined,
  EyeOutlined,
  InboxOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Space, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { hidePopup, offLoading, showPopup } from "../../../../../app/services";
import { IMAGES } from "../../../../../assets";
import NoData from "../../../../../components/nodata";
import Notification from "../../../../../components/Notification";
import { formatCurrency } from "../../../../../utils/fotmat";
import {
  createContract,
  delOrderOfCustomer,
  getDetailOrderOfCustomer,
  getListOrderOfCustomer,
} from "../services/services";
import "./styles.css";

class ListOrderCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      checkAll: false,
      selectItems: [],
      searchStr: "",
      modalIsOpen: false,
      page: 1,
      page_size: 10,
      dataSource: [],
      total: undefined,
      id: null,

      visible: false,
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
          searchStr: value,
        },
        () => {
          this.props.dpgetListOrderOfCustomer(
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
          page: 1,
        },
        () => {
          this.props.dpgetListOrderOfCustomer(
            value,
            this.state.page,
            this.state.page_size
          );
        }
      );
    }
  };
  handleChangeContract = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState(
      {
        nameContract: value,
      },
      () => {
        console.log(this.state.nameContract);
      }
    );
  };

  detailOrderCustomer(id) {
    this.props
      .dpgetDetailOrderOfCustomer(id)
      .then((res) => {
        console.log("onHandleSubmit!", res);
        if (res.status === 200) {
          let item = {
            id: id,
            item: res.data,
          };
          this.props.dispatchShowPopup("detailOrderCustomer", item);
        } else {
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
    //
  }
  createContract(id, customer) {
    let today = new Date();
    const customerID = customer.id;
    let data = {
      order_id: `${id}`,
      contract_id: `${today.getFullYear()}${customerID}${id}`,
    };

    this.props
      .dpcreateContract(data)
      .then((res) => {
        // console.log("onHandleSubmit!", res);
        if (res.status === 201) {
          this.props.dispatchShowPopup("createContractSuccess");
          this.props.dpgetListOrderOfCustomer(
            this.state.page,
            this.state.page_size
          );
        } else {
          this.props.dispatchoffLoading();
          Notification("error", res.data.order_id[0]);
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  }
  renderListOrder() {
    let listOrderCustomer =
      this.props.listOrderCustomer &&
      this.props.listOrderCustomer.data &&
      this.props.listOrderCustomer.data.results.length > 0
        ? this.props.listOrderCustomer.data.results
        : [];
    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: "Order ID",
        render: (value) => {
          return value.order_id;
        },
      },
      {
        title: "Customer Name",
        dataIndex: "customer",
        render: (customer) => {
          return customer.customer_name;
        },
      },
      {
        title: "Amount",
        dataIndex: "amount",
        render: (value) => {
          return (
            formatCurrency(
              Math.floor(parseInt(value) + (parseInt(value) * 10) / 100)
            ) +
            " " +
            "VND"
          );
        },
      },
      {
        title: "Created",
        dataIndex: "created_at",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          return (
            <Space size="middle">
              {/* <Link to={`editproduct/${record.id}`}>
                <EditOutlined />
              </Link> */}
              <a
                onClick={() => {
                  this.detailOrderCustomer(record.id);
                }}
              >
                <EyeOutlined />
              </a>
              <a onClick={() => this.showModal(record.id, "del")}>
                <DeleteOutlined />
              </a>

              {!record.signed ? (
                <Link
                  to="#"
                  onClick={() =>
                    this.showModal(record.id, "createContract", record.customer)
                  }
                  // onClick={() => {
                  //   this.createContract(record.id, record.customer);
                  // }}
                >
                  <InboxOutlined />
                </Link>
              ) : null}
            </Space>
          );
        },
      },
    ];
    return (
      <Table
        rowClassName={() => "editable-row"}
        dataSource={listOrderCustomer}
        columns={columns}
        className="table-content"
        pagination={{
          total:
            this.props.listOrderCustomer && this.props.listOrderCustomer.data
              ? this.props.listOrderCustomer.data.total
              : 0,
          // showTotal: (total) => `Tổng ${total}`,
          current: this.state.page,
          pageSize: this.state.page_size,
          // onChange:{(current) => this.setData(current)}
          onChange: (page, page_size) => {
            this.setState(
              {
                page: page,
                page_size: page_size,
              },
              () => {
                this.props.dpgetListOrderOfCustomer(
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
    this.props.dpgetListOrderOfCustomer(
      this.state.searchStr,
      this.state.page,
      this.state.page_size
    );
    // this.props.dpgetListOrderOfCustomer(this.state.page,this.state.page_size);
    if (this.props.listOrderCustomer) {
      console.log("listOrderCustomer", this.props.listOrderCustomer);
    }
  }
  showModal = (id, type, customer_id) => {
    console.log("showmodal", id, type);
    this.setState(
      {
        id_order: id,
        visible: true,
        type: type,
        customer_id: customer_id,
      },
      () => {
        console.log("setstate", this.state.id_order);
      }
    );
    // if(type ==="del"){
    //   return()
    // }
  };
  handleOk = (e) => {
    console.log(e);
    if (this.state.type === "del") {
      this.props
        .dpdelOrderOfCustomer(this.state.id_order)
        .then((res) => {
          console.log("dpdelOrderOfCustomer", res);

          if (res.status === 200) {
            this.setState({
              visible: false,
            });
            this.props.dpgetListOrderOfCustomer();
          }
        })
        .catch((message_code) => {
          console.log("error: ", message_code);
        });
    } else {
      let today = new Date();
      const customerID = this.state.customer_id.id;
      let data = {
        order_id: `${this.state.id_order}`,
        contract_id: `${today.getFullYear()}${customerID}${
          this.state.id_order
        }`,
        contract_name: this.state.nameContract,
      };
      this.props
        .dpcreateContract(data)
        .then((res) => {
          // console.log("onHandleSubmit!", res);
          if (res.status === 201) {
            this.setState({
              visible: false,
            });
            Notification("success", "Create Contract Success!");
            // this.props.dispatchShowPopup("createContractSuccess");
            this.props.dpgetListOrderOfCustomer();
          } else {
            this.props.dispatchoffLoading();
            Notification("error", res.data.order_id[0]);
          }
        })
        .catch((message_code) => {
          console.log("error: ", message_code);
        });
    }
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  contentDel() {
    let { id_order, type } = this.state;
    console.log("contentDel", this.state.type);
    if (this.state.type === "del") {
      return <p>Bạn có muốn xoá order này không? </p>;
    } else {
      return (
        <div>
          <p>Vui lòng nhập tên Hợp Đồng</p>
          <Input
            name="nameContract"
            placeholder="Nhập tên hợp đồng"
            onChange={this.handleChangeContract}
          />
        </div>
      );
    }
  }
  renderUI() {
    if (
      this.props.listOrderCustomer &&
      this.props.listOrderCustomer.data &&
      this.props.listOrderCustomer.data.results &&
      this.props.listOrderCustomer.data.results.length > 0
    ) {
      return <React.Fragment>{this.renderListOrder()}</React.Fragment>;
    } else {
      return <NoData />;
    }
  }

  render() {
    return (
      <div className="container-fluid list-customer list-order-customer">
        <div className="row top">
          <div className="actions action-btns">
            <Link to="/products">
              <Button type="button" className="btn btn-default btn-add">
                <Icon.Plus /> Add New
              </Button>
            </Link>
          </div>
          <div className="action-search">
            <img
              src={IMAGES.icons_search}
              className="img-responsive"
              alt="icons search"
            />

            <Input
              type="text"
              name="searchStr"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
            />
          </div>
        </div>
        {this.renderUI()}
        <Modal
          title={this.state.type === "del" ? "Message" : "Enter name contract"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.contentDel()}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listOrderCustomer: state.orderofcustomer.listOrderCustomerSuccess,
});

const mapDispatchToProps = {
  dpgetListOrderOfCustomer: (searchStr, page, page_size) =>
    getListOrderOfCustomer(searchStr, page, page_size),
  dpgetDetailOrderOfCustomer: (order_id) => getDetailOrderOfCustomer(order_id),
  dispatchShowPopup: (popupType, item) => showPopup(popupType, item),
  dispathHidePopup: () => hidePopup(),
  dpdelOrderOfCustomer: (order_id) => delOrderOfCustomer(order_id),
  dpcreateContract: (data) => createContract(data),
  dispatchoffLoading: () => offLoading(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderCustomer);
