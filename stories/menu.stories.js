import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Menu from '../components/menu';
import PopoverMenu from '../components/menu/PopoverMenu'
import RenderToLayer from '../components/RenderToLayer';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class MenuExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSelectedKey: 'home' };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { key } = e;
    console.log(key);
    this.setState({ currentSelectedKey: key });
  }

  render() {
    return (
      <Menu
        selectedKeys={[this.state.currentSelectedKey]}
        onClick={this.onClick}
        onSelect={e => console.log(e)}
        onDeselect={e => console.log(e)}
        openSubMenuOnMouseEnter={false}
        closeSubMenuOnMouseLeave={false}
      >
        <Menu.MenuItem key="home">首页</Menu.MenuItem>
        <Menu.MenuItem
          key="component"
          disabled
        >
          组件
        </Menu.MenuItem>
        <Menu.MenuItem key="guidelines">设计准则</Menu.MenuItem>
        <Menu.SubMenu key="two-menu" title="二级菜单">
          <Menu.MenuItem key="option1">选项1</Menu.MenuItem>
          <Menu.MenuItem key="option2">选项2</Menu.MenuItem>
          <Menu.SubMenu key="three-menu" title="三级菜单">
            <Menu.MenuItem key="option3">选项3</Menu.MenuItem>
            <Menu.MenuItem key="option4">选项4</Menu.MenuItem>
            <Menu.SubMenu key="four-menu" title="四级菜单">
              <Menu.MenuItem key="option5">选项5</Menu.MenuItem>
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.SubMenu key="disabled-menu-two" title="失效二级" disabled>
          <Menu.MenuItem key="option6">选项6</Menu.MenuItem>
        </Menu.SubMenu>
      </Menu>
    )
  }
}

class MenuExample2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSelectedKey: 'home' };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { key } = e;
    console.log(key);
    this.setState({ currentSelectedKey: key });
  }

  render() {
    return (
      <Menu
        selectedKeys={[this.state.currentSelectedKey]}
        onClick={this.onClick}
        onSelect={e => console.log(e)}
        onDeselect={e => console.log(e)}
        type="vertical"
        openSubMenuOnMouseEnter={false}
        closeSubMenuOnMouseLeave={false}
      >
        <Menu.MenuItem key="home">首页</Menu.MenuItem>
        <Menu.MenuItem
          key="component"
          disabled
        >
          组件
        </Menu.MenuItem>
        <Menu.MenuItem key="guidelines">设计准则</Menu.MenuItem>
        <Menu.SubMenu key="two-menu" title="二级菜单">
          <Menu.MenuItem key="option1">选项1</Menu.MenuItem>
          <Menu.MenuItem key="option2">选项2</Menu.MenuItem>
          <Menu.SubMenu key="three-menu" title="三级菜单">
            <Menu.MenuItem key="option3">选项3</Menu.MenuItem>
            <Menu.MenuItem key="option4">选项4</Menu.MenuItem>
            <Menu.SubMenu key="four-menu" title="四级菜单">
              <Menu.MenuItem key="option5">选项5</Menu.MenuItem>
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.SubMenu key="disabled-menu-two" title="失效二级" disabled>
          <Menu.MenuItem key="option6">选项6</Menu.MenuItem>
        </Menu.SubMenu>
      </Menu>
    )
  }
}

storiesOf('Menu 菜单', module)
  .add('Basic 基本', () => {
    return (
      <MenuExample1 />
    );
  })
  .add('Vertical 垂直', () => {
    return (
      <MenuExample2 />
    )
  })
