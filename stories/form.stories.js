import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import '../style/base.scss'
import FormItem from '../components/FormItem';
import Input from '../components/Input';
import NumberInput from '../components/NumberInput';
import FormControl from '../components/FormControl';
import Form from '../components/Form';
import Radio from '../components/Radio';
import RadioGroup from '../components/RadioGroup';
import Checkbox from '../components/Checkbox';
import CheckboxGroup from '../components/CheckboxGroup';
import Select from '../components/Select';
import Switch from '../components/Switch';
import { COMPONENTS} from '../components/highorder/FormItem';

storiesOf('Form 表单', module)
  .add('Input 输入框', () => (
    <div>
      <Input placeholder="text" />
      <Input type="number" placeholder="number" />
      <Input type="integer" placeholder="integer" />
      <Input type="password" placeholder="text" />
      <Input value="readOnly" readOnly={true} />
      <Input value="input with initial value" />
    </div>
  ))
  .add('NumberInput 数字输入框', () => (
    <NumberInput step={5} />
  ))
  .add('Radio 单选框', () => (
    <div>
      <Radio text="option A" on={true} value="option A" />
      <Radio text="option B" on={false} value="option B" />
      <Radio text="readonly" on={true} value="option C" readOnly={true} />
      <Radio text="readonly off" on={false} value="option D" readOnly={true} />
    </div>
  ))
  .add('Radio Group 单选框组', () => {
    const data = [
      {text: '南京', value: 'nanjing'},
      {text: '北京', value: 'beijing'},
      { "value": "guangzhou", "text": "广州" },
      { "value": "shenzhen", "text": "深圳" },
      { "value": "chengdu", "text": "成都" },
      { "value": "chongqing", "text": "重庆" },
      { "value": "shanghai", "text": "上海" },
    ];

    const value = 'nanjing';
    return (
      <div>
        <RadioGroup data={data} value={value} />
        <RadioGroup data={data} value={value} readOnly={true} />
      </div>
    );
  })
  .add('Checkbox 多选框', () => {
    return (
      <div>
        <Checkbox text="Check A" value="CheckA" />
        <Checkbox text="Check B" value="CheckB" on={true} />
        <Checkbox text="Check C" value="CheckC" readOnly={true} />
        <Checkbox text="Check D" value="CheckD" on={true} readOnly={true} />
      </div>
    )
  })
  .add('Checkbox Group 多选组', () => {
    const data = [
      {text: '南京', value: 'nanjing'},
      {text: '北京', value: 'beijing'},
      { "value": "guangzhou", "text": "广州" },
      { "value": "shenzhen", "text": "深圳" },
      { "value": "chengdu", "text": "成都" },
      { "value": "chongqing", "text": "重庆" },
      { "value": "shanghai", "text": "上海" },
    ];
    const value = [
      'nanjing',
      'shenzhen',
    ];
    return (
      <div>
        <CheckboxGroup data={data} value={value} />
        <CheckboxGroup data={data} value={value} readOnly={true} />
      </div>
    );
  })
  .add('Select 选择框', () => {
    const data = [
      {text: '南京', value: 'nanjing'},
      {text: '北京', value: 'beijing'},
      {text: '广州', value: 'guangzhou'},
      { "value": "shenzhen", "text": "深圳" },
      { "value": "chengdu", "text": "成都" },
      { "value": "chongqing", "text": "重庆" },
      { "value": "shanghai", "text": "上海" },
    ];

    return (
      <div>
        <Select data={data} value="beijing" />
        <br />
        <Select data={data} value="beijing" readOnly />
      </div>
    )
  })
  .add('Switch 开关', () => {
    return (
      <div>
        <Switch value={false} />
        <br />
        <br />
        <br />
        <Switch value={true} readOnly />
      </div>
    )
  })
  .add('From Control 表单区块', () => {
    return (
      <div>
        <FormControl
          label="text"
          type="text"
          labelCol={{span: 2}}
          wrapperCol={{span: 22}}
        />
        <FormControl
          label="email"
          type="email"
          labelCol={{span: 2}}
          wrapperCol={{span: 22}}
        />
        <FormControl
          label="number"
          type="number"
          labelCol={{span: 2}}
          wrapperCol={{span: 22}}
        />
        <FormControl
          label="integer"
          type="integer"
          labelCol={{span: 2}}
          wrapperCol={{span: 22}}
        />
      </div>
    );
  })
  .add('Form 表单', () => {
    const radioGroupData = [
      {text: '南京', value: 'nanjing'},
      {text: '北京', value: 'beijing'},
      { "value": "guangzhou", "text": "广州" },
      { "value": "shenzhen", "text": "深圳" },
      { "value": "chengdu", "text": "成都" },
      { "value": "chongqing", "text": "重庆" },
      { "value": "shanghai", "text": "上海" },
    ];
    const checkboxData = [
      {text: '南京', value: 'nanjing'},
      {text: '北京', value: 'beijing'},
      { "value": "guangzhou", "text": "广州" },
      { "value": "shenzhen", "text": "深圳" },
      { "value": "chengdu", "text": "成都" },
      { "value": "chongqing", "text": "重庆" },
      { "value": "shanghai", "text": "上海" },
    ];
    return (
      <Form data={{text: 'text', email: 'email', radioboxgroup: 'guangzhou', checkboxgroup: ['nanjing', 'shenzhen']}}>
        <FormControl
          name="text"
          label="text"
          type="text"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          min={2}
          max={10}
          required={true} />
        <FormControl
          name="email"
          label="email"
          type="email"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}>
        </FormControl>
        <FormControl
          name="radioboxgroup"
          label="radio group"
          type="radio-group"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          data={radioGroupData}
          validator={{
            func: (value) => {
              return true;
            }
          }}
        />
        <FormControl
          name="checkboxgroup"
          label="checkbox group"
          type="checkbox-group"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          data={checkboxData}
          min={2}
          max={4}
          validator={{
            func: (value) => {
              return true;
            }
          }}
        />
      </Form>
    )
  })
  .add('Cascade Validate 联动验证', () => {
    const radioGroupData = [
      {text: '南京', value: 'nanjing'},
      {text: '北京', value: 'beijing'},
      { "value": "guangzhou", "text": "广州" },
      { "value": "shenzhen", "text": "深圳" },
      { "value": "chengdu", "text": "成都" },
      { "value": "chongqing", "text": "重庆" },
      { "value": "shanghai", "text": "上海" },
    ];
    const checkboxData = [
      {text: '南京', value: 'nanjing'},
      {text: '北京', value: 'beijing'},
      { "value": "guangzhou", "text": "广州" },
      { "value": "shenzhen", "text": "深圳" },
      { "value": "chengdu", "text": "成都" },
      { "value": "chongqing", "text": "重庆" },
      { "value": "shanghai", "text": "上海" },
    ];
    return (
      <Form data={{email2: 'email2', email: 'email', radioboxgroup: 'guangzhou', checkboxgroup: ['nanjing', 'shenzhen']}}>
        <FormControl
          name="email2"
          label="email2"
          type="email"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          required={true}
        />
        <FormControl
          name="email"
          label="email"
          type="email"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}>
        </FormControl>
        <FormControl
          name="radioboxgroup"
          label="radio group"
          type="radio-group"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          data={radioGroupData}
          validator={{
            func: (value) => {
              return true;
            }
          }}
        />
        <FormControl
          name="checkboxgroup"
          label="checkbox group"
          type="checkbox-group"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          data={checkboxData}
          min={2}
          max={4}
          validator={{
            func: (value) => {
              return true;
            }
          }}
        />
      </Form>
    )
  })
  .add('Example 例子', () => {
    const radioGroupData = [
      {text: '南京', value: 'nanjing'},
      {text: '北京', value: 'beijing'},
      { "value": "guangzhou", "text": "广州" },
      { "value": "shenzhen", "text": "深圳" },
      { "value": "chengdu", "text": "成都" },
      { "value": "chongqing", "text": "重庆" },
      { "value": "shanghai", "text": "上海" },
    ];
    const checkboxData = [
      {text: '电影', value: 'movie'},
      {text: '艺术', value: 'art'},
      {text: '科技', value: 'technology'},
      {text: '读书', value: 'reading'},
      {text: '音乐', value: 'music'},
    ];
    return (
      <Form data={{open: false}}>
        <FormControl
          name="email"
          label="Email"
          type="text"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          required={true}
        />
        <FormControl
          name="username"
          label="Username"
          type="text"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          required
          validator={{
            regex: /^[a-zA-Z0-9_]*$/
          }}
        >
        </FormControl>
        <FormControl
          name="password"
          label="Password"
          type="password"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
        >
        </FormControl>
        <FormControl
          name="passwordagain"
          label="Confrim password"
          type="password"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          validator={{
            func: (value, formData) => {
              const password = formData.password;
              if (value === password) {
                return true;
              } else {
                return new Error('两次密码输入必须一致');
              }
            },
            bind: ['password']
          }}
        >
        </FormControl>
        <FormControl
          name="open"
          label="Open"
          type="switch"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          value={true}
        />
        <FormControl
          name="location"
          label="Location"
          type="radio-group"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          data={radioGroupData}
          validator={{
            func: (value) => {
              return true;
            }
          }}
        />
        <FormControl
          name="interest"
          label="Interest"
          type="checkbox-group"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          data={checkboxData}
          min={1}
          max={4}
          validator={{
            func: (value) => {
              return true;
            }
          }}
        />
      </Form>
    )
  })
  .add('Stacked 堆叠', () => {
    const radioGroupData2 = [
      {text: '南京', value: 'nanjing'},
      {text: '北京', value: 'beijing'},
      { "value": "guangzhou", "text": "广州" },
      { "value": "shenzhen", "text": "深圳" },
      { "value": "chengdu", "text": "成都" },
      { "value": "chongqing", "text": "重庆" },
      { "value": "shanghai", "text": "上海" },
    ];
    const checkboxData2 = [
      {text: '电影', value: 'movie'},
      {text: '艺术', value: 'art'},
      {text: '科技', value: 'technology'},
      {text: '读书', value: 'reading'},
      {text: '音乐', value: 'music'},
    ];
    return (
      <div>
      <Form data={{}} onSubmit={action('data')} layout="stacked">
        <FormControl
          name="email"
          label="Email"
          type="email"
          labelCol={{span: 6}}
          wrapperCol={{span: 24}}
          required={true}
        />
        <FormControl
          name="username"
          label="Username"
          type="text"
          labelCol={{span: 6}}
          wrapperCol={{span: 24}}
          required
          validator={{
            regex: /^[a-zA-Z0-9_]*$/
          }}
        >
        </FormControl>
        <FormControl
          name="password"
          label="Password"
          type="password"
          labelCol={{span: 6}}
          wrapperCol={{span: 24}}
        >
        </FormControl>
        <FormControl
          name="passwordagain"
          label="Confrim password"
          type="password"
          labelCol={{span: 6}}
          wrapperCol={{span: 24}}
          validator={{
            func: (value, formData) => {
              const password = formData.password;
              if (value === password) {
                return true;
              } else {
                return new Error('两次密码输入必须一致');
              }
            },
            bind: ['password']
          }}
        >
        </FormControl>
        <FormControl
          name="location"
          label="Location"
          type="radio-group"
          labelCol={{span: 6}}
          wrapperCol={{span: 24}}
          data={radioGroupData2}
          validator={{
            func: (value) => {
              return true;
            }
          }}
        />
        <FormControl
          name="interest"
          label="Interest"
          type="checkbox-group"
          labelCol={{span: 6}}
          wrapperCol={{span: 24}}
          data={checkboxData2}
          min={1}
          max={4}
          validator={{
            func: (value) => {
              return true;
            }
          }}
        />
      </Form>
      </div>
    )
  })
