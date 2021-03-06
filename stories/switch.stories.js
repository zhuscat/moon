import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Switch from '../components/switch';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class SwitchExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: false };
  }
  render() {
    const options = ['movie', 'book', 'music'];
    return <Switch
      value={this.state.value}
      onChange={(value) => this.setState({ value })}
    />
  }
}

storiesOf('Switch 开关', module)
  .add('Basic 基本', () => {
    return (
      <Switch />
    );
  })
  .add('ReadOnly 只读', () => {
    return (
      <div>
        <Switch readOnly />
        <br />
        <Switch readOnly defaultValue={true} />
      </div>
    )
  })
  .add('Controlled 受控', () => {
    return (
      <SwitchExample1 />
    );
  })
