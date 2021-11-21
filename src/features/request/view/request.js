import React, { Component } from "react";
import { Table, Badge, Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { key } from "styled-theme";

class Request extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  
  renderTable(){
    const expandedRowRender = () => {
      // console.log('expandedRowRender',record)
      const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
          title: 'Status',
          key: 'state',
          render: () => (
            <span>
              <Badge status="success" />
              Finished
            </span>
          ),
        },
        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
       
      ];
  
      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          id: i,
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        });
      }
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };
    const columns = [
      { title: 'Product Name', dataIndex: 'name' ,key:'1'},
      { title: 'Product Name', dataIndex: 'name' ,key:'2'},
    ];
    const DataSource=[
      {
        key:1,
        name:"Data center contract",
        data:[
          {
            name:"demo"
          },
          {
            name:"demo2"
          }
        ]
      },
      {
        key:2,
        name:"Data center Services"
      }
    ]
    return( <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{
        expandedRowRender: record => <Table
        className="components-table-demo-nested"
        columns={columns}
        dataSource={record.data}
      />,
        rowExpandable: record => record.name !== 'Not Expandable',
      }}
      dataSource={DataSource}
    />)
  }
  render() {
    return (
    <div style={{marginTop:"64px"}}>
      {this.renderTable()}
    </div>)
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Request);
