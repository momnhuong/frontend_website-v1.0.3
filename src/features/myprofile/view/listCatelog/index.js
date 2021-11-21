import { EditOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import moment from "moment";
import React, { Component } from "react";
import * as Icon from "react-feather";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGES } from "../../../../assets";
import {
  delCatelog,
  getDetailCatelog,
  getlistCatelog,
} from "./services/services";

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

class ListCatelog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listCatelog: [],
      isLoading: true,
      page: 1,
      page_size: 10,
      total: 0,
      id: null,
    };
  }
  componentDidMount() {
    this.props
      .dispatchListCatelog(this.state.page, this.state.page_size)
      .then((res) => {
        this.setState(
          {
            listCatelog: res.data ? res.data.results : [],
            isLoading: false,
            total: res.data ? res.data.total : 0,
          },
          () => {
            console.log("listacatelog", this.state.listCatelog);
          }
        );
      });
  }
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
          <p>Bạn có muốn xoá danh mục này không? </p>
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
  deleteItem = (id) => {
    this.props
      .dispatchdelCatelog(id)
      .then((res) => {
        console.log("dispatchdelCatelog", res);
        this.closeModal();
        if (res.status === 200) {
          this.props
            .dispatchListCatelog(this.state.page, this.state.page_size)
            .then((res) => {
              this.setState({
                listCatelog: res.data ? res.data.results : [],
                isLoading: false,
                total: res.data ? res.data.total : 0,
              });
            });
        }
      })
      .catch((message_code) => {
        console.log("error: ", message_code);
      });
  };

  renderUI() {
    let { listCatelog } = this.props;
    let listCatelogNew = listCatelog.data ? listCatelog.data.results : [];
    const columns = [
      {
        title: "#",
        dataIndex: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
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
            <Link
              to={{
                pathname: `${this.props.match.url}/edit/${record.id}`,
                state: { item: record, type: "edit" },
              }}
            >
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
        dataSource={listCatelogNew}
        columns={columns}
        className="table-content"
        pagination={{
          total: this.state.total,
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
                this.props.dispatchListCatelog(
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
  render() {
    return (
      <div>
        <div className="row top">
          <div className="actions action-btns">
            <Link to="list-catelog/add">
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
        {this.renderUI()}
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
  listCatelog: state.catelog.listCatelogSuccess,
});

const mapDispatchToProps = {
  dispatchListCatelog: (page, page_size) => getlistCatelog(page, page_size),
  dispatchdelCatelog: (catelog_id) => delCatelog(catelog_id),
  dispatchdetailCatelog: (catelog_id) => getDetailCatelog(catelog_id),
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCatelog);
