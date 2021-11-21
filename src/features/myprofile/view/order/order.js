import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { showPopup } from "../../../../app/services";
import { IMAGES } from "../../../../assets";
import { formatCurrency } from "../../../../utils/fotmat";
import "./order.css";
import {
  getdetailOrderOfCustomerUser,
  getListOrderOfCustomerUser,
} from "./services/services";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      checkAll: false,
      selectItems: [],
      searchStr: undefined,
      page: 1,
      page_size: 10,
      dataSource: [],
      total: undefined,
      id: null,
      modalIsOpen: false,
    };
  }

  handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (value !== "") {
      this.setState(
        {
          [name]: value,
        },
        () => {
          this.props.dpgetListOrderOfCustomerUser(
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
          this.props.dpgetListOrderOfCustomerUser(
            value,
            this.state.page,
            this.state.page_size
          );
        }
      );
    }
  };

  onChangeSelectAll = (select) => {
    let listOrder = this.state.listOrder;
    if (listOrder && listOrder.length > 0) {
      const lstlistOrder =
        listOrder &&
        listOrder
          .map((s) => s && s.listOrder)
          .reduce((elem1, elem2) => elem1 && elem1.concat(elem2));

      if (select.target.checked) {
        this.setState(
          {
            checkAll: true,
            selectItems: lstlistOrder,
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
  deleteItem = (item) => {
    console.log("deleteItem", item);
  };
  editItem = (item) => {
    console.log("editItem", item);
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
  renderListOrder() {
    const { formatMessage } = this.props.intl;

    let listOrderOfCustomer =
      this.props.listOrderUser &&
      this.props.listOrderUser.data &&
      this.props.listOrderUser.data.results.length > 0
        ? this.props.listOrderUser.data.results
        : [];
    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: formatMessage({ id: "features.order.table.id" }),
        render: (value) => {
          // console.log("value", value);
          // const customerName = value.customer.customer_name.split(" ").join("");
          // const orderID = `${customerName}${value.customer.id}${value.id}`
          //   .replace(" ", "")
          //   .toLocaleUpperCase();
          return value.order_id;
        },
      },
      {
        title: formatMessage({ id: "features.table.Amount" }),
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
      // {
      //   title: "Discount",
      //   dataIndex: "discount",
      // },
      {
        title: formatMessage({ id: "features.table.Create" }),
        dataIndex: "created_at",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
      {
        title: formatMessage({ id: "features.table.Action" }),
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a
              onClick={() => {
                this.detailOrderCustomer(record.id);
              }}
            >
              <EyeOutlined />
            </a>
          </Space>
        ),
      },
    ];
    return (
      <Table
        rowClassName={() => "editable-row"}
        dataSource={listOrderOfCustomer}
        columns={columns}
        className="table-content"
        pagination={{
          total:
            this.props.listOrderUser && this.props.listOrderUser.data
              ? this.props.listOrderUser.data.total
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
  }
  componentDidMount() {
    this.props.dpgetListOrderOfCustomerUser(
      this.state.searchStr,
      this.state.page,
      this.state.page_size
    );
    console.log("listOrderUser", this.props.listOrderUser);
  }
  render() {
    return (
      <div className="container-fluid list-customer">
        <div className="row top">
          <div className="actions action-btns"></div>
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

        {this.renderListOrder()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listOrderUser: state.orderOfCustomerUser.listOrderSuccess,
});

const mapDispatchToProps = {
  dpgetListOrderOfCustomerUser: (searchStr, page, page_size) =>
    getListOrderOfCustomerUser(searchStr, page, page_size),
  dpgetDetailOrderOfCustomer: (id) => getdetailOrderOfCustomerUser(id),
  dispatchShowPopup: (popupType, item) => showPopup(popupType, item),
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Order));
