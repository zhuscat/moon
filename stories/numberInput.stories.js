import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import NumberInput from '../components/number-input';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class NumberInputExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 2 };
  }
  render() {
    return <NumberInput
      max={10}
      min={1}
      value={this.state.value}
      onChange={(value) => this.setState({ value })}
    />
  }
}
//
// class RadioExample2 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: '' };
//   }
//   render() {
//     const options = ['movie', 'book', 'music'];
//     return (
//       <Radio.RadioGroup
//         value={this.state.value}
//         options={options}
//         onChange={(value) => {this.setState({ value })}}
//       />
//     );
//   }
// }

storiesOf('NumberInput 数字输入框', module)
  .add('Basic 基本', () => {
    return (
      <NumberInput max={10} min={1} defaultValue={2} />
    );
  })
  .add('Controlled 受控', () => {
    return (
      <NumberInputExample1 />
    );
  })
  // .add('CheckboxGroup 单选框组', () => {
  //   const options = ['movie', 'book', 'music'];
  //   return (
  //     <Radio.RadioGroup
  //       options={options}
  //     />
  //   );
  // })
  // .add('Controlled CheckboxGroup 受控单选框组', () => {
  //   return (
  //     <RadioExample2 />
  //   );
  // })
