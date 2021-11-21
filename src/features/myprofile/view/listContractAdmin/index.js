import { EyeOutlined, InboxOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  Table,
} from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { showPopup } from "../../../../app/services";
import NoData from "../../../../components/nodata";
import { formatCurrency } from "../../../../utils/fotmat";
import { createBilling } from "../billing/services/services";
import "./contract.css";
import DetailContract from "./detailContract";
import { detailContractAdmin, getlistContractAdmin } from "./services/services";

class ListContractAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      checkAll: false,
      selectItems: [],
      searchStr: "",
      isLoadingDetail: false,
      displayDetail: false,
      page: 1,
      page_size: 10,
      dataSource: [],
      total: undefined,
      id: null,
      selectedItem: null,
      detailContract: null,
      visible: false,
      payment_status: true,
    };
  }

  _openDetail(item) {
    this.setState(
      {
        isLoadingDetail: true,
      },
      () => {
        this.props
          .dispatchDetailContract(item.id)
          .then((res) => {
            if (res.status === 200) {
              let detailContract = res.data;
              this.setState({
                displayDetail: true,
                detailContract,
                selectedItem: item,
              });
            }
          })
          .catch((message_code) => {
            console.log("dispatchDetailContract error: ", message_code);
          });
      }
    );
  }

  handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (value === "") {
      console.log("handleChange", value);
      this.setState(
        {
          searchStr: undefined,
        },
        () => {
          this.props.dispatchListContract(
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
          this.props.dispatchListContract(
            value,
            this.state.page,
            this.state.page_size
          );
        }
      );
    }
  };

  componentDidMount() {
    const { page, page_size } = this.state;
    this.props.dispatchListContract(this.state.searchStr, page, page_size);
  }

  showModal = (contract_id) => {
    this.setState({
      visible: true,
      contract_id: contract_id,
    });
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
  renderUI() {
    const { selectedItem, displayDetail, detailContract } = this.state;
    const { listContract } = this.props;

    if (displayDetail) {
      return (
        <DetailContract
          toggleDisplay={() =>
            this.setState({
              displayDetail: false,
              detailContract: null,
              selectedItem: null,
            })
          }
          item={selectedItem}
          detailContract={detailContract}
        />
      );
    }

    if (listContract) {
      return this.renderList();
    }

    return <NoData />;
  }

  renderList() {
    const { page_size } = this.state;
    const { listContract } = this.props;

    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: "Contract ID",
        render: (value) => {
          return value.contract_id;
        },
      },
      {
        title: "Customer Name",
        dataIndex: "customer",
        render: (value) => {
          return value.customer_name;
        },
      },
      {
        title: "Order ID",
        dataIndex: "order",
        render: (value) => {
          return value.order_id;
        },
      },
      {
        title: "Amount",
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
      //     return value.discount * 100 + `%`;
      //   },
      // },
      {
        title: "Created",
        dataIndex: "created_at",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
      {
        title: "EndTime",
        dataIndex: "end_time",
        render: (value) => {
          return moment(value).format("DD/MM/YYYY");
        },
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a
              onClick={() => {
                this._openDetail(record);
              }}
            >
              <EyeOutlined />
            </a>
            {!record.billed ? (
              <Link
                to="#"
                onClick={() => {
                  this.showModal(record.id);
                }}
                // onClick={() =>
                //   this.showModal(record.id, "createContract", record.customer)
                // }
              >
                <InboxOutlined />
              </Link>
            ) : null}
          </Space>
        ),
      },
    ];

    return (
      <Table
        rowClassName={() => "editable-row"}
        dataSource={
          listContract && listContract.data ? listContract.data.results : []
        }
        columns={columns}
        className="table-content"
        pagination={{
          total:
            listContract && listContract.data ? listContract.data.total : 0,
          // showTotal: (total) => `Tổng ${total}`,
          current: this.state.page,
          pageSize: this.state.page_size,
          // onChange:{(current) => this.setData(current)}
          onChange: (newPage) => {
            this.setState(
              {
                page: newPage,
              },
              () => {
                this.props.dispatchListContract(
                  this.state.searchStr,
                  newPage,
                  page_size
                );
              }
            );
          },
        }}
      />
    );
  }
  onChangeStatus = () => {
    this.setState(
      {
        payment_status: !this.state.payment_status,
      },
      () => {
        console.log("onChangeStatus", this.state.payment_status);
      }
    );
  };
  onChangeDate = (values) => {
    console.log("onChangeDate", values);
    this.setState(
      {
        payment_time: moment(values).format(),
      },
      () => {
        console.log(this.state.payment_time);
      }
    );
  };
  onFinish = (values) => {
    let data = {
      invoice_number: values.invoice_number,
      payment_status: this.state.payment_status,
      payment_time: moment(values.expired).format(),
      contract_id: `${this.state.contract_id}`,
    };
    console.log("onFinish", data);
    this.props
      .dispatchcreateBilling(data)
      .then((res) => {
        this.handleCancel();
        this.props.dispatchListContract(
          this.state.searchStr,
          this.state.page,
          this.state.page_size
        );
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
  };
  renderFormCreateBilling() {
    let { contract_id } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <Form
        className="form-add-billing"
        layout="horizontal"
        size="large"
        initialValues={{
          invoice_number: "",
          payment_status: this.state.payment_status,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          {...formItemLayout}
          label="Invoice number:"
          name="invoice_number"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Invoice number" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="payment_time"
          label="Payment time:"
          rules={[
            { required: true, message: "Trường này không được để trống" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} onChange={this.onChangeDate} />
        </Form.Item>
        {/* </React.Fragment> */}
        <Form.Item
          {...formItemLayout}
          label="Status:"
          name="payment_status"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Switch
            checked={this.state.payment_status}
            onChange={() => {
              this.onChangeStatus();
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            htmlType="submit"
            className="btn-cancel"
            onClick={() => {
              this.handleCancel();
            }}
          >
            <span>Cancel</span>
          </Button>
          <Button block htmlType="submit" className="btn-add-billing">
            <span>Add</span>
          </Button>
        </Form.Item>
      </Form>
    );
  }

  render() {
    let { displayDetail } = this.state;
    return (
      <div className="container-fluid contract">
        {displayDetail ? null : (
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
        )}

        {this.renderUI()}
        <Modal
          title="Create billing"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={false}
        >
          {this.renderFormCreateBilling()}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listContract: state.contractadmin.listContractAdminSuccess,
  detailContractSuccess: state.contractadmin.detailContractSuccess,
});

const mapDispatchToProps = {
  dispatchShowPopup: (popupType, item) => showPopup(popupType, item),
  dispatchListContract: (page, page_size) =>
    getlistContractAdmin(page, page_size),
  dispatchDetailContract: (id_contract) => detailContractAdmin(id_contract),
  dispatchcreateBilling: (data) => createBilling(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContractAdmin);
