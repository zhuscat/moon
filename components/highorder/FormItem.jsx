import React, { Component, PropTypes } from 'react';

const regs = {
  email: /\S+@\S+\.\S+/,
};

function getValue(props) {
  const { formData, name } = props;
  let { value } = props;
  if (formData && formData[name] !== undefined) {
    value = formData[name];
  }
  return value;
}

const COMPONENTS = {};

const wrap = (WrappedComponent) => {
  const propTypes = {
    value: PropTypes.any,
    type: PropTypes.string,
    onValidate: PropTypes.func,
    itemChange: PropTypes.func,
    itemBind: PropTypes.func,
    itemUnbind: PropTypes.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    validator: PropTypes.object,
    min: PropTypes.number,
    max: PropTypes.number,
    formData: PropTypes.object,
    name: PropTypes.string,
  };

  class FormItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        value: getValue(props),
      };
      this.handleChange = this.handleChange.bind(this);
      this.bindToForm = this.bindToForm.bind(this);
    }

    componentWillMount() {
      const value = getValue(this.props);
      this.bindToForm(this.props, value);
    }

    componentWillReceiveProps(nextProps) {
      const { name } = nextProps;
      console.log('form item receive props', nextProps);
      // 解除绑定，正确逻辑：当发现 name 不同的时候解除绑定
      if (this.props.itemUnbind && this.props.name !== name) {
        this.props.itemUnbind(this.props.name);
        this.bindToForm(nextProps, getValue(nextProps));
      }
      this.setState({ value: getValue(nextProps) });
    }

    componentWillUnmount() {
      if (this.props.itemUnbind) {
        this.props.itemUnbind(this.props.name);
      }
    }

    bindToForm(props, value) {
      const { name, validator, itemBind } = this.props;
      if (itemBind) {
        itemBind({
          name,
          value,
          validate: this.validate.bind(this),
          validateBinds: validator ? validator.bind : [],
        });
      }
    }

    // 后续将该函数进行转移
    dataValidate(value, valueType, {
      required,
      min,
      max,
      readOnly,
      validator,
      type,
      formData,
    }) {
      let len = 0;
      if (readOnly) {
        return true;
      }
      if (required && (value === null || value === undefined || value.length === 0)) {
        return new Error('该字段为必填字段');
      }
      // type 是类似于 email url 这些的
      // valueType 是类似于 number integer 这类数据类型的
      switch (type) {
        case 'email':
          if (!regs.email.test(value)) {
            return new Error('这不是一个有效的邮箱');
          }
          break;
        default:
          break;
      }
      switch (valueType) {
        case 'array':
          len = value.length;
          break;
        case 'number':
          len = value;
          break;
        case 'string':
          len = value.length;
          break;
        default:
          len = 0;
      }

      if (min && min > len) {
        return new Error(`应该比${min}大`);
      }
      if (max && max < len) {
        return new Error(`应该比${max}小`);
      }
      if (validator && validator.regex) {
        if (!validator.regex.test(value)) {
          return new Error('正则表达式验证不通过');
        }
      }
      if (validator && validator.func) {
        return validator.func(value, formData);
      }
      return true;
    }

    // validate 实现数据的验证
    validate(value = this.state.value) {
      const result = this.dataValidate(value, 'string', this.props);
      if (this.props.onValidate) {
        this.props.onValidate(result);
      }
      return result;
    }

    handleChange(value) {
      console.log('change handled in form item');
      console.log(value);
      this.setState({ value }, () => {
        this.validate(value);
        if (this.props.itemChange) {
          this.props.itemChange(value);
        }
      });
    }

    render() {
      const { value } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          value={value}
          onChange={this.handleChange}
        />);
    }
  }

  FormItem.propTypes = propTypes;

  return FormItem;
};

const register = (WrappedComponent, types = []) => {
  const newComponent = wrap(WrappedComponent);
  let render;

  types.forEach(type => {
    if ({}.hasOwnProperty.call(COMPONENTS, type)) {
      console.warn(`type ${type} already exists.`);
      return;
    }
    render = (props) => React.createElement(newComponent, props);
    COMPONENTS[type] = { render, component: newComponent };
  });

  return newComponent;
};

export { COMPONENTS, wrap, register };
