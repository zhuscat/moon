import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { noop } from '../../utils/default';
import '../../style/numberinput.scss';

const propTypes = {
  value: PropTypes.number,
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

const defaultProps = {
  defaultValue: '',
  step: 1,
  onChange: noop,
  onBlur: noop,
};

export default class NumberInput extends Component {
  constructor(props) {
    super(props);
    let value = props.defaultValue;
    if ('value' in props) {
      value = props.value;
    }
    this.state = { focus: false, value };
    this.handleDownButtonClick = this.handleDownButtonClick.bind(this);
    this.handleUpButtonClick = this.handleUpButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  parseValue(value) {
    let val = value;
    if (val === '') {
      val = '';
    } else if (!Number.isNaN(val)) {
      val = Number.parseInt(val, 10);
    }
  }

  handleDownButtonClick() {
    const { step, min } = this.props;
    const v = this.state.value ? Number.parseInt(this.state.value, 10) : 0;
    const resultValue = (v - step) < min ? min : v - step;
    this.setState({ focus: true });
    if ('value' in this.props) {
      this.props.onChange(resultValue);
    } else {
      this.setState({ value: resultValue });
    }
    this.numberInput.focus();
  }

  handleUpButtonClick() {
    const { step, max } = this.props;
    const v = this.state.value ? Number.parseInt(this.state.value, 10) : 0;
    const resultValue = (v + step) > max ? max : v + step;
    if ('value' in this.props) {
      this.props.onChange(resultValue);
    } else {
      this.setState({ value: resultValue });
    }
    this.numberInput.focus();
  }

  render() {
    const wrapperClassName = this.state.focus ?
      'zc-number-input-wrapper-active' : 'zc-number-input-wrapper';
    const { value } = this.state;
    const { min, max } = this.props;
    const inputDownClassName = classNames({
      'zc-number-input-down': true,
      'zc-number-input-button-disabled': min === value,
    });
    const inputUpClassName = classNames({
      'zc-number-input-up': true,
      'zc-number-input-button-disabled': max === value,
    });
    return (
      <div className={wrapperClassName}>
        <div
          className={inputDownClassName}
          onClick={this.handleDownButtonClick}
        >
          -
        </div>
        <input
          className="zc-number-input"
          type="text"
          value={this.state.value}
          onChange={(e) => {
            const v = e.target.value;
            if (!/^[-+]?\d*$/.test(v)) {
              return;
            }
            if (this.props.onChange) {
              this.props.onChange(v);
            }
            this.setState({ value: v });
          }}
          onFocus={() => {
            this.setState({ focus: true });
          }}
          onBlur={() => {
            this.setState({ focus: false });
          }}
          ref={(ref) => { this.numberInput = ref; }}
        />
        <div
          className={inputUpClassName}
          onClick={this.handleUpButtonClick}
        >
          +
        </div>
      </div>
    );
  }
}

NumberInput.propTypes = propTypes;
NumberInput.defaultProps = defaultProps;
