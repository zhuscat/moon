import React, { Component, PropTypes } from 'react';
import Checkbox from './Checkbox';
import { noop } from '../../utils/default';
import '../../style/checkboxgroup.scss';

const propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  options: PropTypes.array,
  onChange: PropTypes.func,
};

const defaultProps = {
  defaultValue: [],
  onChange: noop,
  options: [],
};

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    let value = props.defaultValue;
    if ('value' in props) {
      value = props.value;
    }
    value = this.normalizeValue(value);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  normalizeValue(value) {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  }

  enhanceOptions(options) {
    const newOptions = [];
    options.forEach(option => {
      if (typeof option === 'string') {
        newOptions.push({ text: option, value: option });
      } else {
        newOptions.push(option);
      }
    });
    return newOptions;
  }

  handleChange(event) {
    const { value, checked } = event;
    if (checked) {
      if (!this.state.value.includes(value)) {
        const newValue = [...this.state.value, value];
        if ('value' in this.props) {
          this.props.onChange(newValue);
        } else {
          this.setState({ value: newValue });
        }
      }
    } else {
      const idx = this.state.value.indexOf(value);
      if (idx !== -1) {
        const newValue = [
          ...this.state.value.slice(0, idx),
          ...this.state.value.slice(idx + 1),
        ];
        if ('value' in this.props) {
          this.props.onChange(newValue);
        } else {
          this.setState({ value: newValue });
        }
      }
    }
  }

  isChecked(value) {
    if (this.state.value.includes(value)) {
      return true;
    }
    return false;
  }

  render() {
    let options = this.props.options;
    options = this.enhanceOptions(options);
    return (
      <div className="checkbox-group">
        {options.map(option =>
          <Checkbox
            key={option.value}
            text={option.text}
            value={option.value}
            checked={this.isChecked(option.value)}
            onChange={this.handleChange}
          />
        )}
      </div>
    )
  }
}

CheckboxGroup.propTypes = propTypes;
CheckboxGroup.defaultProps = defaultProps;
