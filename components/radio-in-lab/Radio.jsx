import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { noop } from '../../utils/default';
import '../../style/radio.scss';

const propTypes = {
  text: PropTypes.string,
  value: PropTypes.any,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

const defaultProps = {
  readOnly: false,
  defaultChecked: false,
  onChange: noop,
};

export default class Radio extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    let checked = props.defaultChecked;
    if ('checked' in props) {
      checked = props.checked;
    }
    this.state = { checked };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({ checked: nextProps.checked });
    }
  }

  handleChange(syntheticEvent) {
    if ('checked' in this.props) {
      this.props.onChange({
        key: this.props.value,
        value: this.props.value,
        checked: syntheticEvent.target.checked,
        syntheticEvent,
      });
    } else {
      this.setState({ checked: syntheticEvent.target.checked });
    }
  }

  render() {
    const { text, value, readOnly } = this.props;
    const { checked } = this.state;
    const radioInnerClassObj = {
      'zc-radio-inner': true,
      'zc-radio-inner-checked': checked,
      'zc-radio-inner-disabled': readOnly,
    };
    const radioInputClassObj = {
      'zc-radio-input': true,
      'zc-radio-input-disabled': readOnly,
    };
    const radioInnerClassName = classNames(radioInnerClassObj);
    const radioInputClassName = classNames(radioInputClassObj);
    return (
      <label className="zc-radio-wrapper">
        <span className="zc-radio">
          <span className={radioInnerClassName} />
          <input
            className={radioInputClassName}
            type="radio"
            value={value}
            checked={checked}
            onChange={this.handleChange}
          />
        </span>
        <span>{text}</span>
      </label>
    );
  }
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;
