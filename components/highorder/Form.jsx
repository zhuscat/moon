import React, { Component } from 'react';
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

// 暂时没有在 options 里面设置东西
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
        this.getField = this.getField.bind(this);
        this.validateFields = this.validateFields.bind(this);
        this.isFieldValidating = this.isFieldValidating.bind(this);
        this.isSubmitting = this.isSubmitting.bind(this);
        this.submit = this.submit.bind(this);
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
        // 直接覆盖同名 field
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

      getFieldProps(name, options_ = {}) {
        let {
          validates,
        } = options_;
        const {
          valuePropName,
          initialValue,
          displayName,
        } = options_;
        // validates 一定是一个数组
        validates = mustArray(validates);
        const meta = {};
        meta.valuePropName = valuePropName || DEFAUTL_VALUE_PROP_NAME;
        meta.validates = validates;
        meta.initialValue = initialValue;
        meta.displayName = displayName;
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

      isFieldValidating(name) {
        const field = this.getField(name);
        if (field.validating) {
          return true;
        }
        return false;
      }

      validateFields({ names, callback }) {
        names = names || this.getValidFieldsName(); // eslint-disable-line no-param-reassign
        const descriptor = {};
        const nameValues = this.getFieldsNameValue();
        const newFields = {};
        names.forEach((name) => {
          const field = this.getField(name);
          const meta = this.getFieldMeta(name);
          const newField = Object.assign({}, field);
          if (meta.validates && meta.validates.length !== 0) {
            newField.validated = true;
            newField.validating = true;
          }
          newField.value = this.getFieldValue(name).value;
          newFields[name] = newField;
        });
        this.setFields(newFields);
        names.forEach((name) => {
          const meta = this.getFieldMeta(name);
          meta.validates.forEach(vali => {
            const rules = vali.rules.map(rule_ => {
              const rule = Object.assign({}, rule_);
              const displayName = rule.displayName || meta.displayName || name;
              rule.displayName = displayName;
              return rule;
            });
            descriptor[name] = rules;
          });
        });
        const fieldsNameValue = this.getFieldsNameValue();
        const validator = new Validator(descriptor);
        validator.validate(fieldsNameValue, (errors, fields) => {
          // TODO: 这里需要合并相关逻辑，进行优化
          names.forEach((name) => {
            const newField = this.getField(name);
            if (newField.value !== nameValues[name]) {
              return;
            }
            newField.validating = false;
            this.setFields({
              [name]: newField,
            });
          })
          if (!errors) {
            names.forEach((name) => {
              const newField = this.getField(name);
              if (newField.value !== nameValues[name]) {
                return;
              }
              newField.validating = false;
              newField.errors = [];
              this.setFields({
                [name]: newField,
              });
            });
          } else {
            Object.keys(fields).forEach(fieldName => {
              const newField = this.getField(fieldName);
              if (newField.value !== nameValues[fieldName]) {
                return;
              }
              const formatableErrors = fields[fieldName].map(e => e.message);
              newField.validating = false;
              newField.errors = formatableErrors;
              this.setFields({
                [fieldName]: newField,
              });
            });
          }
          if (callback) {
            callback(errors, fields);
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
        const field = this.fields[name] = this.fields[name] || {};
        field.value = value;
        this.setFields({
          [name]: field,
        });
        this.validateFields({ names: [name] });
      }

      isSubmitting() {
        return this.state.isSubmitting;
      }

      submit(callback) {
        const fn = () => {
          this.setState({ isSubmitting: false });
        };
        this.setState({ isSubmitting: true });
        callback(fn);
      }

      render() {
        const formProps = {
          getFieldProps: this.getFieldProps,
          getFieldErrors: this.getFieldErrors,
          getFieldsNameValue: this.getFieldsNameValue,
          getFieldValue: this.getFieldValue,
          getField: this.getField,
          validateFields: this.validateFields,
          isFieldValidating: this.isFieldValidating,
          isSubmitting: this.isSubmitting,
          submit: this.submit,
        };
        return <WrappedComponent form={formProps} />;
      }
    }
    return Form;
  }
  return decorate;
}

export default createForm;
