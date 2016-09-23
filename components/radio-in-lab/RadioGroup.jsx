import React, { Component, PropTypes } from 'react';
import Radio from './Radio';
import { noop } from '../../utils/default';
import '../../style/radiogroup.scss';

const propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool.isRequired,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

const defaultProps = {
  defaultValue: '',
  readOnly: false,
  onChange: noop,
};

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    let value = props.defaultValue;
    if ('value' in props) {
      value = props.value;
    }
    this.state = { value };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(event) {
    if ('value' in this.props) {
      this.props.onChange(event.value);
    } else {
      this.setState({ value: event.value });
    }
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

  render() {
    const { value } = this.state;
    const { readOnly } = this.props;
    let options = this.props.options;
    options = this.enhanceOptions(options);
    return (
      <div className="radio-group">
        {options.map(option =>
          <Radio
            key={option.value}
            text={option.text}
            value={option.value}
            checked={option.value === value}
            readOnly={readOnly}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;
