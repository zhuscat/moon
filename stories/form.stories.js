import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import createForm from '../components/highorder/Form';
import Form from '../components/form';
import Input from '../components/input';
import Checkbox from '../components/checkbox';
import Radio from '../components/radio';
import Select from '../components/select';
import Switch from '../components/switch';
import NumberInput from '../components/number-input';
import Button from '../components/Button';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

class FormExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.passwordCheck = this.passwordCheck.bind(this);
  }

  passwordCheck(rule, value, callback, fields) {
    this.props.form.validateFields({ names: ['passwordagain'] });
    if (value.length > 5 && value.length < 20) {
      callback([]);
    } else {
      callback('密码长度大于5小于20');
    }
  }

  render() {
    return (
      <Form>
        <Form.FormItem
          label="email"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
        >
          <Input
            {...this.props.form.getFieldProps('email', {
              displayName: '邮箱',
              initialValue: 'please enter',
              validates: [
                {
                  rules:[
                    {
                      required: true,
                    },
                    {
                      validator: (rule, value, callback, fields) => {
                        setTimeout(() => {
                          callback([]);
                        }, 1000);
                      },
                    }
                  ],

                  trigger: ['onChange', 'onBlur'],
                },
              ],
            })}
          />
        </Form.FormItem>
        <Form.FormItem
          label="account"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
        >
          <Input
            type="text"
            {...this.props.form.getFieldProps('account', {
              validates: [
                {
                  rules: [{
                    type: 'number',
                    required: true,
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
        >
          <Input
            type="text"
            {...this.props.form.getFieldProps('stringstring', {
              validates: [
                {
                  rules: [{
                    type: 'string',
                    required: true,
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
        >
          <Input
            type="password"
            {...this.props.form.getFieldProps('password', {
              validates: [
                {
                  rules: [{
                    required: true,
                    validator: this.passwordCheck,
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
        >
          <Input
            type="password"
            {...this.props.form.getFieldProps('passwordagain', {
              initialValue: 'fdfdfd',
              validates: [
                {
                  rules: [{
                    validator: function(rule, value, callback, fields) {
                      console.log('fields', fields);
                      if (fields.password === value) {
                        callback([]);
                      } else {
                        callback('两次输入密码不同')
                      }
                    },
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
        >
          <Checkbox.CheckboxGroup
            {...this.props.form.getFieldProps('checkboxgroup', {
              initialValue: ['movie'],
              validates: [
                {
                  rules: [{
                    type: 'array',
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
            this.props.form.submit((func) => {
              this.props.form.validateFields({
                callback: (errors, fields) => {
                  if (!errors || errors.length === 0) {
                    setTimeout(() => {
                      func();
                      console.log('表单已经发送');
                      console.log(this.props.form.getFieldsNameValue());
                    }, 1000);
                  } else {
                    console.log('验证不通过, 请重新填写表单');
                  }
                }
              });
            });
          }}
        >
          点击提交
        </Button>
      </Form>
    );
  }
}

const FormRet = Form.create()(FormExample1);

storiesOf('Form 表单', module)
  .add('Basic 基本', () => {
    return (
      <FormRet />
    );
  })
