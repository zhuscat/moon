import React, { Component, PropTypes } from 'react';
import shallowClone from '../../utils/object/shallowClone';
import classNames from 'classnames';

const propTypes = {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
};

const defaultProps = {
  defaultValue: '',
  placeholder: '',
  readOnly: false,
};

export default class Input extends Component { // eslint-disable-line
  render() {
    const classObj = {
      'zc-input': true,
      'zc-input-readonly': this.props.readOnly,
    };
    const className = classNames(classObj);
    const props = shallowClone(this.props);
    if ('value' in props) {
      delete props.defaultValue;
    }
    return (
      <input
        className={className}
        type="text"
        {...props}
      />);
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
