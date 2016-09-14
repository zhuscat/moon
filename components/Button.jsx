import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import '../style/button.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    'primary', 'normal', 'hollow',
  ]),
  disabled: PropTypes.bool.isRequired,
  once: PropTypes.bool.isRequired,
  size: PropTypes.oneOf([
    'small',
    'default',
    'small',
  ]),
  radius: PropTypes.bool.isRequired,
  status: PropTypes.oneOf([
    'default',
    'success',
    'warning',
    'error',
  ]),
};

const defaultProps = {
  type: 'normal',
  disabled: false,
  once: false,
  size: 'default',
  radius: false,
};

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: props.disabled };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    if (this.props.onClick && !this.state.disabled) {
      this.props.onClick(e);
    }
    if (this.props.once) {
      this.disable();
    }
  }

  disable() {
    this.setState({ disabled: true });
  }

  render() {
    const { children, type, size, status, radius } = this.props;
    const { disabled } = this.state;
    const classObj = {
      [`zc-button-${type}`]: true,
      'zc-button-disabled': disabled,
      [`zc-button-${size}`]: size !== 'default',
      [`zc-button-status-${status}`]: status !== 'default',
      'zc-button-radius': radius,
    };
    const className = classNames(classObj);
    return <button className={className} onClick={this.onClick}>{children}</button>;
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
