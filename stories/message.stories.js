import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { notify, info, success, warn, error } from '../components/message';
import Button from '../components/Button';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class MessageExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onSuccessButtonClick = this.onSuccessButtonClick.bind(this);
    this.onWarnButtonClick = this.onWarnButtonClick.bind(this);
    this.onErrorButtonClick = this.onErrorButtonClick.bind(this);
  }

  onButtonClick() {
    notify({content: '提醒消息', duration: 2000});
  }

  onSuccessButtonClick() {
    success('成功登录', 2000);
  }

  onWarnButtonClick() {
    warn('该服务将被关闭，请使用 moon', 2000);
  }

  onErrorButtonClick() {
    error('发生了一些错误，请稍后再试', 2000);
  }

  render() {
    return (
      <div>
        <Button onClick={this.onButtonClick}>点击提醒</Button>
        <Button onClick={this.onSuccessButtonClick}>成功消息</Button>
        <Button onClick={this.onWarnButtonClick}>警告消息</Button>
        <Button onClick={this.onErrorButtonClick}>错误消息</Button>
      </div>
    )
  }
}

storiesOf('Message 全局消息', module)
  .add('Basic 基本', () => {
    return (
      <MessageExample1 />
    );
  })
