// learn from https://github.com/yiminghe/async-validator
import defaultValidator from './validator';
import { noop } from '../../utils/default';
import message from './message';
import asyncPool from './async';

function enhanceError(rule) {
  return (error_) => {
    const error = error_;
    if (error && error.message) {
      error.fieldName = rule.fieldName;
      return error;
    }
    return {
      message: error,
      fieldName: rule.fieldName,
    };
  };
}

function getType(rule) {
  if (rule.type) {
    return rule.type;
  }
  return 'string';
}

function getValidator(rule) {
  const type = getType(rule);
  if (rule.validator) {
    return rule.validator;
  } else if (rule.required && Object.keys(rule).length === 1) {
    return defaultValidator.required;
  } else if (type) {
    return defaultValidator[type];
  }
  return null;
}

const Validator = function Validator(descriptor) {
  this.rules = null;
  this.parse(descriptor);
  this.message = message;
};

Validator.prototype.parse = function parse(descriptor) {
  if (!descriptor || typeof descriptor !== 'object' || Array.isArray(descriptor)) {
    throw new Error('Please provide correct parameter `descriptor`');
  }
  this.rules = {};
  Object.keys(descriptor).forEach(fieldName => {
    const r = descriptor[fieldName];
    this.rules[fieldName] = Array.isArray(r) ? r : [r];
  });
};

/**
 * The callback will call when all the errors needed if ready.
 *
 */
Validator.prototype.validate = function validate(fields_, callback = noop, options_ = {}) {
  /**
   * `complete` will be called
   * after validating done.
   *
   */
  const complete = results => {
    const fields = {};
    const errors = [];
    for (let i = 0; i < results.length; i++) {
      errors.push(results[i]);
    }
    if (!errors.length) {
      callback(null, null);
    } else {
      for (let i = 0; i < errors.length; i++) {
        const fieldName = errors[i].fieldName;
        fields[fieldName] = fields[fieldName] || [];
        fields[fieldName].push(errors[i]);
      }
    }
    callback(errors, fields);
  };

  // 数据初始化
  const fields = fields_;
  const keys = Object.keys(this.rules);
  const options = options_;
  options.message = this.message;
  // no rules
  if (!this.rules || keys.length === 0) {
    callback();
    return;
  }

  const series = {};
  keys.forEach(fieldName => {
    const arr = this.rules[fieldName];
    const value = fields[fieldName];
    arr.forEach(r => {
      const rule = r;
      rule.validator = getValidator(rule);
      rule.fieldName = fieldName;
      // no validator
      if (!rule.validator) {
        return;
      }
      series[fieldName] = series[fieldName] || [];
      series[fieldName].push({
        rule,
        value,
        fields,
        fieldName,
      });
    });
  });

  const func = (data, doIt) => {
    const rule = data.rule;
    /*
     * the callback called by validator
     *
    */
    const cb = (errors_ = []) => {
      let errors = errors_;
      if (!Array.isArray(errors)) {
        errors = [errors];
      }
      if (errors.length && rule.message) {
        errors = [].concat(rule.message);
      }
      errors = errors.map(enhanceError(rule));
      doIt(errors);
    };
    rule.validator(rule, data.value, cb, data.fields, options);
  };

  asyncPool(series, func, complete, options);
};

export default Validator;
