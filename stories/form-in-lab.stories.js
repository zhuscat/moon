import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import createForm from '../components/highorder/Form';
import Form from '../components/form-in-lab';
import Input from '../components/input-in-lab';
import Checkbox from '../components/checkbox-in-lab';
import Radio from '../components/radio-in-lab';
import Select from '../components/select-in-lab';
import Switch from '../components/switch-in-lab';
import NumberInput from '../components/number-input-in-lab';
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
        <Form.FormItem
          label="checkbox group"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={this.props.form}
        >
          <Checkbox.CheckboxGroup
            {...this.props.form.getFieldProps('checkboxgroup', {
              initialValue: ['movie'],
              validates: [
                {
                  rules: [{
                    min: 5,
                    maxi: 10,
                  }],
                  trigger: ['onChange'],
                },
              ],
            })}
            options={['movie', 'book', 'music']}
          />
        </Form.FormItem>
        <Form.FormItem
          label="radio group"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={this.props.form}
        >
          <Radio.RadioGroup
            {...this.props.form.getFieldProps('radiogroup', {
              initialValue: 'movie',
              validates: [
                {
                  rules: [{
                    min: 5,
                    maxi: 10,
                  }],
                  trigger: ['onChange'],
                },
              ],
            })}
            options={['movie', 'book', 'music']}
          />
        </Form.FormItem>
        <Form.FormItem
          label="select"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={this.props.form}
        >
          <Select
            {...this.props.form.getFieldProps('select', {
              initialValue: 'movie',
              validates: [
                {
                  rules: [{
                    min: 5,
                    maxi: 10,
                  }],
                  trigger: ['onChange'],
                },
              ],
            })}
            options={['movie', 'book', 'music']}
          />
        </Form.FormItem>
        <Form.FormItem
          label="select"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={this.props.form}
        >
          <Switch
            {...this.props.form.getFieldProps('switch', {
              initialValue: false,
              validates: [
                {
                  rules: [{
                    min: 5,
                    maxi: 10,
                  }],
                  trigger: ['onChange'],
                },
              ],
            })}
          />
        </Form.FormItem>
        <Form.FormItem
          label="select"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={this.props.form}
        >
          <NumberInput
            {...this.props.form.getFieldProps('numberInput', {
              initialValue: 2,
              validates: [
                {
                  rules: [{
                    min: 5,
                    maxi: 10,
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
