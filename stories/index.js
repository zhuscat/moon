import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import '../style/base.scss'
import { Row, Col } from '../components/layout';
import Button from '../components/Button';
import FormItem from '../components/FormItem';
import Input from '../components/Input';
import FormControl from '../components/FormControl';
import Form from '../components/Form';
import Radio from '../components/Radio';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from '../components/CheckboxGroup';
import { COMPONENTS} from '../components/highorder/FormItem';

const TestDiv = (props) =>
  <div style={{
    backgroundColor: '#2196f3',
    width: '100%',
    height: '100%',
    minHeight: 60,
    textAlign: 'center',
    lineHeight: '60px',
    color: '#fff',
    borderRadius: 4,
  }}>{props.message}</div>

// test color: #2196f3
storiesOf('Layout 栅格', module)
  .add('Basic 基本', () => (
    <Row>
      <Col span={22}>
        <TestDiv message="col-10" />
      </Col>
      <Col span={2}>
        <TestDiv message="col-14" />
      </Col>
    </Row>
  ))
  .add('Offset 偏移', () => (
    <div>
      <Row>
        <Col span={4} offset={20}>
          <TestDiv message="span-4 offset-20" />
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={6}>
          <TestDiv message="span-6 offset-6" />
        </Col>
        <Col span={6} offset={6}>
          <TestDiv message="span-6 offset-6" />
        </Col>
      </Row>
    </div>
  ))
  .add('Push and Pull 推与拉', () => (
    <div>
      <Row>
        <Col span={6} pull={18}>
          <TestDiv message="span-4 pull-18" />
        </Col>
        <Col span={18} push={6}>
          <TestDiv message="span-18 push-6" />
        </Col>
      </Row>
    </div>
  ))
  .add('Responsive 响应式', () => (
    <Row>
      <Col xs={12} md={8}>
        <TestDiv message="xs-12 md-8" />
      </Col>
      <Col xs={12} md={16}>
        <TestDiv message="xs-12 md-16" />
      </Col>
    </Row>
  ))

storiesOf('Button 按钮', module)
  .add('Basic 基本', () => (
    <div>
      <Button
        type="primary"
        onClick={action('Primary Button Click')}
      >
        Primary
      </Button>
      <Button
        type="normal"
        onClick={action('Normal Button Click')}
      >
        Normal
      </Button>
      <Button
        type="hollow"
        onClick={action('Hollow Button Click')}
      >
        Hollow
      </Button>
      <Button
        type="primary"
        disabled={true}
        onClick={action('Disabled Button Click')}
      >
        Disabled
      </Button>
    </div>
  ))
  .add('Once 一次', () => (
    <div>
      <Button
        type="primary"
        once={true}
        onClick={action('Once Button Click')}
      >
        Disabled
      </Button>
    </div>
  ))
  .add('Different size 不同尺寸', () => (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={action('Large Button Click')}
      >
        Large
      </Button>
      <Button
        type="primary"
        onClick={action('Default Button Click')}
      >
        Default
      </Button>
      <Button
        type="primary"
        size="small"
        onClick={action('Small Button Click')}
      >
        Small
      </Button>
    </div>
  ))
  .add('Different status 不同状态', () => (
    <div>
      <div>
        <Button
          type="normal"
          status="success"
          onClick={action('Success Button Click')}
        >
          Large
        </Button>
        <Button
          type="normal"
          status="warning"
          onClick={action('Warning Button Click')}
        >
          Default
        </Button>
        <Button
          type="normal"
          status="error"
          onClick={action('Error Button Click')}
        >
          Small
        </Button>
      </div>
      <div>
        <Button
          type="primary"
          status="success"
          onClick={action('Success Button Click')}
        >
          Large
        </Button>
        <Button
          type="primary"
          status="warning"
          onClick={action('Warning Button Click')}
        >
          Default
        </Button>
        <Button
          type="primary"
          status="error"
          onClick={action('Error Button Click')}
        >
          Small
        </Button>
      </div>
      <div>
        <Button
          type="hollow"
          status="success"
          onClick={action('Success Button Click')}
        >
          Large
        </Button>
        <Button
          type="hollow"
          status="warning"
          onClick={action('Warning Button Click')}
        >
          Default
        </Button>
        <Button
          type="hollow"
          status="error"
          onClick={action('Error Button Click')}
        >
          Small
        </Button>
      </div>
    </div>
  ))
  .add('Radius button 圆角按钮', () => (
    <div>
      <Button
        type="primary"
        radius
        onClick={action('Radius Button Click')}
      >
        Radius
      </Button>
    </div>
  ))
