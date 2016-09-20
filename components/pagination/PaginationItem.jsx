import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { noop } from '../../utils/default';

const propTypes = {
  current: PropTypes.number,
  page: PropTypes.number,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  type: 'page',
  onClick: noop,
};

export default class PaginationItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.page);
  }

  render() {
    const { type } = this.props;
    switch (type) {
      case 'page':
        {
          const itemClassName = classNames({
            'zc-pagination-item': true,
            'zc-pagination-item-acitve': this.props.page === this.props.current,
          });
          return (
            <li
              className={itemClassName}
              onClick={this.handleClick}
            >{this.props.page}</li>
          );
        }
      case 'prev':
        return (
          <li className="zc-pagination-item" onClick={this.handleClick}>
            <i className="zmdi zmdi-chevron-left" />
          </li>
        );
      case 'next':
        return (
          <li className="zc-pagination-item" onClick={this.handleClick}>
            <i className="zmdi zmdi-chevron-right" />
          </li>
        );
      case 'dots':
        return (
          <li className="zc-pagination-item zc-pagination-item-dots">
            {'...'}
          </li>
        );
      default:
        return null;
    }
  }
}

PaginationItem.propTypes = propTypes;
PaginationItem.defaultProps = defaultProps;
