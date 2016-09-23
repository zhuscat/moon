import React, { Component, PropTypes } from 'react';
import formValidate from './FormValidate';
import mustArray from '../../utils/array/mustArray';

const DEFAUTL_VALUE_PROP_NAME = 'value';
const DEFAULT_VALIDATE_TRIGGER = 'onChange';

function getValueFromEvent(event) {
  if (!event || !event.target) {
    return event;
  }
  return event.target.value;
}

function createForm(options = {}) {
  function decorate(WrappedComponent) {
    class Form extends Component {
      constructor(props) {
        super(props);
        this.getFieldProps = this.getFieldProps.bind(this);
        this.setFields = this.setFields.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getFieldMeta = this.getFieldMeta.bind(this);
        this.getActionCache = this.getActionCache.bind(this);
        this.getFieldErrors = this.getFieldErrors.bind(this);
        this.getFieldsNameValue = this.getFieldsNameValue.bind(this);
        this.fieldsMeta = {};
        this.fields = {};
        this.actionCache = {};
        this.state = { isSubmitting: false };
      }

      getValidFieldsName() {
        const { fieldsMeta } = this;
        return Object.keys(fieldsMeta).filter(key => !fieldsMeta[key].hidden);
      }

      getFieldValue(name) {
        const meta = this.getFieldMeta(name);
        const field = this.getField(name);
        let fieldValue;
        if ('value' in field) {
          fieldValue = field.value;
        }
        if (fieldValue === null || fieldValue === undefined) {
          fieldValue = meta.initialValue;
        }
        return {
          value: fieldValue,
        };
      }

      getFieldsNameValue() {
        const fieldsName = this.getValidFieldsName();
        const nameValueObj = {};
        fieldsName.forEach(name => {
          nameValueObj[name] = this.getFieldValue(name).value;
        });
        return nameValueObj;
      }

      getField(name) {
        return Object.assign({}, { name }, this.fields[name]);
      }

      setFields(fields) {
        const newFields = Object.assign({}, this.fields, fields);
        this.fields = newFields;
      }

      getFieldErrors(name) {
        const field = this.getField(name);
        return field.errors || [];
      }

      getFieldMeta(name) {
        return this.fieldsMeta[name];
      }

      getFieldProps(name, options = {}) {
        let {
          validates,
        } = options;
        const {
          valuePropName,
          initialValue,
        } = options;
        validates = mustArray(validates);
        console.log(name, validates);
        const meta = {};
        meta.valuePropName = valuePropName || DEFAUTL_VALUE_PROP_NAME;
        meta.validates = validates;
        meta.initialValue = initialValue;
        this.fieldsMeta[name] = meta;
        let inputProps = {};
        validates.forEach(vali => {
          const trigger = vali.trigger || [DEFAULT_VALIDATE_TRIGGER];
          trigger.forEach(eventType => {
            inputProps[eventType] = this.getActionCache(name, eventType, this.handleValidateChange);
          });
        });
        if (!('onChange' in inputProps)) {
          inputProps.onChange = this.getActionCache(name, 'onChange', this.handleChange);
        }
        inputProps = Object.assign({}, inputProps, this.getFieldValue(name));
        return Object.assign({}, { name }, inputProps);
      }

      // 对进行绑定过的函数进行缓存
      getActionCache(name, eventType, fn) {
        const cache = this.actionCache[name] = this.actionCache[name] || {};
        if (!cache[eventType]) {
          cache[eventType] = fn.bind(this, name, eventType);
        }
        return cache[eventType];
      }

      handleChange(name, eventType, event) {
        const value = getValueFromEvent(event);
        this.setFields({
          [name]: {
            value,
          },
        });
        this.forceUpdate();
      }

      handleValidateChange(name, eventType, event) {
        const fieldMeta = this.getFieldMeta(name);
        const value = getValueFromEvent(event);
        // need to improve
        const field = this.fields[name] = this.fields[name] || {};
        let errors = [];
        const validates = fieldMeta.validates;
        validates.forEach(vali => {
          if (vali.trigger.includes(eventType)) {
            // start validating
            // get rules
            const rules = vali.rules;
            errors = errors.concat(formValidate(value, rules));
            // rules.forEach(rule => {
            //   if ('min' in rule) {
            //     if (value.length < rule.min) {
            //       errors.push('太小了');
            //     }
            //   }
            //   if ('max' in rule) {
            //     if (value.length > rule.max) {
            //       errors.push('太大了');
            //     }
            //   }
            // });
          }
        });
        field.errors = errors;
        field.value = value;
        this.setFields({
          [name]: field,
        });
        this.forceUpdate();
      }

      render() {
        const formProps = {
          getFieldProps: this.getFieldProps,
          getFieldErrors: this.getFieldErrors,
          getFieldsNameValue: this.getFieldsNameValue,
        };
        return <WrappedComponent form={formProps} />;
      }
    }
    return Form;
  }
  return decorate;
}

export default createForm;
