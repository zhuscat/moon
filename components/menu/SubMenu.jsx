import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import PopoverMenu from './PopoverMenu';
import clickOutside from '../highorder/ClickOutside';
import traverseMenuItemRecursively from './util';
import { noop } from '../../utils/default';

const propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  eventKey: PropTypes.string,
  openKeys: PropTypes.array,
  selectedKeys: PropTypes.array,
  onItemHover: PropTypes.func,
  onMenuItemClick: PropTypes.func,
  zIndex: PropTypes.number,
  openSubMenuOnMouseEnter: PropTypes.bool,
  closeSubMenuOnMouseLeave: PropTypes.bool,
  onOpenChange: PropTypes.func,
  closeOnSelect: PropTypes.bool,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  disabled: PropTypes.bool,
};

const defaultProps = {
  title: '',
  zIndex: 999,
  openSubMenuOnMouseEnter: true,
  closeSubMenuOnMouseLeave: true,
  onMouseEnter: noop,
  onMouseLeave: noop,
  onOpenChange: noop,
  closeOnSelect: false,
  onSelect: noop,
  onDeselect: noop,
  onItemHover: noop,
  onMenuItemClick: noop,
  disabled: false,
};

export default class SubMenu extends clickOutside(Component) {

  constructor(props) {
    super(props);
    this.handleTitleMouseEnter = this.handleTitleMouseEnter.bind(this);
    this.handleTitleMouseLeave = this.handleTitleMouseLeave.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
  }

  componentDidMount() {
    this.registerClickOutside(this.handleClickOutside, this.submenu);
    if (this.isOpen(this.props.openKeys)) {
      this.bindClickOutside();
    } else {
      this.unbindClickOutside();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { openKeys } = nextProps;
    if (this.isOpen(openKeys)) {
      this.bindClickOutside();
    } else {
      this.unbindClickOutside();
    }
  }

  // 当鼠标点击到具有子级菜单的标题上面的时候
  handleTitleClick(domEvent) {
    if (this.props.disabled) {
      return;
    }
    if (this.props.openSubMenuOnMouseEnter) {
      return;
    }
    const openChanges = [];
    openChanges.push({
      key: this.props.eventKey,
      item: this,
      trigger: 'click',
      open: !this.isOpen(this.props.openKeys),
    });
    this.props.onOpenChange({
      domEvent,
      openChanges,
    });
  }

  // 当鼠标移动到具有子级菜单的标题上面的时候
  handleTitleMouseEnter(domEvent) {
    if (this.props.disabled) {
      return;
    }
    if (!this.props.openSubMenuOnMouseEnter) {
      return;
    }
    if (this.popoverTimeoutId) {
      clearTimeout(this.popoverTimeoutId);
      this.popoverTimeoutId = null;
    }
    const openChanges = [];
    openChanges.push({
      key: this.props.eventKey,
      item: this,
      trigger: 'mouseenter',
      open: true,
    });
    this.props.onItemHover({
      key: this.props.eventKey,
      item: this,
      hover: true,
      trigger: 'mouseenter',
      domEvent,
      openChanges,
    });
  }

  // 当鼠标离开到具有子级菜单的标题上的时候
  handleTitleMouseLeave(domEvent) {
    if (this.props.disabled) {
      return;
    }
    if (!this.props.closeSubMenuOnMouseLeave) {
      return;
    }
    const mouseLeaveFn = () => {
      const openChanges = [];
      openChanges.push({
        key: this.props.eventKey,
        item: this,
        trigger: 'mouseleave',
        open: false,
      });
      this.props.onItemHover({
        key: this.props.eventKey,
        item: this,
        hover: false,
        trigger: 'mouseleave',
        domEvent,
        openChanges,
      });
    };
    this.titleTimeoutId = setTimeout(mouseLeaveFn, 100);
  }

  // 当鼠标移动到子级菜单集详细项目上的时候
  handleMouseEnter(domEvent) {
    if (this.props.disabled) {
      return;
    }
    const props = this.props;
    if (this.titleTimeoutId) {
      clearTimeout(this.titleTimeoutId);
      this.titleTimeoutId = null;
    }
    props.onMouseEnter({
      key: props.eventKey,
      domEvent,
    });
  }

  handleMouseLeave(domEvent) {
    if (this.props.disabled) {
      return;
    }
    if (!this.props.closeSubMenuOnMouseLeave) {
      return;
    }
    const mouseLeaveFn = () => {
      const openChanges = [];
      openChanges.push({
        key: this.props.eventKey,
        item: this,
        trigger: 'mouseleave',
        open: false,
      });
      this.props.onItemHover({
        key: this.props.eventKey,
        item: this,
        hover: false,
        trigger: 'mouseleave',
        domEvent,
        openChanges,
      });
    };
    this.popoverTimeoutId = setTimeout(mouseLeaveFn, 100);
  }

  handleClickOutside(domEvent) {
    if (this.props.closeSubMenuOnMouseLeave) {
      return;
    }
    const openChanges = [];
    openChanges.push({
      key: this.props.eventKey,
      item: this,
      trigger: 'click',
      open: false,
    });
    this.props.onOpenChange({
      domEvent,
      openChanges,
    });
  }

  isOpen(openKeys) {
    if (openKeys.indexOf(this.props.eventKey) !== -1) {
      return true;
    }
    return false;
  }

  isChildrenSelected() {
    const { selectedKeys, children } = this.props;
    const res = { found: false };
    traverseMenuItemRecursively(children, selectedKeys, res);
    if (res.found) {
      return true;
    }
    return false;
  }

  handleMenuItemClick(e) {
    if (this.props.closeOnSelect) {
      const { openChanges = [] } = e;
      openChanges.push({
        key: this.props.eventKey,
        item: this,
        trigger: 'click',
        open: false,
      });
      e.openChanges = openChanges; // eslint-disable-line
      this.props.onOpenChange({ openChanges });
    }
    this.props.onMenuItemClick(e);
  }

  renderChildren(children) {
    const openKeys = this.props.openKeys;
    const props = {
      type: this.props.type,
      eventKey: `${this.props.eventKey}-menu`,
      selectedKeys: this.props.selectedKeys,
      visible: this.isOpen(openKeys),
      openKeys: this.props.openKeys,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onItemHover: this.props.onItemHover,
      onMenuItemClick: this.handleMenuItemClick,
      zIndex: this.props.zIndex + 1,
      onOpenChange: this.props.onOpenChange,
      openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter,
      closeSubMenuOnMouseLeave: this.props.closeSubMenuOnMouseLeave,
      onClickOutside: this.handleClickOutside,
      onSelect: this.props.onSelect,
      onDeselect: this.props.onDeselect,
    };
    return <PopoverMenu {...props}>{children}</PopoverMenu>;
  }

  render() {
    const { children, title } = this.props;
    const subMenuItemClassName = classNames({
      'zc-sub-menu-item-default': true,
      'zc-sub-menu-item-default-active': this.isChildrenSelected(),
      'zc-sub-menu-item-default-disabled': this.props.disabled,
    });
    const titleProps = {
      className: 'zc-sub-menu-item-title',
      onMouseEnter: this.handleTitleMouseEnter,
      onMouseLeave: this.handleTitleMouseLeave,
      onClick: this.handleTitleClick,
    };
    return (
      <div
        className={subMenuItemClassName}
        ref={node => { this.submenu = node; }}
      >
        <div {...titleProps}>
          {title}
        </div>
        {this.renderChildren(children)}
      </div>
    );
  }
}

SubMenu.propTypes = propTypes;
SubMenu.defaultProps = defaultProps;
