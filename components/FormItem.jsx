import React, { Component, PropTypes } from 'react';
import { wrap } from './highorder/FormItem';
import '../style/input.scss';

const propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  children: PropTypes.element,
};

class FormItem extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    let v = value;
    if (value && value.nativeEvent) {
      v = value.target.value;
    }
    this.props.onChange(v);
  }

  render() {
    return React.cloneElement(this.props.children, {
      value: this.props.value || '',
      onChange: this.handleChange,
    });
  }
}

FormItem.propTypes = propTypes;

export default wrap(FormItem);
