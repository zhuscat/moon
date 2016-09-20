import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { noop } from '../../utils/default';

const propTypes = {
  selectedKeys: PropTypes.array,
  eventKey: PropTypes.string,
  children: PropTypes.any,
  onMenuItemClick: PropTypes.func,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
  multiSelectable: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

const defaultProps = {
  selectedKeys: [],
  onSelect: noop,
  onDeselect: noop,
  onMenuItemClick: noop,
  multiSelectable: false,
  disabled: false,
  type: 'horizontal',
};

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(domEvent) {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    const selected = this.isSelected();
    const info = {
      key: this.props.eventKey,
      item: this,
      domEvent,
    };
    this.props.onMenuItemClick(info);
    if (this.props.multiSelectable) {
      if (selected) {
        this.props.onDeselect(info);
      } else {
        this.props.onSelect(info);
      }
    } else if (!selected) {
      this.props.onSelect(info);
    }
  }

  isSelected() {
    if (this.props.selectedKeys.includes(this.props.eventKey)) {
      return true;
    }
    return false;
  }

  render() {
    const className = classNames({
      'zc-menu-item-default': this.props.type === 'horizontal',
      'zc-menu-item-vertical': this.props.type === 'vertical',
      'zc-menu-item-active': this.isSelected(),
      'zc-menu-item-default-disabled': this.props.disabled,
    });
    return (
      <div
        className={className}
        onClick={this.handleClick}
      >
        {this.props.children}
      </div>
    );
  }
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;
