import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { notify } from '../components/message';
import Button from '../components/Button';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class MessageExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    notify({content: <span><i className="zmdi zmdi-info"></i>提醒消息</span>, duration: 2000});
  }

  render() {
    return (
      <div>
        <Button onClick={this.onButtonClick}>点击提醒</Button>
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
