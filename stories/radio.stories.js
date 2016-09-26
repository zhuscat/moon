import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Radio from '../components/radio';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class RadioExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }
  render() {
    return <Radio onChange={(e) => this.setState({ checked: e.checked })} text="controlled radio" checked={this.state.checked} />
  }
}

class RadioExample2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  render() {
    const options = ['movie', 'book', 'music'];
    return (
      <Radio.RadioGroup
        value={this.state.value}
        options={options}
        onChange={(value) => {this.setState({ value })}}
      />
    );
  }
}

storiesOf('Radio 单选框', module)
  .add('Basic 基本', () => {
    return (
      <Radio text="radio" />
    );
  })
  .add('Controlled 受控', () => {
    return (
      <RadioExample1 />
    );
  })
  .add('ReadOnly 只读', () => {
    return (
      <Radio readOnly text="readOnly" defaultChecked={true} />
    )
  })
  .add('CheckboxGroup 单选框组', () => {
    const options = ['movie', 'book', 'music'];
    return (
      <Radio.RadioGroup
        options={options}
      />
    );
  })
  .add('Controlled CheckboxGroup 受控单选框组', () => {
    return (
      <RadioExample2 />
    );
  })
