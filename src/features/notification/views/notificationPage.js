import { EyeOutlined } from "@ant-design/icons";
import { Modal, Select, Space, Table, Tag } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { store } from "../../../store";
import { countAlertOfCustomer } from "../../auth/login/services";
import { getListAlert, putAlert } from "../services";
import "./style.css";

class NotificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      listAlertAdmin: [],
      page: 1,
      page_size: 10,
      visible: false,
      titleMess: "",
      read: null,
    };
  }

  componentDidMount() {
    this.props.dpgetListAlert();
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log("off popup", e);
    this.setState({
      visible: false,
    });
  };
  showModal = (record) => {
    const { userProfile } = store.getState().root;
    let dataPut = {
      read: true,
    };
    this.setState(
      {
        visible: true,
        titleMess: record.product_of_customer.system_name,
        message: record.message,
      },
      () => {
        if (userProfile.data.role !== "SUPPER_ADMIN") {
          this.props
            .dpputAlert(record.id, dataPut)
            .then((res) => {
              this.props.dpgetListAlert();
              this.props.dbcountAlertOfCustomer();
            })
            .catch((message_code) => {
              console.log("dispatchGetDetailProduct error: ", message_code);
            });
        }
      }
    );
  };
  renderUI() {
    let { listAlertAdmin } = this.props;
    const { formatMessage } = this.props.intl;
    const { userProfile } = store.getState().root;
    let dataSource =
      listAlertAdmin && listAlertAdmin.data && listAlertAdmin.data.results
        ? listAlertAdmin.data.results
        : [];
    const ROLE = userProfile.data.role;
    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: formatMessage({ id: "features.table.SystemName" }),
        dataIndex: "product_of_customer",
        render: (value) => {
          return value.system_name;
        },
      },
      {
        title: formatMessage({ id: "features.table.Message" }),
        dataIndex: "message",
      },
      {
        title: formatMessage({ id: "features.table.Priority" }),
        dataIndex: "priority",
        render: (value) => {
          if (value === "LOW") {
            return <Tag color="gold">{value}</Tag>;
          } else if (value === "NORMAL") {
            return <Tag color="cyan">{value}</Tag>;
          } else if (value === "HIGH") {
            return <Tag color="volcano">{value}</Tag>;
          }

          return <Tag color="red">{value}</Tag>;
        },
      },
      {
        title: formatMessage({ id: "features.table.View" }),
        render: (value) => {
          if (value.read) {
            return "Read";
          }
          return "Unread";
        },
      },
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
                this.showModal(record);
              }}
            >
              <EyeOutlined />
            </a>
          </Space>
        ),
      },
    ];

    const columnsForUSDCAdmin = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: formatMessage({ id: "features.table.SystemName" }),
        dataIndex: "product_of_customer",
        render: (value) => {
          return value.system_name;
        },
      },

      {
        title: formatMessage({ id: "features.table.Message" }),
        dataIndex: "message",
      },
      {
        title: formatMessage({ id: "features.table.CustomerName" }),
        dataIndex: "customer",
        render: (value) => {
          return value.customer_name;
        },
      },
      {
        title: formatMessage({ id: "features.table.Priority" }),
        dataIndex: "priority",
        render: (value) => {
          if (value === "LOW") {
            return <Tag color="gold">{value}</Tag>;
          } else if (value === "NORMAL") {
            return <Tag color="cyan">{value}</Tag>;
          } else if (value === "HIGH") {
            return <Tag color="volcano">{value}</Tag>;
          }

          return <Tag color="red">{value}</Tag>;
        },
      },
      {
        title: formatMessage({ id: "features.table.View" }),
        render: (value) => {
          if (value.read) {
            return "Read";
          }

          return "Unread";
        },
      },
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
                this.showModal(record);
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
        dataSource={dataSource}
        columns={ROLE === "SUPPER_ADMIN" ? columnsForUSDCAdmin : columns}
        className="table-content"
        pagination={
          this.props.pagination === undefined
            ? {
                total:
                  listAlertAdmin && listAlertAdmin.data
                    ? listAlertAdmin.data.total
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
                      this.props.dpgetListAlert(
                        this.state.read,
                        this.state.page,
                        this.state.page_size
                      );
                    }
                  );
                },
              }
            : false
        }
      />
    );
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState(
      {
        read: value,
        page: 1,
      },
      () => {
        this.props.dpgetListAlert(
          this.state.read,
          this.state.page,
          this.state.page_size
        );
      }
    );
  };
  render() {
    const ArrSelect = [
      {
        id: 1,
        name: "All",
      },
      {
        id: 2,
        name: "Read",
      },
      {
        id: 3,
        name: "Unread",
      },
    ];
    return (
      <div className="list-alert" style={{ width: "100%" }}>
        {this.props.pagination === undefined ? (
          <div className="row top">
            <div className="actions action-btns"></div>
            <div className="action-search">
              <span>Read Status</span>
              <Select
                defaultValue="All"
                style={{ width: 120 }}
                onChange={this.handleChange}
              >
                {ArrSelect.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        ) : null}

        {this.renderUI()}
        <Modal
          title={this.state.titleMess}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={false}
        >
          <p>{this.state.message}</p>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  listAlertAdmin: state.alert.listAlertAdminSuccess,
});

const mapDispatchToProps = {
  dpgetListAlert: (read, page, page_size) =>
    getListAlert(read, page, page_size),
  dpputAlert: (alert_id, data) => putAlert(alert_id, data),
  dbcountAlertOfCustomer: () => countAlertOfCustomer(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(NotificationPage));
