import React, { Component, PropTypes } from 'react';
import { noop } from '../../utils/default';

/*
  inspired heavily by rc-menu
*/

const propTypes = {
  children: PropTypes.any,
  selectedKeys: PropTypes.array,
  openKeys: PropTypes.array,
  multiSelectable: PropTypes.bool,
  openSubMenuOnMouseEnter: PropTypes.bool,
  closeSubMenuOnMouseLeave: PropTypes.bool,
  onClick: PropTypes.func,
  onOpenChange: PropTypes.func,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
  closeOnSelect: PropTypes.bool,
  // TODO: defaultSelectFirst 为实现
  defaultSelectedKeys: PropTypes.array,
  defaultOpenKeys: PropTypes.array,
  type: PropTypes.string,
};

const defaultProps = {
  multiSelectable: false,
  onClick: noop,
  openSubMenuOnMouseEnter: true,
  closeSubMenuOnMouseLeave: true,
  onOpenChange: noop,
  closeOnSelect: true,
  onSelect: noop,
  onDeselect: noop,
  defaultOpenKeys: [],
  defaultSelectedKeys: [],
  type: 'horizontal',
};

export default class Menu extends Component {

  constructor(props) {
    super(props);
    let openKeys = props.defaultOpenKeys;
    let selectedKeys = props.defaultSelectedKeys;
    if ({}.hasOwnProperty.call(props, 'openKeys')) {
      openKeys = this.props.openKeys || [];
    }
    if ({}.hasOwnProperty.call(props, 'selectedKeys')) {
      selectedKeys = this.props.selectedKeys || [];
    }
    this.state = {
      openKeys,
      selectedKeys,
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.renderMenuItem = this.renderMenuItem.bind(this);
    this.onItemHover = this.onItemHover.bind(this);
    this.handleOpenChange = this.handleOpenChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const props = {};
    if ('openKeys' in nextProps) {
      props.openKeys = nextProps.openKeys;
    }
    if ('selectedKeys' in nextProps) {
      props.selectedKeys = nextProps.selectedKeys;
    }
    this.setState(props);
  }

  onItemHover(e) {
    this.handleOpenChange(e);
  }

  // 所有 open keys 发生变化时候调用
  handleOpenChange(e) {
    const openKeys = this.state.openKeys.concat();
    const { openChanges } = e;
    openChanges.forEach(change => {
      if (change.open) {
        const index = openKeys.indexOf(change.key);
        if (index === -1) {
          openKeys.push(change.key);
        }
      } else {
        const index = openKeys.indexOf(change.key);
        if (index !== -1) {
          openKeys.splice(index, 1);
        }
      }
    });
    if (!{}.hasOwnProperty.call(this.props, 'openKeys')) {
      this.setState({ openKeys });
    } else {
      this.props.onOpenChange(openKeys);
    }
  }

  handleClick(e) {
    // const { key } = e;
    // if (!this.props.multiSelectable) {
    //   this.setState({ selectedKeys: [key] });
    // } else {
    //   // whether to add or remove from selectedKeys...
    // }
    this.props.onClick(e);
  }

  handleSelect(e) {
    const { key } = e;
    let { selectedKeys } = this.state;
    if (this.props.multiSelectable) {
      selectedKeys = selectedKeys.concat([key]);
    } else {
      selectedKeys = [key];
    }
    if (!{}.hasOwnProperty.call(this.props, 'selectedKeys')) {
      this.setState({ selectedKeys });
    }
    this.props.onSelect(e);
  }

  handleDeselect(e) {
    const { key } = e;
    const selectedKeys = this.state.selectedKeys.concat();
    const index = selectedKeys.indexOf(key);
    if (index !== -1) {
      selectedKeys.splice(index, 1);
    }
    if (!{}.hasOwnProperty.call(this.props, 'selectedKeys')) {
      this.setState({ selectedKeys });
    }
    this.props.onSelect(e);
  }

  renderMenuItem(item) {
    return React.cloneElement(item, {
      selectedKeys: this.state.selectedKeys,
      onMenuItemClick: this.handleClick,
      type: this.props.type,
      openKeys: this.state.openKeys,
      eventKey: item.key,
      onItemHover: this.onItemHover,
      onOpenChange: this.handleOpenChange,
      openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter,
      closeSubMenuOnMouseLeave: this.props.closeSubMenuOnMouseLeave,
      closeOnSelect: this.props.closeOnSelect,
      onSelect: this.props.onSelect,
      onDeselect: this.props.onDeselect,
    });
  }

  render() {
    const { children, type } = this.props;
    let className;
    if (type === 'horizontal') {
      className = 'zc-menu-default';
    } else if (type === 'vertical') {
      className = 'zc-menu-vertical';
    }
    return (
      <div className={className}>
        {React.Children.map(children, this.renderMenuItem)}
      </div>
    );
  }
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;
