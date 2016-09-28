import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DatePicker from '../components/datepicker';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class DatePickerExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: new Date() };
  }
  render() {
    return <DatePicker
      onChange={(value) => {
        this.setState({ value });
      }}
      value={this.state.value}
    />
  }
}
//
// class CheckboxExample2 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: [] };
//   }
//   render() {
//     const options = ['movie', 'book', 'music'];
//     return (
//       <Checkbox.CheckboxGroup
//         value={this.state.value}
//         options={options}
//         onChange={(value) => {this.setState({ value })}}
//       />
//     );
//   }
// }

storiesOf('DatePicker in Lab 日期选择器', module)
  .add('Basic 基本', () => {
    return (
      <DatePicker />
    );
  })
  .add('ReadOnly 只读', () => {
    return (
      <DatePicker readOnly />
    );
  })
  .add('Controlled 受控', () => {
    return (
      <DatePickerExample1 />
    );
  })
  // .add('CheckboxGroup 选择框组', () => {
  //   const options = ['movie', 'book', 'music'];
  //   return (
  //     <Checkbox.CheckboxGroup
  //       options={options}
  //     />
  //   );
  // })
  // .add('Controlled CheckboxGroup 受控选择框组', () => {
  //   return (
  //     <CheckboxExample2 />
  //   );
  // })
