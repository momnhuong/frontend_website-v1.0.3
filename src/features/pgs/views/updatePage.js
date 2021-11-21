import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Form, Button, Typography, Select, InputNumber } from 'antd'
import { detailPost, updatePost } from '../services'

const { Title } = Typography;
class DetailPGPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      post: null
    }
  }

  componentDidMount() {
    const { params } = this.props.match
    this.props.dpDetailPost(params.id)
      .then(response => {
        this.setState({
          isLoading: false,
          post: response.data
        })
      })
  }

  onFinish = values => {
    const { params } = this.props.match

    this.props.dpUpdatePost(values, params.id)
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
    const { isLoading, post } = this.state
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    if(!isLoading) {
      return (
        <div style={{ backgroundColor: '#fff', padding: '40px' }}>
          <Title level={4} style={{ margin: '0 0 40px 0' }}>Edit Post</Title>
          <Form
            initialValues={{
              'title': post.title,
              'image': post.image,
              'workingtime': post.workingtime,
              'material': post.material,
              'guide': post.guide,
              'category': post.category,
              'level': post.level
            }}
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

    return (<div></div>)
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  dpDetailPost: (post_id) => detailPost(post_id),
  dpUpdatePost: (data, post_id) => updatePost(data, post_id)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPGPage)