import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import '../style/checkbox.scss';

const propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

const defaultProps = {
  readOnly: false,
};

export default class Checkbox extends Component {
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
    const { value, on, text, readOnly } = this.props;
    const checkboxInnerClassObj = {
      'zc-checkbox-inner': true,
      'zc-checkbox-inner-checked': on,
      'zc-checkbox-inner-disabled': readOnly,
    };
    const checkboxInputClassObj = {
      'zc-checkbox-input': true,
      'zc-checkbox-disabled': readOnly,
    };
    const checkboxInnerClassName = classNames(checkboxInnerClassObj);
    const checkboxInputClassName = classNames(checkboxInputClassObj);
    return (
      <label className="zc-checkbox-wrapper">
        <span className="zc-checkbox">
          <span className={checkboxInnerClassName} />
          <input
            className={checkboxInputClassName}
            type="checkbox"
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

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
