import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { notify } from '../components/message';
import Button from '../components/Button';
import Animator from '../components/Animator';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

let key = 10;

class AnimatableDiv extends React.Component {
  componentWillEnter(callback) {
    this.refs.test.style.backgroundColor = 'green';
    setTimeout(callback, 1000);
  }

  componentDidEnter() {
    this.refs.test.style.backgroundColor = 'red';
  }

  componentWillLeave(callback) {
    this.refs.test.style.backgroundColor = 'red';
    setTimeout(callback, 1000);
  }

  componentDidLeave() {
    this.ref.test.style.backgroundColor = 'yellow';
  }

  render() {
    return (
      <div ref="test">{this.props.children}</div>
    );
  }
}

class AnimatorExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = { divs: [] };
  }

  onButtonClick() {
    const divs = this.state.divs.concat();
    divs.push({
      content: key,
      key: key,
    });
    key++;
    this.setState({ divs });
  }

  render() {
    return (
      <div>
        <Animator>
          {this.state.divs.map(div => {
            return <AnimatableDiv key={div.key}>{div.content}</AnimatableDiv>
          })}
        </Animator>
        <Button onClick={this.onButtonClick}>
          点击增加
        </Button>
      </div>
    )
  }
}

storiesOf('Animator 动画', module)
  .add('Basic 基本', () => {
    return (
      <AnimatorExample1 />
    );
  })
