import React, { Component, PropTypes } from 'react';
import types from '../../utils/types';
import { noop } from '../../utils/default';
import '../../style/message.scss';

/*
single message
*/

const propTypes = {
  duration: PropTypes.number,
  autoClose: PropTypes.bool,
  onClose: PropTypes.func,
  content: PropTypes.string,
  type: types.message, // eslint-disable-line import/no-named-as-default-member
};

const defaultProps = {
  duration: 1,
  autoClose: true,
  onClose: noop,
  content: '',
};

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    if (this.props.autoClose) {
      this.closeTimeoutId = setTimeout(this.close, this.props.duration * 1000);
    }
  }

  clearCloseTimeout() {
    if (this.closeTimeoutId) {
      clearTimeout(this.closeTimeoutId);
      this.closeTimeoutId = null;
    }
  }

  close() {
    this.clearCloseTimeout();
    this.props.onClose();
  }

  render() {
    return (
      <div className="zc-message">
        {this.props.content}
      </div>
    );
  }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
