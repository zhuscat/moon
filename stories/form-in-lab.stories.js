import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import createForm from '../components/highorder/Form';
import Form from '../components/form-in-lab';
import Input from '../components/input-in-lab';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class FormExample1 extends React.Component {
  render() {
    return (
      <div>
        <Form.FormItem
          label="email"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={this.props.form}
        >
          <Input
            {...this.props.form.getFieldProps('email', {
              validates: [
                {
                  rules: [{
                    min: 5,
                    max: 10,
                  }],
                  trigger: ['onChange'],
                },
              ],
            })}
          />
        </Form.FormItem>
        <button
          type="button"
          onClick={() => {
            console.log(this.props.form.getFieldsNameValue());
          }}
        >点击提交</button>
      </div>
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
