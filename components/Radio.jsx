import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import '../style/radio.scss';

const propTypes = {
  text: PropTypes.string.isRequired,
  on: PropTypes.bool.isRequired,
  value: PropTypes.any,
  onClick: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
};

const defaultProps = {
  readOnly: false,
};

export default class Radio extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.onClick && !this.props.readOnly) {
      this.props.onClick(this.props.value);
    }
  }

  render() {
    const { text, value, on, readOnly } = this.props;
    const radioInnerClassObj = {
      'zc-radio-inner': true,
      'zc-radio-inner-checked': on,
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
            checked={on}
            onChange={this.handleClick}
          />
        </span>
        <span>{text}</span>
      </label>
    );
  }
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;
