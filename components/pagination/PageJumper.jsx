import React, { Component, PropTypes } from 'react';
import keyCode from '../../utils/event/keycode';
import PaginationLocale from '../../locale/zh_CN/Pagination';
import { noop } from '../../utils/default';

const propTypes = {
  onKeyUp: PropTypes.func,
  total: PropTypes.number,
};

const defaultProps = {
  onKeyUp: noop,
};

export default class PageJumper extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleKeyUp(domEvent) {
    if (domEvent.keyCode === keyCode.ENTER) {
      let page = Number.parseInt(this.state.value, 10);
      if (Number.isNaN(page)) {
        page = 1;
      }
      const event = {
        value: page,
        domEvent,
      };
      this.props.onKeyUp(event);
      this.setState({ value: page });
    }
  }

  render() {
    return (
      <div className="zc-pagination-page-jumper">
        <span className="zc-pagination-page-jumper-span">{PaginationLocale.jumpto}</span>
        <input
          className="zc-pagination-page-jumper-input"
          type="text"
          value={this.state.value}
          onKeyUp={this.handleKeyUp}
          onChange={this.handleChange}
        />
        <span className="zc-pagination-page-jumper-span">{PaginationLocale.page}</span>
      </div>
    );
  }
}

PageJumper.propTypes = propTypes;
PageJumper.defaultProps = defaultProps;
