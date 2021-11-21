import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { FastField } from "formik";
import moment from "moment";
import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { hidePopup, showPopup } from "../../../../../app/services";
import { IMAGES } from "../../../../../assets";
import { UI } from "../../../../../components";
import SelectField from "../../../../../components/Formik/SelectField";
import NoData from "../../../../../components/nodata";
import { history } from "../../../../../store/history";
import { getListCustomer } from "../../user/services/services";
import {
  delProductOfCustomer,
  getDetailProductOfCustomer,
  getListProductOfCustomer,
  postProductOfCustomer,
} from "../services/services";
import "./styles/styles.css";

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

class ListProductCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      checkAll: false,
      selectItems: [],
      searchStr: undefined,
      modalIsOpen: false,
      page: 1,
      page_size: 10,
      dataSource: [],
      total: undefined,
      id: null,
    };
    this.myRef = React.createRef();
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
          page: 1,
        },
        () => {
          console.log("searchStr", this.state.searchStr);
        }
      );
    }
  };

  deleteItem = (id) => {
    console.log("deleteItem", id);
    this.props
      .dpdelProductOfCustomer(id)
      .then((res) => {
        console.log("dpdelOrderOfCustomer", res);
        this.closeModal();
        if (res.status === 200) {
          this.props.dpGetListProductOfCustomer(
            this.state.page,
            this.state.page_size
          );
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
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

  detailOrderCustomer(item) {
    this.props
      .dpgetDetailProductOfCustomer(item.customer.id)
      .then((res) => {
        console.log("onHandleSubmit!", res);
        if (res.status === 200) {
          this.props.dispatchShowPopup("detailProductCustomer", res.data);
        } else {
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  }
  actionAdd = (item) => {
    this.props
      .dpgetDetailProductOfCustomer(item.customer.id)
      .then((res) => {
        if (res.status === 200) {
          let location = {
            pathname: `${this.props.match.url}/add`,
            state: { item: item, detailOrder: res.data },
          };
          history.push(location);
          window.location.reload();
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
  renderListProduct() {
    let listProductCustomer =
      this.props.listProductCustomer &&
      this.props.listProductCustomer.data &&
      this.props.listProductCustomer.data.results &&
      this.props.listProductCustomer.data.results.length > 0
        ? this.props.listProductCustomer.data.results
        : [];
    const columns = [
      {
        title: "#",
        render: (value) => {
          return value.id;
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
        title: "Email",
        dataIndex: "customer",
        render: (customer) => {
          return customer.main_email;
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
        render: (text, record) => (
          <Space size="middle">
            <Link
              to={{
                pathname: `${this.props.match.url}/add`,
                state: { item: record, id_customer: record.customer.id },
              }}
              // onClick={() => {
              //   this.actionAdd(record);
              // }}
            >
              <EditOutlined />
            </Link>
            <a
              onClick={() => {
                this.openModal(record.customer.id);
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
        dataSource={listProductCustomer}
        columns={columns}
        className="table-content"
        pagination={{
          total:
            this.props.listProductCustomer &&
            this.props.listProductCustomer.data
              ? this.props.listProductCustomer.data.total
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
                this.props.dpgetListOrderOfCustomerUser(
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
    this.props.dpGetListProductOfCustomer(
      this.state.page,
      this.state.page_size
    );
    this.props.dispatchGetListCustomer();
  }
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
          <button
            type="button"
            className="btn btn-default btn_logout"
            onClick={() => {
              this.deleteItem(this.state.id);
            }}
          >
            Xoá
          </button>
          <button
            type="button"
            className="btn btn-default btn_cancel_logout"
            onClick={this.closeModal}
          >
            Huỷ
          </button>
        </div>
      </div>
    );
  }
  rederUI() {
    let { checkAll } = this.state;
    if (
      this.props.listCustomer &&
      this.props.listCustomer.data &&
      this.props.listCustomer.data.results.length > 0
    ) {
      return <React.Fragment>{this.renderListProduct()}</React.Fragment>;
    } else {
      return <NoData />;
    }
  }
  onHandleSubmit = (values) => {
    let data = {
      customer_id: values.customer_of_id,
      system_id: 0,
    };

    this.props
      .dispatchpostProductOfCustomer(data)
      .then((res) => {
        if (res.status === 201) {
          this.props.dpGetListProductOfCustomer();
        } else {
          if (res.status === 400) {
            if (this.myRef.current) {
              this.myRef.current.setFieldError(
                "customer_of_id",
                res.data.customer_id[0]
              );
            }
          }
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };
  render() {
    const { rowData, checkAll } = this.state;
    console.log("rowData", this.props);
    let listCustomer =
      this.props.listCustomer &&
      this.props.listCustomer.data &&
      this.props.listCustomer.data.results &&
      this.props.listCustomer.data.results.length > 0
        ? this.props.listCustomer.data.results
        : [];
    const lstCustomer = listCustomer.map((item) => {
      return {
        label: item.customer_name,
        value: item.id,
      };
    });
    return (
      <div className="container-fluid list-customer list-order-customer">
        <div className="row top">
          <div className="actions action-btns list-customer">
            <UI.Formik
              ref={this.myRef}
              initialValues={{
                customer_of_id: null,
              }}
              validationSchema={UI.yup.object().shape({
                customer_of_id: UI.yup
                  .number()
                  .required("Trường này không được để trống")
                  .nullable(),
              })}
              onSubmit={this.onHandleSubmit}
              render={(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className="box-input">
                    <div className="card-cover">
                      <FastField
                        name="customer_of_id"
                        component={SelectField}
                        placeholder="Select Customer"
                        options={lstCustomer}
                        // defaultProps={defaultProps}
                      />
                    </div>
                  </div>
                  <Button htmlType="submit" className="btn-add-product">
                    add
                  </Button>
                </form>
              )}
            />
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
        {this.rederUI()}
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
  listProductCustomer: state.productofcustomer.listProductCustomerSuccess,
  listCustomer: state.customer.dataSuccess,
});

const mapDispatchToProps = {
  dpGetListProductOfCustomer: (page, page_size) =>
    getListProductOfCustomer(page, page_size),
  dpgetDetailProductOfCustomer: (order_id) =>
    getDetailProductOfCustomer(order_id),
  dispatchShowPopup: (popupType, item) => showPopup(popupType, item),
  dispathHidePopup: () => hidePopup(),
  dpdelProductOfCustomer: (order_id) => delProductOfCustomer(order_id),
  dispatchGetListCustomer: () => getListCustomer(),
  dispatchpostProductOfCustomer: (data) => postProductOfCustomer(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListProductCustomer));
