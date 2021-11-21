// import { requestFirebaseNotificationPermission } from '../../../firebaseConfig'
import {
  CreditCardOutlined,
  MessageOutlined,
  TagOutlined,
  UngroupOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Card, Col, Divider, Modal, Row, Table, Tag } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { hidePopup, offLoading } from "../../../app/services";
import BoxLoading from "../../../components/LoadingBox";
import { LIST_NOTIFICATION } from "../../../constants/config";
import { countAlertOfCustomer } from "../../../features/auth/login/services";
import Notification from "../../../features/notification/views/notificationPage";
import messaging from "../../../firebaseConfig";
import { store } from "../../../store";
import { formatCurrency } from "../../../utils/fotmat";
import { getListAlert } from "../../notification/services";
import {
  countTicketAdmin,
  countTicketCustomer,
  getBalance,
  getCountHomeAdmin,
  getCountHomeCustomer,
  getCustomerInfo,
  getlistProductServicesAdmin,
  getlistProductServicesCustomer,
  listCustomerOfProductAdminHome,
  packageofOfProductCustomerHome,
  vCloudDirectorSessions,
} from "../services";
import "./homePage.css";

// import { Card } from "@material-ui/core";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countOfAdminUI: [],
      isLoading: true,
      visible: false,
    };
  }

  componentDidMount() {
    const { userProfile } = store.getState().root;
    // this.props.dpVCloudDirectorSessions();
    // console.log(userProfile);
    let role = userProfile.data.role;
    messaging
      .requestPermission()
      .then(function () {
        const token = messaging.getToken();
        return token;
      })
      .then((token) => {
        console.log("token: ", token);
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", (message) => {
      console.log(message);
      this.props.dpgetListAlert();
      this.props.dbcountAlertOfCustomer();
    });

    this.props.dpgetListAlert();
    if (role === "SUPPER_ADMIN") {
      this.props.dispatchgetCountTicketAdmin();
      this.props.dispatchgetBalance();
      this.props.dispatchgetlistProductServicesAdmin();
      this.props
        .dispatchgetCountHomeAdmin()
        .then((res) => {
          this.props.dispatchOffLoading();
          if (res && res.data) {
            this.setState({
              countOfAdminUI: res.data,
              isLoading: false,
            });
          }
        })
        .catch((message_code) => {
          console.log("dispatchGetDetailProduct error: ", message_code);
        });
    } else {
      this.props.dispatchHidePopup();
      this.props.dispatchOffLoading();
      this.props.dispatchgetBalance();
      this.props.dispatchInfoCustomer();
      this.props
        .dispatchgetCountHomeCustomer()
        .then((res) => {
          if (res && res.data) {
            this.setState({
              countOfAdminUI: res.data,
              isLoading: false,
            });
          }
        })
        .catch((message_code) => {
          console.log("dispatchGetDetailProduct error: ", message_code);
        });
      this.props
        .dispatchgetCountTicketCustomer()
        .then((res) => {
          if (res && res.data) {
            this.setState(
              {
                countOfTicketUI: res.data,
                isLoading: false,
              },
              () => {
                console.log(
                  "dispatchgetCountTicketCustomer",
                  this.state.countOfTicketUI.count
                );
              }
            );
          }
        })
        .catch((message_code) => {
          console.log("dispatchGetDetailProduct error: ", message_code);
        });
      this.props.dispatchgetlistProductServicesCustomer();
    }
  }
  renderListProductServices() {
    let listProductAdminServices =
      this.props.listProductCustomerServicesCustomerAdmin &&
      this.props.listProductCustomerServicesCustomerAdmin.data &&
      this.props.listProductCustomerServicesCustomerAdmin.data.results &&
      this.props.listProductCustomerServicesCustomerAdmin.data.results.length >
        0
        ? this.props.listProductCustomerServicesCustomerAdmin.data.results
        : [];

    let listProductCustomerServices =
      this.props.listProductofCustomer &&
      this.props.listProductofCustomer.data &&
      this.props.listProductofCustomer.data.results &&
      this.props.listProductofCustomer.data.results.length > 0
        ? this.props.listProductofCustomer.data.results
        : [];
    const { userProfile } = store.getState().root;
    let dataSource = [];
    let convertData = [];
    if (userProfile.data.role === "SUPPER_ADMIN") {
      dataSource = listProductAdminServices;
    } else {
      dataSource = listProductCustomerServices;
      convertData = dataSource.map((item, index) => {
        return {
          ...item,
          key: index,
        };
      });
    }

    console.log("convertData", convertData);
    const columns = [
      {
        title: "Product Name",
        dataIndex: "product",
        render: (value) => {
          return value.name;
        },
      },
      {
        title: "Package",
        dataIndex: "package",
        render: (value) => {
          return value !== null ? value.name : "";
        },
      },
      {
        title: "Status",
        dataIndex: "on_active",
        render: (value) => {
          return value ? (
            <Tag color="#0bcbff" key={1}>
              ACTIVE
            </Tag>
          ) : (
            <Tag color="red" key={2}>
              INACTIVE
            </Tag>
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
        title: "Expired",
        dataIndex: "created_at",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
    ];
    const columnsCustomer = [
      {
        title: "",
        dataIndex: "catelog",
        key: "catelog.name",
        render: (value) => {
          return value.name;
        },
      },
    ];
    const columnsChild = [
      {
        title: "System Name",
        dataIndex: "system_name",
        // render: (value) => {
        //   return value.name;
        // },
      },
      {
        title: "Product Name",
        dataIndex: "product",
        render: (value) => {
          return value.name;
        },
      },
      {
        title: "Address",
        dataIndex: "address_ip",
      },
      {
        title: "Status",
        dataIndex: "on_active",
        render: (value) => {
          return value ? (
            <Tag color="#0bcbff" key={1}>
              ACTIVE
            </Tag>
          ) : (
            <Tag color="red" key={2}>
              INACTIVE
            </Tag>
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
        title: "Expired",
        dataIndex: "expired",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
    ];

    return (
      <React.Fragment>
        {userProfile.data.role === "SUPPER_ADMIN" ? (
          <Table
            rowClassName={() => "editable-row"}
            dataSource={dataSource}
            columns={columns}
            tableClassName="table-content-admin"
            pagination={false}
          />
        ) : (
          <div className="table-customer">
            <Table
              rowClassName={() => "editable-row"}
              showHeader={false}
              dataSource={convertData}
              columns={columnsCustomer}
              expandable={{
                expandedRowRender: (record) => (
                  <Table
                    className="table-nested"
                    columns={columnsChild}
                    dataSource={record.product_of_customer}
                    pagination={false}
                  />
                ),
              }}
              className="table-content"
              pagination={false}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
  renderAlert() {
    const notificationProps = LIST_NOTIFICATION;
    return (
      <div className="list-message">
        <Notification pagination={false} />
      </div>
    );
  }
  renderService() {
    const { userProfile } = store.getState().root;
    let { countOfCustomer, countOfAdmin } = this.props;
    let countHome = [];
    if (userProfile.data.role === "SUPPER_ADMIN") {
      countHome =
        countOfAdmin && countOfAdmin.data && countOfAdmin.data.length > 0
          ? countOfAdmin.data
          : [];
    } else {
      countHome =
        countOfCustomer &&
        countOfCustomer.data &&
        countOfCustomer.data.length > 0
          ? countOfCustomer.data
          : [];
    }

    return countHome.map((item, index) => {
      return (
        <div key={index} className="item-infomation">
          <div classnames="left-item-infomation">{item.name}</div>
          <div
            classnames="right-item-infomation"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <span>{item.count} </span>
            <Link
              to="#"
              style={{ color: "#4d4d4d", marginTop: -3 }}
              onClick={() => this.showModal(item.product_id)}
            >
              <UnorderedListOutlined style={{ marginLeft: 10 }} />
            </Link>
          </div>
        </div>
      );
    });
  }
  renderUI() {
    const { userProfile } = store.getState().root;
    let role = userProfile.data.role;
    return (
      <React.Fragment>
        <Row className="row-count" gutter={16}>
          {this.renderCount()}
        </Row>
        <Row className="list-product" gutter={16}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            {role === "SUPPER_ADMIN" ? (
              <React.Fragment>
                <Card
                  title="Product & Service"
                  bordered={false}
                  className="card-product"
                >
                  {this.renderListProductServices()}
                </Card>
                <Card
                  title="Alert"
                  bordered={false}
                  className="card-product"
                  style={{ marginBottom: "1rem", marginTop: "1rem" }}
                >
                  {this.renderAlert()}
                </Card>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Card
                  title="Alert"
                  bordered={false}
                  className="card-product"
                  style={{ marginBottom: "1rem" }}
                >
                  {this.renderAlert()}
                </Card>
                <Card
                  title="Product & Service"
                  bordered={false}
                  className="card-product-services"
                >
                  {this.renderListProductServices()}
                </Card>
              </React.Fragment>
            )}
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            {userProfile.data.role !== "SUPPER_ADMIN" &&
            this.props.infoCustomer &&
            this.props.infoCustomer.data ? (
              <Card
                title="Infomation"
                bordered={false}
                className="card-product last infomation"
                style={{ marginBottom: "1rem" }}
              >
                <div className="item-infomation">
                  <div classnames="left-item-infomation">
                    <span>Name Company</span>
                  </div>
                  <div classnames="right-item-infomation">
                    {this.props.infoCustomer.data.customer_name}{" "}
                  </div>
                </div>
                <div className="item-infomation">
                  <div classnames="left-item-infomation">
                    <span>Email</span>
                  </div>
                  <div classnames="right-item-infomation">
                    {this.props.infoCustomer.data.main_email}
                  </div>
                </div>
                <div className="item-infomation">
                  <div classnames="left-item-infomation">
                    <span>Phone number</span>
                  </div>
                  <div classnames="right-item-infomation">
                    {this.props.infoCustomer.data.phone_number}
                  </div>
                </div>
                <div
                  className="item-infomation"
                  style={{ flexDirection: "column" }}
                >
                  <div classnames="left-item-infomation">
                    <span>Address</span>
                  </div>
                  <div classnames="right-item-infomation">
                    {this.props.infoCustomer.data.address}
                  </div>
                </div>
              </Card>
            ) : null}
            <Card
              title="Service Statistics"
              bordered={false}
              className="card-product last infomation"
            >
              {this.renderService()}
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  renderCount() {
    const { userProfile } = store.getState().root;
    let role = userProfile.data.role;
    let balanceNew =
      this.props.balance && this.props.balance.data
        ? parseInt(this.props.balance.data.total)
        : 0;
    let {
      countOfAdmin,
      countOfCustomer,
      countTicketAdmin,
      countTicketCustomer,
    } = this.props;
    let countHome = [];
    if (userProfile.data.role === "SUPPER_ADMIN") {
      countHome =
        countOfAdmin && countOfAdmin.data && countOfAdmin.data.length > 0
          ? countOfAdmin.data
          : [];
    } else {
      countHome =
        countOfCustomer &&
        countOfCustomer.data &&
        countOfCustomer.data.length > 0
          ? countOfCustomer.data
          : [];
    }
    let newTicket = undefined;
    if (userProfile.data.role === "SUPPER_ADMIN") {
      newTicket =
        countTicketAdmin && countTicketAdmin.data
          ? countTicketAdmin.data.count
          : "";
    } else {
      newTicket =
        countTicketCustomer && countTicketCustomer.data
          ? countTicketCustomer.data.count
          : "";
    }
    let k = 0;
    let countTicket = countHome.forEach((element) => {
      k += element.count;
    });
    countTicketAdmin && countTicketAdmin.data
      ? countTicketAdmin
      : countTicketCustomer;

    const { listAlertAdminSuccess } = store.getState().alert;
    let listAlert =
      listAlertAdminSuccess !== null &&
      listAlertAdminSuccess.data &&
      listAlertAdminSuccess.data.results &&
      listAlertAdminSuccess.data.results.length > 0
        ? listAlertAdminSuccess.data.results
        : [];
    console.log("listAlertAdminSuccess", listAlertAdminSuccess);
    let countAlert = 0;
    let temp = listAlert.forEach((element) => {
      if (element.read === false) {
        countAlert++;
      }
    });
    return (
      <Row className="header-row">
        <div className="col-row">
          <div className="left-col-row">
            <div className="icon">
              <UngroupOutlined className="img-responsive" />
            </div>
            Product & Service
          </div>
          <div className="right-col-row">{k}</div>
        </div>
        <Divider type="vertical" />
        <div className="col-row">
          <Link to="/ticket">
            <div className="left-col-row">
              <div className="icon" style={{ backgroundColor: "#FF3D00" }}>
                <TagOutlined className="img-responsive" />
              </div>
              New Ticket
            </div>
            <div className="right-col-row">{newTicket}</div>
          </Link>
        </div>
        <Divider type="vertical" />
        <div className="col-row">
          <div className="left-col-row">
            <div className="icon" style={{ backgroundColor: "#26BA04" }}>
              <MessageOutlined className="img-responsive" />
            </div>
            Alert
          </div>
          <div className="right-col-row">{countAlert}</div>
        </div>
        <Divider type="vertical" />
        <div className="col-row">
          <div className="left-col-row">
            <div className="icon" style={{ backgroundColor: "#FF7A00" }}>
              <CreditCardOutlined className="img-responsive" />
            </div>
            Balance
          </div>
          <div className="right-col-row">
            {formatCurrency(balanceNew) + " " + "VND"}
          </div>
        </div>
      </Row>
    );
  }
  showModal = (id) => {
    this.setState(
      {
        visible: true,
        id_product: id,
      },
      () => {
        const { userProfile } = store.getState().root;
        if (userProfile.data.role === "SUPPER_ADMIN") {
          this.props
            .dispatchlistCustomerOfProductAdminHome(this.state.id_product)
            .then((res) => {
              this.props.dispatchOffLoading();
            })
            .catch((message_code) => {
              this.props.dispatchOffLoading();
              console.log("error: ", message_code);
            });
        } else {
          this.props
            .dispatchpackageofOfProductCustomerHome(this.state.id_product)
            .then((res) => {
              this.props.dispatchOffLoading();
            })
            .catch((message_code) => {
              this.props.dispatchOffLoading();
              console.log("error: ", message_code);
            });
        }
      }
    );
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  renderContentModal() {
    const { userProfile } = store.getState().root;
    if (userProfile.data.role === "SUPPER_ADMIN") {
      let { listCustomerOfProductAdmin } = this.props;

      let listCustomerOfProductAdminNew = listCustomerOfProductAdmin
        ? listCustomerOfProductAdmin.data
        : [];

      // console.log(
      //   "listCustomerOfProductAdminNew",
      //   listCustomerOfProductAdminNew
      // );
      const columns = [
        {
          title: "Customer Name",
          dataIndex: "name",
        },
        {
          title: "Email",
          dataIndex: "main_email",
        },
        {
          title: "Address",
          dataIndex: "address",
        },
      ];
      return (
        <Table
          // bodyStyle={{ padding: '0' }}
          rowClassName={() => "editable-row"}
          dataSource={listCustomerOfProductAdminNew}
          columns={columns}
          className="table-content"
          pagination={false}
        />
      );
    } else {
      let { listPackageofProductCustomer } = this.props;
      let listPackageofProductCustomerNew =
        listPackageofProductCustomer &&
        listPackageofProductCustomer.data &&
        listPackageofProductCustomer.data.results
          ? listPackageofProductCustomer.data.results
          : [];

      // console.log(
      //   "listPackageofProductCustomerNew",
      //   listPackageofProductCustomerNew
      // );
      const columns = [
        {
          title: "Product Name",
          dataIndex: "product",
          render: (value) => {
            return value.name;
          },
        },
        {
          title: "Package Name",
          dataIndex: "package",
          render: (value) => {
            return value.name;
          },
        },
        {
          title: "SystemID",
          dataIndex: "system_id",
          render: (value) => {
            return value !== null ? value : "";
          },
        },
      ];
      return (
        <Table
          // bodyStyle={{ padding: '0' }}
          width={600}
          rowClassName={() => "editable-row"}
          dataSource={listPackageofProductCustomerNew}
          columns={columns}
          className="table-content"
          pagination={false}
        />
      );
    }
  }
  render() {
    const { userProfile } = store.getState().root;
    let { isLoading } = this.state;
    return (
      <div
        className="container-fluid homePage"
        style={{ minHeight: window.innerHeight - 83 }}
      >
        {isLoading ? <BoxLoading /> : this.renderUI()}
        <Modal
          title={
            userProfile.data.role === "SUPPER_ADMIN"
              ? "List Customer"
              : "List Package"
          }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.renderContentModal()}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listCustomer: state.customer.dataSuccess,
  infoCustomer: state.home.infoCustomerSuccess,
  countOfAdmin: state.home.countOfAdminSuccess,
  countOfCustomer: state.home.countOfCustomerSuccess,
  countTicketAdmin: state.home.countTicketAdminSuccess,
  countTicketCustomer: state.home.countTicketCustomerSuccess,
  listProductCustomerServicesCustomerAdmin:
    state.home.listProductCustomerServicesAdminSuccess,
  listProductofCustomer: state.home.listProductCustomerServicesCustomerSuccess,
  listCustomerOfProductAdmin: state.home.listCustomerOfProductAdminSuccess,
  listPackageofProductCustomer: state.home.listPackageofProductCustomerSuccess,
  balance: state.home.getBalanceSuccess,
});

const mapDispatchToProps = {
  dispatchHidePopup: () => hidePopup(),
  dispatchOffLoading: () => offLoading(),
  dispatchInfoCustomer: () => getCustomerInfo(),
  dispatchgetCountHomeAdmin: () => getCountHomeAdmin(),
  dispatchgetCountHomeCustomer: () => getCountHomeCustomer(),
  dispatchgetCountTicketAdmin: () => countTicketAdmin(),
  dispatchgetCountTicketCustomer: () => countTicketCustomer(),
  dispatchgetlistProductServicesAdmin: () => getlistProductServicesAdmin(),
  dispatchgetlistProductServicesCustomer: () =>
    getlistProductServicesCustomer(),
  dispatchlistCustomerOfProductAdminHome: (product_id) =>
    listCustomerOfProductAdminHome(product_id),
  dispatchpackageofOfProductCustomerHome: (product_id) =>
    packageofOfProductCustomerHome(product_id),
  dispatchgetBalance: () => getBalance(),
  dpgetListAlert: (page, page_size) => getListAlert(page, page_size),
  dpVCloudDirectorSessions: () => vCloudDirectorSessions(),
  dbcountAlertOfCustomer: () => countAlertOfCustomer(),
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
