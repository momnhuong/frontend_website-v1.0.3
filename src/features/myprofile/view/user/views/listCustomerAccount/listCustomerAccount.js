import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import React, { Component } from "react";
import * as Icon from "react-feather";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGES } from "../../../../../../assets";
import {
  delCustomerAccount,
  getListCustomersAccount,
  getRule,
} from "../../services/services";
import "./listcustomerAccount.css";

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
class ListCustomerAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      checkAll: false,
      selectItems: [],
      searchStr: undefined,
      displayDetail: false,
      modalIsOpen: false,
      page: 1,
      page_size: 10,
      dataSource: [],
      total: undefined,
      id: null,
    };
  }

  async componentDidMount() {
    this.props.dispatchGetListCustomerAccount(
      this.state.page,
      this.state.page_size
    );
    this.props.dbGetRoleSuccess();
    let { listCustomerAccount } = this.props;
    if (listCustomerAccount) {
      console.log("listCustomerAccount", listCustomerAccount);
    }
  }

  handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (value === "") {
      console.log("handleChange", value);
      this.setState({
        searchStr: undefined,
      });
    }
    if (value !== "") {
      this.setState(
        {
          [name]: value,
        },
        () => {
          console.log("searchStr", this.state.searchStr);
        }
      );
    }
  };

  onChangeSelectAll = (select) => {
    let listCustomerAccount = this.props.listCustomerAccount
      ? this.props.listCustomerAccount.data
      : [];
    if (listCustomerAccount && listCustomerAccount.length > 0) {
      const lstlistCustomerAccount =
        listCustomerAccount &&
        listCustomerAccount
          .map((s) => s && s.listCustomerAccount)
          .reduce((elem1, elem2) => elem1 && elem1.concat(elem2));

      if (select.target.checked) {
        this.setState(
          {
            checkAll: true,
            selectItems: lstlistCustomerAccount,
          },
          () => {
            console.log("selectItemsAll", this.state.checkAll);
          }
        );
      } else {
        this.setState(
          {
            checkAll: false,
            selectItems: [],
          },
          () => {
            console.log("selectItemsAll", this.state.checkAll);
          }
        );
      }
    }
  };
  deleteItem = (id) => {
    this.props
      .dpdelCustomerAccount(id)
      .then((res) => {
        if (res.status === 200) {
          this.props.dispatchGetListCustomerAccount(
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

  onchangeSelect = (select, data) => {
    const { count, selectItems } = this.state;
    if (select.target.checked) {
      selectItems.push(data);
      this.setState(
        {
          count: count + 1,
          checkAll: false,
          selectItems,
        },
        () => {
          console.log("selectItems", this.state.selectItems);
        }
      );
    } else {
      selectItems.splice(selectItems.indexOf(data), 1);

      this.setState({
        count: count - 1,
        checkAll: false,
        selectItems,
      });
    }
  };
  toggleDisplay = (item) => {
    console.log("toggleDisplay", item);
    if (this.state.displayDetail) {
      this.setState({
        displayDetail: false,
        item,
      });
    } else {
      this.setState({
        displayDetail: true,
        item,
      });
    }
  };

  openModal = (id) => {
    this.setState({
      modalIsOpen: true,
      id: id,
    });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  contentDel() {
    console.log("render", this.props.listCustomerAccount);
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
          <p>Bạn có muốn xoá nhân viên này không? </p>
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
    let listAccountOfCustomer =
      this.props.listCustomerAccount && this.props.listCustomerAccount.data
        ? this.props.listCustomerAccount.data.results
        : [];

    console.log("listAccountOfCustomer", this.props.listCustomerAccount);
    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: "Full Name",
        dataIndex: "fullname",
      },
      {
        title: "Username",
        dataIndex: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Customer Name",
        dataIndex: "customer_of",
        render: (value) => {
          return value.customer_name;
        },
      },
      {
        title: "Role",
        dataIndex: "role",
        render: (value) => {
          return value.name;
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
            <Link to={`customer-account/edit/${record.id}`}>
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
      <React.Fragment>
        <div className="row top">
          <div className="actions action-btns">
            <Link to="customer-account/add">
              <Button type="button" className="btn-add">
                <Icon.Plus /> Add New
              </Button>
            </Link>
          </div>
          {/* <div className="action-search">
            <img
              src={IMAGES.icons_search}
              className="img-responsive"
              alt="icons search"
            />

            <input
              type="text"
              name="searchStr"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Tìm kiếm"
            />
          </div> */}
        </div>
        <Table
          rowClassName={() => "editable-row"}
          dataSource={listAccountOfCustomer}
          columns={columns}
          className="table-content"
          pagination={{
            total:
              this.props.listCustomerAccount &&
              this.props.listCustomerAccount.data
                ? this.props.listCustomerAccount.data.total
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
                  this.props.dispatchGetListCustomerAccount(
                    this.state.page,
                    this.state.page_size
                  );
                }
              );
            },
          }}
        />
      </React.Fragment>
    );
  }
  render() {
    return (
      <div className="container-fluid list-customer">
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
  listCustomerAccount: state.customer.listCustomerAccountSuccess,
  listRole: state.customer.dataRuleSuccess,
});

const mapDispatchToProps = {
  dispatchGetListCustomerAccount: (page, page_size) =>
    getListCustomersAccount(page, page_size),
  dbGetRoleSuccess: () => getRule(),
  dpdelCustomerAccount: (id_customer) => delCustomerAccount(id_customer),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCustomerAccount);
