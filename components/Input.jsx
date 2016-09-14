import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { register } from './highorder/FormItem';

const propTypes = {
  readOnly: PropTypes.bool.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  trigger: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

const defaultProps = {
  readOnly: false,
  trigger: 'blur',
  type: 'text',
  value: '',
  placeholder: '',
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('input will receive props');
    this.setState({ value: nextProps.value });
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
      this.setState({ value: this.state.value });
      return;
    }

    this.setState({ value });

    if (trigger === 'change') {
      this.handleTrigger(event);
    }
  }

  handleTrigger(event) {
    const value = event.target.value;
    this.props.onChange(value, event);
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
