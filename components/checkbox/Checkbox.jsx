import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { noop } from '../../utils/default';
import '../../style/checkbox.scss';

const propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

const defaultProps = {
  text: '',
  readOnly: false,
  defaultChecked: false,
  onChange: noop,
  value: '',
};

export default class Checkbox extends Component {
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
    if (this.props.readOnly) {
      return;
    }
    if ('checked' in this.props) {
      this.props.onChange({
        key: this.props.value,
        checked: syntheticEvent.target.checked,
        value: this.props.value,
        syntheticEvent,
      });
    } else {
      this.setState({ checked: syntheticEvent.target.checked });
    }
  }

  render() {
    const checkboxInnerClassObj = {
      'zc-checkbox-inner': true,
      'zc-checkbox-inner-checked': this.state.checked,
      'zc-checkbox-inner-disabled': this.props.readOnly,
    };
    const checkboxInputClassObj = {
      'zc-checkbox-input': true,
      'zc-checkbox-disabled': this.props.readOnly,
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
            checked={this.state.checked}
            onChange={this.handleChange}
          />
        </span>
        <span>{this.props.text}</span>
      </label>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
