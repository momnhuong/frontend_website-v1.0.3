import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Form, Button, Typography, Select, InputNumber } from 'antd'
import { createPost } from '../services'

const { Title } = Typography;
class CreatePGPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  onFinish = values => {
    this.props.dpCreatePost(values)
      .then(response => {
      })
      .catch(error => {
        console.log('error: ', error);
      })
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <div style={{ backgroundColor: '#fff', padding: '40px' }}>
        <Title level={4} style={{ margin: '0 0 40px 0' }}>Create Post</Title>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >

          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input post title',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[
              {
                required: true,
                message: 'Please input post image',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Working time"
            name="workingtime"
            rules={[
              {
                required: true,
                message: 'Please input working time',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Material"
            name="material"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Guide"
            name="guide"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: 'Please choose the category',
              },
            ]}
          >
            <Select>
              <Select.Option value="KHAI_VI">Khai vị</Select.Option>
              <Select.Option value="MON_CHINH">Món chính</Select.Option>
              <Select.Option value="TRANG_MIENG">Tráng miệng</Select.Option>
              <Select.Option value="BANH_NGOT">Bánh ngọt</Select.Option>
              <Select.Option value="AN_CHOI">Ăn chơi</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Level"
            name="level"
            rules={[
              {
                required: true,
                message: 'Please choose the level',
              },
            ]}
          >
            <Select>
              <Select.Option value="DE">Dễ</Select.Option>
              <Select.Option value="TRUNG_BINH">Trung bình</Select.Option>
              <Select.Option value="KHO">Khó</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  dpCreatePost: (data) => createPost(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePGPage)