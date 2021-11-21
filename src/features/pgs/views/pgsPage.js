import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost, deletePost } from "../services";
import { Table, Popconfirm, Button } from "antd";
import { Link } from "react-router-dom";

class PGSPage extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Image",
        dataIndex: "image",
        render: (url) => <img width={100} src={url} alt="img title" />,
      },
      {
        title: "Title",
        render: (row) => <Link to={`/editpost/${row.id}`}>{row.title}</Link>,
      },
      {
        title: "Member",
        dataIndex: "fullname",
      },
      {
        title: "Category",
        dataIndex: "category",
      },
      {
        title: "Created",
        dataIndex: "created_at",
      },
      {
        title: "Action",
        render: (row) => {
          return (
            <Popconfirm
              title="Xác nhận xóa？"
              okText="Đồng ý"
              cancelText="Hủy"
              placement="topRight"
              onConfirm={() => this._onClickDelete(row.id)}
            >
              <Button type="danger">Remove</Button>
            </Popconfirm>
          );
        },
      },
    ];

    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    this.props
      .dpGetPost()
      .then((response) => {
        if (response && response.data) {
          const convertData = response.data.map((item, index) => {
            return {
              ...item,
              fullname: item.user.fullname,
              key: index,
            };
          });

          this.setState({
            dataSource: convertData,
          });
        }
      })
      .catch();
  }

  _onClickDelete(id) {
    this.props.dpDeletePost(id);
  }

  render() {
    const { dataSource } = this.state;

    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dpGetPost: (page, pageSize) => getPost(page, pageSize),
  dpDeletePost: (post_id) => deletePost(post_id),
};

export default connect(mapStateToProps, mapDispatchToProps)(PGSPage);
