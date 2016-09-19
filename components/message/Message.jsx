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
  duration: 1000,
  autoClose: true,
  onClose: noop,
  content: '',
  type: 'info',
};

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    if (this.props.autoClose) {
      this.closeTimeoutId = setTimeout(this.close, this.props.duration);
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

  typeIcon(type) {
    let iconClassName;
    switch (type) {
      case 'info':
        iconClassName = 'zmdi zmdi-info message-type-icon-info';
        break;
      case 'success':
        iconClassName = 'zmdi zmdi-check-circle message-type-icon-success';
        break;
      case 'warn':
        iconClassName = 'zmdi zmdi-alert-triangle message-type-icon-warn';
        break;
      case 'error':
        iconClassName = 'zmdi zmdi-alert-triangle message-type-icon-error';
        break;
      default:
        return null;
    }
    return <i className={iconClassName} />;
  }

  render() {
    return (
      <div className="zc-message">
        {this.typeIcon(this.props.type)}
        {this.props.content}
      </div>
    );
  }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
