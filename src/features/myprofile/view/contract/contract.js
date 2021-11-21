import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { showPopup } from "../../../../app/services";
import NoData from "../../../../components/nodata";
import Notification from "../../../../components/Notification";
import { formatCurrency } from "../../../../utils/fotmat";
import "./contract.css";
import DetailContract from "./detailContract";
import { detailContract, getlistContract } from "./services/services";

class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      checkAll: false,
      selectItems: [],
      searchStr: undefined,
      displayDetail: false,
    };
  }
  toggleDisplay = (item) => {
    console.log("toggleDisplay!", item);
    if (item && item.id) {
      this.props
        .dispatchDetailContract(item.id)
        .then((res) => {
          console.log("onHandleSubmit!", res);
          if (res.status === 200) {
            let detailContract = res.data;
            if (this.state.displayDetail) {
              console.log("item: ", item);
              this.setState({
                displayDetail: false,
                item,
                detailContract,
              });
            } else {
              this.setState({
                displayDetail: true,
                item,
                detailContract,
              });
            }
          } else {
            Notification("error", res.data.message);
          }
        })
        .catch((message_code) => {
          console.log("error: ", message_code);
        });
    } else {
      if (this.state.displayDetail) {
        console.log("item: ", item);
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
    }
  };
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

  deleteItem = (item) => {
    console.log("deleteItem", item);
  };
  editItem = (item) => {
    console.log("editItem", item);
  };

  renderItem() {
    const { formatMessage } = this.props.intl;
    let listContract = this.props.listContract
      ? this.props.listContract.data
      : [];
    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: formatMessage({ id: "features.contract.table.id" }),
        render: (value) => {
          return value.contract_id;
        },
      },
      {
        title: formatMessage({ id: "features.order.table.id" }),
        dataIndex: "order",
        render: (value) => {
          return value.order_id;
        },
      },
      {
        title: formatMessage({ id: "features.table.Amount" }),
        dataIndex: "order",
        render: (value) => {
          return (
            formatCurrency(
              Math.floor(
                parseInt(value.amount) + (parseInt(value.amount) * 10) / 100
              )
            ) +
            " " +
            "VND"
          );
        },
      },
      // {
      //   title: "Discount",
      //   dataIndex: "order",
      //   render: (value) => {
      //     return value.discount;
      //   },
      // },

      {
        title: formatMessage({ id: "features.table.Create" }),
        dataIndex: "contract_date",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
      {
        title: formatMessage({ id: "features.table.EndTime" }),
        dataIndex: "end_time",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
      {
        title: formatMessage({ id: "features.table.Action" }),
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link
              to="#"
              onClick={() => {
                this.toggleDisplay(record);
              }}
            >
              <EyeOutlined />
            </Link>

            {/* <a
              onClick={() => {
                this.openModal(record.id);
              }}
            >
              <EyeOutlined />
            </a> */}
          </Space>
        ),
      },
    ];
    if (listContract && listContract.length > 0) {
      return (
        <Table
          rowClassName={() => "editable-row"}
          dataSource={listContract}
          columns={columns}
          className="table-content"
          pagination={{
            total:
              this.props.listContract && this.props.listContract.data
                ? this.props.listContract.data.total
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
                  this.props.dispatchListContract(
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
  }
  componentDidMount() {
    this.props.dispatchListContract();
  }
  renderUI() {
    if (
      this.props.listContract.data &&
      this.props.listContract.data.length > 0
    ) {
      if (this.state.displayDetail) {
        return (
          <DetailContract
            toggleDisplay={this.toggleDisplay}
            item={this.state.item}
            detailContract={this.state.detailContract}
          />
        );
      } else {
        return this.renderList();
      }
    } else {
      return (
        <div className="no-data">
          <NoData />
        </div>
      );
    }
  }
  renderList() {
    const { checkAll } = this.state;
    return (
      <div className="content_profile">
        <div className="row top">
          <div className="actions action-btns"></div>
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
        </div>
        <div className="table-list">{this.renderItem()}</div>
      </div>
    );
  }
  render() {
    return (
      <div className="container-fluid transactions">{this.renderUI()}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  listContract: state.contract.listContractSuccess,
  detailContractSuccess: state.contract.detailContractSuccess,
});

const mapDispatchToProps = {
  dispatchShowPopup: (popupType, item) => showPopup(popupType, item),
  dispatchListContract: () => getlistContract(),
  dispatchDetailContract: (id_contract) => detailContract(id_contract),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Contract));
