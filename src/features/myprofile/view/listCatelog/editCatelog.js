import { LeftCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Switch } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Notification from "../../../../components/Notification";
import { history } from "../../../../store/history";
import {
  addCatelog,
  updateCatalog,
  getDetailCatelog,
} from "./services/services";
import "./styles.css";

class EditCatelog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      on_active: false,
      isLoading: true,
    };
  }
  componentDidMount() {
    let catelog_id = this.props.match.params.id;
    console.log("catelog_id", catelog_id);
    this.props
      .dpgetDetailCatelog(catelog_id)
      .then((res) => {
        if (res && res.data) {
          this.setState({
            on_active: res.data.on_active,
            isLoading: false,
          });
        }
      })
      .catch((message_code) => {
        console.log("dispatchGetDetailProduct error: ", message_code);
      });
    // this.setState({
    //   on_active: this.props.location.state.item
    //     ? this.props.location.state.item.on_active
    //     : false,
    // });
  }
  onFinish = (values) => {
    let type =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.type
        ? this.props.location.state.type
        : null;
    let item =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.type
        ? this.props.location.state.item
        : null;
    console.log("onfinisf", values);
    if (type) {
      this.props
        .dpupdateCatalog(item.id, values)
        .then((res) => {
          if (res.status === 200) {
            Notification("success", "Update catelog success");
          }
        })
        .catch((message_code) => {
          console.log("error: ", message_code);
        });
    } else {
      this.props
        .dpCreateCatelog(values)
        .then((res) => {
          if (res.status === 201) {
            Notification("success", "Create catelog success");
            history.push("/list-catelog");
            window.location.reload();
          }
        })
        .catch((message_code) => {
          console.log("error: ", message_code);
        });
    }
  };
  onChangeStatus = () => {
    this.setState(
      {
        on_active: !this.state.on_active,
      },
      () => {
        console.log("onChangeStatus", this.state.on_active);
      }
    );
  };
  renderformAdd() {
    let type =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.type
        ? this.props.location.state.type
        : null;
    let item =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.item
        ? this.props.location.state.item
        : {};
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    };
    return (
      <Form
        className="form-add-catelog"
        layout="vertical"
        size="large"
        initialValues={{
          name: item ? item.name : "",
        }}
        onFinish={this.onFinish}
      >
        <Form.Item
          {...formItemLayout}
          label="Catelog Name:"
          name="name"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Input autoComplete="off" autoFocus placeholder="Catelog Name" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Status:"
          name="on_active"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống",
            },
          ]}
        >
          <Switch
            checked={this.state.on_active}
            onChange={() => {
              this.onChangeStatus();
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button block htmlType="submit" className="btn-add-catelog">
            {type === "edit" ? <span>Update</span> : <span>Add</span>}
          </Button>
        </Form.Item>
      </Form>
    );
  }
  render() {
    console.log("add", this.props);
    let type =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.type
        ? this.props.location.state.type
        : null;
    return (
      <div>
        {" "}
        <div className="row-header">
          <Link to="/list-catelog" className="btn-back">
            <LeftCircleOutlined />
            {/* Back */}
          </Link>
          {type === "edit" ? (
            <span className="title-create-customer">Update Catelog</span>
          ) : (
            <span className="title-create-customer">create Catelog</span>
          )}
        </div>{" "}
        {this.renderformAdd()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dpCreateCatelog: (data) => addCatelog(data),
  dpupdateCatalog: (id, data) => updateCatalog(id, data),
  dpgetDetailCatelog: (catelog_id) => getDetailCatelog(catelog_id),
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCatelog);
