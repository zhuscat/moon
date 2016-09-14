import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import clickOutside from './highorder/ClickOutside';
import { register } from './highorder/FormItem';
import '../style/select.scss';


const propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
  zIndex: PropTypes.number.isRequired,
};

const defaultProps = {
  data: [],
  readonly: false,
  zIndex: 999,
};

class Select extends clickOutside(Component) {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value, open: false };
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.registerClickOutside(this.close, this.select);
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
    const { data } = this.props;
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].value === value) {
        return data[i].text;
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
    this.setState({ value }, () => {
      this.handleChange(value);
    });
  }

  handleChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    const { data, readOnly, zIndex } = this.props;
    const { value, open } = this.state;
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
          {this.getText(value)}
          <i className={iconClassName} />
        </div>
        <div
          className={itemsClassName}
          style={{
            zIndex,
          }}
        >
          {data.map(item => {
            const itemClassName = classNames({
              'zc-select-item': true,
              'zc-select-item-active': item.value === value,
            });
            return (
              <div
                className={itemClassName}
                onClick={() => { this.handleItemClick(item.value); }}
              >
                {item.text}
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

export default register(Select);
