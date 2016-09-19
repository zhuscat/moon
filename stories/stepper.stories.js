import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Stepper from '../components/stepper';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class StepperExample1 extends React.Component {
  render() {
    return (
      <Stepper>
        <Stepper.Step title="搅拌鸡蛋" description="将鸡蛋打碎放入碗中进行搅拌" />
        <Stepper.Step title="切番茄" description="将番茄切成几块" />
        <Stepper.Step title="倒入调料" description="将调料放入锅中，导入食材进行翻炒" />
        <Stepper.Step title="装盘" description="将成品放入盘中" />
      </Stepper>
    )
  }
}

class StepperExample2 extends React.Component {
  render() {
    return (
      <Stepper type="vertical" status="error" current={1}>
        <Stepper.Step title="搅拌鸡蛋" description="将鸡蛋打碎放入碗中进行搅拌" />
        <Stepper.Step title="切番茄" description="将番茄切成几块，你好像没切好" />
        <Stepper.Step title="倒入调料" description="将调料放入锅中，导入食材进行翻炒" />
        <Stepper.Step title="结束" description="" />
        <Stepper.Step title="装盘" description="将成品放入盘中" />
      </Stepper>
    )
  }
}

storiesOf('Stepper 步骤条', module)
  .add('Basic 基本', () => {
    return (
      <StepperExample1 />
    );
  })
  .add('Vertical 垂直', () => {
    return (
      <StepperExample2 />
    );
  })
