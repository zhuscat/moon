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
import Button from '../components/Button';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class FormExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.passwordCheck = this.passwordCheck.bind(this);
  }

  passwordCheck(rule, value, callback, fields) {
    this.props.form.validateFields(['passwordagain']);
    callback('验证密码');
  }

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
              initialValue: 'please enter',
              validates: [
                {
                  rules:[
                    {
                      required: true,
                    },
                  ],

                  trigger: ['onChange'],
                },
              ],
            })}
          />
        </Form.FormItem>
        <Form.FormItem
          label="account"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={this.props.form}
        >
          <Input
            type="text"
            {...this.props.form.getFieldProps('account', {
              validates: [
                {
                  rules: [{
                    type: 'number',
                    message: '必须填写数字',
                  }],
                  trigger: ['onChange'],
                },
              ],
            })}
          />
        </Form.FormItem>
        <Form.FormItem
          label="stringstring"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={this.props.form}
        >
          <Input
            type="text"
            {...this.props.form.getFieldProps('stringstring', {
              validates: [
                {
                  rules: [{
                    type: 'string',
                    min: 1,
                    max: 10,
                  }],
                  trigger: ['onChange'],
                },
              ],
            })}
          />
        </Form.FormItem>
        <Form.FormItem
          label="password"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={this.props.form}
        >
          <Input
            type="password"
            {...this.props.form.getFieldProps('password', {
              validates: [
                {
                  rules: [{
                    required: true,
                    validator: this.passwordCheck,
                    message: '必须要填写密码',
                  }],
                  trigger: ['onChange'],
                },
              ],
            })}
          />
        </Form.FormItem>
        <Form.FormItem
          label="password again"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          form={this.props.form}
        >
          <Input
            type="password"
            {...this.props.form.getFieldProps('passwordagain', {
              initialValue: 'fdfdfd',
              validates: [
                {
                  rules: [{
                    validator: function(rule, value, callback, fields) {
                      callback('email err');
                    },
                    message: '错误',
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
                    type: 'array',
                    message: '最少选1个，最多选2个',
                    min: 1,
                    max: 2,
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
                    type: 'number',
                    min: 2,
                    max: 10,
                    message: '最小2，最大10',
                  }],
                  trigger: ['onChange'],
                },
              ],
            })}
          />
        </Form.FormItem>
        <Button
          onClick={() => {
            console.log(this.props.form.getFieldsNameValue());
          }}
        >
          点击提交
        </Button>
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
