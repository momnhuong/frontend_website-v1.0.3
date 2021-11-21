import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Switch, Table } from "antd";
import moment from "moment";
import React, { Component } from "react";
import * as Icon from "react-feather";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../../../components/LoadingBox";
import { formatCurrency } from "../../../../utils/fotmat";
import {
  detailPackage,
  getListPackage,
  updateStatus,
} from "./services/services";
import "./styles.css";

class Package extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listPackage: [],
      description: "",
      page: 1,
      page_size: 10,
      total: undefined,
      id: null,
      searchStr: "",
    };
  }

  async componentDidMount() {
    this.props
      .dbgetListPackage(
        this.state.searchStr,
        this.state.page,
        this.state.page_size
      )
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.results &&
          res.data.results.length > 0
        ) {
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  }
  onChangeStatus = (record, rowIndex) => {
    console.log(`switch to ${record}`);
    console.log("rowIndex", rowIndex);
    this.props
      .dispatchupdateStatus(rowIndex.id)
      .then((res) => {
        this.props.dbgetListPackage();
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
  };
  renderUI() {
    let listPackage =
      this.props.listPackage &&
      this.props.listPackage.data &&
      this.props.listPackage.data.results &&
      this.props.listPackage.data.results.length > 0
        ? this.props.listPackage.data.results
        : [];

    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: "Package Name",
        dataIndex: "name",
      },
      {
        title: "Product Name",
        dataIndex: "product",
        render: (value) => {
          return value.name;
        },
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (value) => {
          return formatCurrency(parseInt(value)) + " " + "VND";
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
        title: "Status",
        dataIndex: "on_active",
        render: (record, rowIndex) => {
          console.log("status", record);
          return (
            <Switch
              checked={record}
              onChange={() => {
                this.onChangeStatus(record, rowIndex);
              }}
            />
          );
        },
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <Link to={`${this.props.match.url}/edit/${record.id}`}>
              <EditOutlined />
            </Link>
            {/* <a
                    onClick={() => {
                      this.openModal(record.id);
                    }}
                  >
                    <DeleteOutlined />
                  </a> */}
          </Space>
        ),
      },
    ];
    return (
      <Table
        rowClassName={() => "editable-row"}
        dataSource={listPackage}
        columns={columns}
        className="table-content"
        pagination={{
          total:
            this.props.listPackage && this.props.listPackage.data
              ? this.props.listPackage.data.total
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
                this.props.dbgetListPackage(
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
          this.props.dbgetListPackage(
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
          this.props.dbgetListPackage(
            value,
            this.state.page,
            this.state.page_size
          );
        }
      );
    }
  };
  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <div className="row top">
          <div className="actions action-btns">
            <Link to="package/add">
              <Button type="button" className="btn-add">
                <Icon.Plus /> Add New
              </Button>
            </Link>
          </div>
          <div className="action-search">
            {/* <img
              src={IMAGES.icons_search}
              className="img-responsive"
              alt="icons search"
            /> */}

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
        {isLoading ? <LoadingBox /> : this.renderUI()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listProduct: state.products.listProductSuccess,
  listPackage: state.packages.listPackageSuccess,
});

const mapDispatchToProps = {
  dbgetListPackage: (searchStr, page, page_size) =>
    getListPackage(searchStr, page, page_size),
  dbdetailPackage: (package_id) => detailPackage(package_id),
  dispatchupdateStatus: (package_id) => updateStatus(package_id),
};

export default connect(mapStateToProps, mapDispatchToProps)(Package);
