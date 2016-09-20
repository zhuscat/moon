import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Pagination from '../components/pagination';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class PaginationExample1 extends React.Component {
  render() {
    return (
      <Pagination total={500} />
    );
  }
}

class PaginationExample2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 1 };
  }

  render() {
    return (
      <Pagination
        current={this.state.current}
        total={500}
        onChange={(current) => {
          this.setState({ current })
        }}
      />
    );
  }
}

class PaginationExample3 extends React.Component {
  render() {
    return (
      <Pagination total={500} showPageJumper />
    );
  }
}

storiesOf('Pagination 分页', module)
  .add('Basic 基本', () => {
    return (
      <PaginationExample1 />
    );
  })
  .add('Controlled 受控', () => {
    return (
      <PaginationExample2 />
    )
  })
  .add('PageJumper 页面转跳器', () => {
    return (
      <PaginationExample3 />
    )
  });
