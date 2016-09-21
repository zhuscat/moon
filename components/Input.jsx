import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { noop } from '../utils/default';
import { register } from './highorder/FormItem';

const propTypes = {
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  trigger: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onTrigger: PropTypes.func,
};

const defaultProps = {
  readOnly: false,
  type: 'text',
  defaultValue: '',
  trigger: 'blur',
  placeholder: '',
  onChange: noop,
  onTrigger: noop,
};

class Input extends Component {
  constructor(props) {
    super(props);
    let value = props.defaultValue;
    if ('value' in props) {
      value = props.value;
    }
    this.state = { value };
    this.handleChange = this.handleChange.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(event) {
    const regs = {
      integer: /^[-+]?\d*$/,
      number: /^-?\d*\.?\d*$/,
    };
    const { readOnly, trigger, type } = this.props;
    if (readOnly) {
      return;
    }
    const value = event.target.value;

    if (regs[type] && !regs[type].test(value)) {
      if ('value' in this.props) {
        this.props.onChange(this.state.value);
      } else {
        this.setState({ value: this.state.value });
      }
      return;
    }

    if ('value' in this.props) {
      this.props.onChange(this.state.value);
    } else {
      this.setState({ value });
    }

    if (trigger === 'change') {
      this.handleTrigger(event);
    }
  }

  handleTrigger(event) {
    const value = event.target.value;
    this.props.onTrigger(value, event);
  }

  render() {
    const { trigger, placeholder } = this.props;
    const props = {
      onChange: this.handleChange,
    };
    if (trigger !== 'change') {
      const handleEvent = `on${trigger.charAt(0).toUpperCase()}${trigger.slice(1)}`;
      props[handleEvent] = this.handleTrigger;
    }
    const classObj = {
      'zc-input': true,
      'zc-input-readonly': this.props.readOnly,
    };
    const className = classNames(classObj);
    return (
      <input
        className={className}
        type={this.props.type === 'password' ? 'password' : 'text'}
        value={this.state.value}
        onChange={this.handleChange}
        readOnly={this.props.readOnly}
        placeholder={placeholder}
        {...props}
      />);
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default register(Input, ['text', 'email', 'number', 'integer', 'password']);
