import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Table from '../components/table';
import '../style/base.scss'

storiesOf('Table 表格', module)
  .add('Basic 基本', () => {
    const columns = [
      {
        key: 'name',
        title: '姓名',
        dataPath: 'name',
      },
      {
        key: 'age',
        title: '年龄',
        dataPath: 'age',
      },
      {
        key: 'address',
        title: '住址',
        dataPath: 'address',
      },
      {
        key: 'operation',
        title: '操作',
        render: (text, record, index) => (
          <a onClick={() => {
            console.log(text);
            console.log(record);
            console.log(index);
          }}>发送数据</a>
        ),
      }
    ];
    const data = [
      {
        key: 'zhangsan',
        name: '张三',
        age: '18',
        address: '天河区五山华南理工大学',
      },
      {
        key: 'lisi',
        name: '李四',
        age: '22',
        address: '广州大学城华南理工大学',
      },
      {
        key: 'wangwu',
        name: '王五',
        age: '20',
        address: '海珠区中山大学',
      },
    ];
    return (
      <div>
        <Table columns={columns} data={data} />
        <br />
        <Table columns={columns} data={data} type="stripped" />
      </div>
    );
  })
