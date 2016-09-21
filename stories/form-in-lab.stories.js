import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import createForm from '../components/highorder/Form';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class FormExample1 extends React.Component {
  render() {
    return (
      <input {...this.props.form.getFieldProps('email', {
        validates: [
          {
            rules: [{
              min: 5,
              max: 10,
            }],
            trigger: ['onChange'],
          },
        ],
      })} />
    );
  }
}

const FormRet = createForm()(FormExample1);

storiesOf('Form in Lab 实验性输入框', module)
  .add('Basic 基本', () => {
    return (
      <FormRet />
    );
  })
