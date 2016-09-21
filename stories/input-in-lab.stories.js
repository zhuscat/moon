import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Input from '../components/input-in-lab';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class InputExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <Input value={this.state.value} onChange={this.onChange} />
    )
  }
}

storiesOf('Input in Lab 实验性输入框', module)
  .add('Input 输入框', () => {
    return (
      <div>
        <Input defaultValue="default value"/>
        <Input readOnly />
      </div>
    );
  })
  .add('Controlled 受控', () => {
    return (
      <InputExample1 />
    )
  })
