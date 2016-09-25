import React, { Component, PropTypes } from 'react';
import Validator from '../../utils/validate';
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
        this.getFieldValue = this.getFieldValue.bind(this);
        this.fieldsMeta = {};
        this.fields = {};
        this.actionCache = {};
        this.validateFields = this.validateFields.bind(this);
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
        this.forceUpdate();
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

      validateFields(names) {
        const descriptor = {};
        names.forEach((name) => {
          const meta = this.getFieldMeta(name);
          meta.validates.forEach(vali => {
            descriptor[name] = vali.rules;
          });
          // const value = this.getFieldValue(name).value;
          // let errors = [];
          // meta.validates.forEach(vali => {
          //   errors = errors.concat(formValidate(value, vali.rules));
          // });
          // const field = this.getField(name);
          // field.errors = errors;
          // this.setFields({
          //   [name]: field,
          // });
        });
        const fieldsNameValue = this.getFieldsNameValue();
        const validator = new Validator(descriptor);
        validator.validate(fieldsNameValue, (errors, fields) => {
          if (!errors) {
            names.forEach((name) => {
              const newField = this.getField(name);
              newField.errors = [];
              this.setFields({
                [name]: newField,
              });
            });
          } else {
            Object.keys(fields).forEach(fieldName => {
              const newField = this.getField(fieldName);
              const formatableErrors = fields[fieldName].map(e => {
                return e.message;
              });
              newField.errors = formatableErrors;
              this.setFields({
                [fieldName]: newField,
              });
            });
          }
        });
      }

      handleChange(name, eventType, event) {
        const value = getValueFromEvent(event);
        this.setFields({
          [name]: {
            value,
          },
        });
      }

      handleValidateChange(name, eventType, event) {
        const value = getValueFromEvent(event);
        // need to improve
        const field = this.fields[name] = this.fields[name] || {};
        field.value = value;
        this.setFields({
          [name]: field,
        });
        // validates.forEach(vali => {
        //   if (vali.trigger.includes(eventType)) {
        //     const rules = vali.rules;
        //     errors = errors.concat(formValidate(value, rules));
        //   }
        // });
        // field.errors = errors;
        this.validateFields([name]);
      }

      render() {
        const formProps = {
          getFieldProps: this.getFieldProps,
          getFieldErrors: this.getFieldErrors,
          getFieldsNameValue: this.getFieldsNameValue,
          getFieldValue: this.getFieldValue,
          validateFields: this.validateFields,
        };
        return <WrappedComponent form={formProps} />;
      }
    }
    return Form;
  }
  return decorate;
}

export default createForm;
