import React, { Component, PropTypes } from 'react';
import PaginationItem from './PaginationItem';
import PageJumper from './PageJumper';
import { calcPage, calcPageList } from './util';
import { noop } from '../../utils/default';

/**
 * Naming conventions inspired by antd.
 * For example, when provide current, the component is controled by
 * outer component. Otherwise, component will use its own state.
 */

const propTypes = {
  current: PropTypes.number,
  defaultCurrent: PropTypes.number,
  total: PropTypes.number,
  defaultPageSize: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
  showPageJumper: PropTypes.bool,
};

const defaultProps = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  onChange: noop,
  showPageJumper: false,
};

export default class Pagination extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageJumperKeyUp = this.handlePageJumperKeyUp.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    let current = props.defaultCurrent;
    if ('current' in props && this.props.onChange === noop) {
      console.warn('Warning: You provided a `current` prop without an `onChange` handler.'); // eslint-disable-line
    }
    if ('current' in props) {
      current = this.props.current;
    }
    let pageSize = props.defaultPageSize;
    if ('pageSize' in props) {
      pageSize = this.props.pageSize;
    }
    this.state = { current, pageSize };
  }

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({ current: nextProps.current });
    }
    if ('pageSize' in nextProps) {
      this.setState({ pageSize: nextProps.pageSize });
    }
  }

  validPage(page) {
    if (page <= 0) {
      return false;
    }
    if (page > calcPage(this.state.pageSize, this.props.total)) {
      return false;
    }
    return true;
  }

  handlePageJumperKeyUp(event) {
    const { value } = event;
    this.handleChange(value);
  }

  handleChange(page) {
    const current = page;
    if (!this.validPage(current)) {
      return;
    }
    if ('current' in this.props) {
      this.props.onChange(current);
    } else {
      this.setState({ current });
    }
  }

  prev() {
    const { current } = this.state;
    const prev = current - 1;
    this.handleChange(prev);
  }

  next() {
    const { current } = this.state;
    const next = current + 1;
    this.handleChange(next);
  }

  render() {
    const { current, pageSize } = this.state;
    const { total, showPageJumper } = this.props;
    const pageList = calcPageList(current, total, pageSize);
    return (
      <ul className="zc-pagination">
        <PaginationItem type="prev" onClick={this.prev} />
        {pageList.map(page => {
          if (page === -1) {
            return <PaginationItem type="dots" />;
          }
          return <PaginationItem page={page} current={current} onClick={this.handleChange} />;
        })}
        <PaginationItem type="next" onClick={this.next} />
        {showPageJumper ? <PageJumper onKeyUp={this.handlePageJumperKeyUp} /> : null}
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
