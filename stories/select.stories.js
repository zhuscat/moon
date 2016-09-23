import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Select from '../components/select-in-lab';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class SelectExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'movie' };
  }
  render() {
    const options = ['movie', 'book', 'music'];
    return <Select
      value={this.state.value}
      onChange={(value) => this.setState({ value })}
      options={options}
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

storiesOf('Select in Lab 实验性选择框', module)
  .add('Basic 基本', () => {
    const options = ['movie', 'book', 'music'];
    return (
      <Select options={options} />
    );
  })
  .add('Controlled 受控', () => {
    return (
      <SelectExample1 />
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
