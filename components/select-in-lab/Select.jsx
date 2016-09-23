import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import clickOutside from '../highorder/ClickOutside';
import { noop } from '../../utils/default';
import enhanceOptions from '../../utils/form/enhanceOptions';
import '../../style/select.scss';


const propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  zIndex: PropTypes.number,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

const defaultProps = {
  defaultValue: '',
  readonly: false,
  zIndex: 999,
  onChange: noop,
};

export default class Select extends clickOutside(Component) {
  constructor(props) {
    super(props);
    let value = props.defaultValue;
    if ('value' in props) {
      value = props.value;
    }
    this.state = { value, open: false };
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.registerClickOutside(this.close, this.select);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  open() {
    this.setState({ open: true });
    this.bindClickOutside();
  }

  close() {
    this.setState({ open: false });
    this.unbindClickOutside();
  }

  getText(value) {
    const options = enhanceOptions(this.props.options);
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].value === value) {
        return options[i].text;
      }
    }
    return null;
  }

  handleInputClick() {
    const { readOnly } = this.props;
    const { open } = this.state;
    if (readOnly) {
      return;
    }
    if (open) {
      this.close();
    } else {
      this.open();
    }
  }

  handleItemClick(value) {
    this.close();
    if ('value' in this.props) {
      this.props.onChange(value);
    } else {
      this.setState({ value });
    }
  }

  render() {
    const { readOnly, zIndex } = this.props;
    const { value, open } = this.state;
    let options = this.props.options;
    options = enhanceOptions(options);
    const selectClassName = classNames({
      'zc-select': true,
      'zc-select-disabled': readOnly,
    });
    const itemsClassName = classNames({
      'zc-select-items': true,
      'zc-select-items-open': open,
    });
    const iconClassName = classNames({
      zmdi: true,
      'zmdi-caret-down': true,
      'zc-select-icon': true,
      'zc-select-icon-open': open,
    });
    return (
      <div
        className="zc-select-wrapper"
        ref={node => { this.select = node; }}
      >
        <div className={selectClassName} onClick={this.handleInputClick}>
          <span>{this.getText(value)}</span>
          <i className={iconClassName} />
        </div>
        <div
          className={itemsClassName}
          style={{
            zIndex,
          }}
        >
          {options.map(option => {
            const itemClassName = classNames({
              'zc-select-item': true,
              'zc-select-item-active': option.value === value,
            });
            return (
              <div
                key={`zc-select-option-${option.value}`}
                className={itemClassName}
                onClick={() => { this.handleItemClick(option.value); }}
              >
                {option.text}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
