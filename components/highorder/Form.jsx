import React, { Component, PropTypes } from 'react';

function getValueFromEvent(event) {
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
        this.fieldsMeta = {};
        this.fields = {};
        this.actionCache = {};
      }

      setFields(fields) {
        const newFields = Object.assign({}, this.fields, fields);
        this.fields = newFields;
      }

      getFieldMeta(name) {
        return this.fieldsMeta[name];
      }

      getFieldProps(name, options = {}) {
        const {
          validates,
          // rules,
          // trigger,
          // initialValue,
        } = options;
        const meta = {};
        meta.validates = validates;
        this.fieldsMeta[name] = meta;
        const inputProps = {};
        validates.forEach(vali => {
          const trigger = vali.trigger || ['onChange'];
          trigger.forEach(eventType => {
            inputProps[eventType] = this.getActionCache(name, eventType, this.handleValidateChange);
          });
        });
        if (!('onChange' in inputProps)) {
          inputProps.onChange = this.getActionCache(name, 'onChange', this.handleChange);
        }
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
      }

      handleValidateChange(name, eventType, event) {
        const fieldMeta = this.getFieldMeta(name);
        const value = getValueFromEvent(event);
        // need to improve
        const field = this.fields[name] = this.fields[name] || {};
        const errors = [];
        const validates = fieldMeta.validates;
        validates.forEach(vali => {
          if (vali.trigger.includes(eventType)) {
            // start validating
            // get rules
            const rules = vali.rules;
            rules.forEach(rule => {
              if ('min' in rule) {
                if (value.length < rule.min) {
                  errors.push('太小了');
                }
              }
              if ('max' in rule) {
                if (value.length > rule.max) {
                  errors.push('太大了');
                }
              }
            });
          }
        });
        field.errors = errors;
        console.log(errors);
        this.setFields({
          [name]: {
            value,
          },
        });
      }

      render() {
        const formProps = {
          getFieldProps: this.getFieldProps,
        };
        return <WrappedComponent form={formProps} />;
      }
    }
    return Form;
  }
  return decorate;
}

export default createForm;
