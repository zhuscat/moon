import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import clickOutside from '../highorder/ClickOutside';
import { noop } from '../../utils/default';

const propTypes = {
  children: PropTypes.any,
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  visible: PropTypes.bool.isRequired,
  openKeys: PropTypes.array.isRequired,
  selectedKeys: PropTypes.array,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onItemHover: PropTypes.func,
  onMenuItemClick: PropTypes.func,
  zIndex: PropTypes.number,
  onOpenChange: PropTypes.func,
  openSubMenuOnMouseEnter: PropTypes.bool,
  closeSubMenuOnMouseLeave: PropTypes.bool,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
};

const defaultProps = {
  zIndex: 999,
  onOpenChange: noop,
  openSubMenuOnMouseEnter: true,
  closeSubMenuOnMouseLeave: true,
  onMouseEnter: noop,
  onMouseLeave: noop,
  onItemHover: noop,
  onMenuItemClick: noop,
  onSelect: noop,
  onDeselect: noop,
};

export default class PopoverMenu extends Component {
  constructor(props) {
    super(props);
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(domEvent) {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(domEvent);
    }
  }

  handleMouseLeave(domEvent) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(domEvent);
    }
  }

  renderMenuItem(item) {
    return React.cloneElement(item, {
      eventKey: item.key,
      openKeys: this.props.openKeys,
      onItemHover: this.props.onItemHover,
      onMenuItemClick: this.props.onMenuItemClick,
      selectedKeys: this.props.selectedKeys,
      zIndex: this.props.zIndex,
      onOpenChange: this.props.onOpenChange,
      openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter,
      closeSubMenuOnMouseLeave: this.props.closeSubMenuOnMouseLeave,
      onSelect: this.props.onSelect,
      onDeselect: this.props.onDeselect,
      type: 'vertical',
    });
  }

  render() {
    const className = classNames({
      'zc-popover-menu': true,
      'zc-popover-menu-show': this.props.visible,
    });
    const style = {
      zIndex: this.props.zIndex,
    };
    if (this.props.type === 'horizontal') {
      style.top = '100%';
      style.left = '0px';
    } else {
      style.top = '0px';
      style.left = '100%';
    }
    return (
      <div
        className={className}
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={node => { this.popover = node; }}
      >
        {React.Children.map(this.props.children, this.renderMenuItem)}
      </div>
    );
  }
}

PopoverMenu.propTypes = propTypes;
PopoverMenu.defaultProps = defaultProps;
