import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Checkbox from '../components/checkbox-in-lab';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class CheckboxExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }
  render() {
    return <Checkbox onChange={() => this.setState({ checked: !this.state.checked })} text="controlled checkbox" checked={this.state.checked} />
  }
}

class CheckboxExample2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [] };
  }
  render() {
    const options = ['movie', 'book', 'music'];
    return (
      <Checkbox.CheckboxGroup
        value={this.state.value}
        options={options}
        onChange={(value) => {this.setState({ value })}}
      />
    );
  }
}

storiesOf('Checkbox in Lab 实验性选择框', module)
  .add('Basic 基本', () => {
    return (
      <Checkbox text="checkbox" />
    );
  })
  .add('Controlled 受控', () => {
    return (
      <CheckboxExample1 />
    );
  })
  .add('CheckboxGroup 选择框组', () => {
    const options = ['movie', 'book', 'music'];
    return (
      <Checkbox.CheckboxGroup
        options={options}
      />
    );
  })
  .add('Controlled CheckboxGroup 受控选择框组', () => {
    return (
      <CheckboxExample2 />
    );
  })
