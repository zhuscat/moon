import mustArray from '../array/mustArray';
import isEmptyArray from '../array/isEmptyArray';
import isEmptyString from '../string/isEmptyString';
import isNumber from '../number/isNumber';
import isString from '../string/isString';
import defaultValidator from './validator';
import { noop } from '../../utils/default';
import message from './message';

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

function flattenSeries(series) {
  const ret = [];
  Object.keys(series).forEach(k => {
    ret.push(...series[k]);
  });
  return ret;
}

function asyncEvery(arr, func, callback) {
  const results = [];
  let total = 0;
  const arrLen = arr.length;
  const count = errors => {
    results.push(...errors);
    total += 1;
    if (total === arrLen) {
      callback(results);
    }
  };
  arr.forEach(a => {
    func(a, count);
  });
}

function asyncOneError(arr, func, callback) {
  let index = 0;
  const arrLen = arr.length;
  const next = errors => {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    const prev = index;
    index += 1;
    if (prev < arrLen) {
      func(arr[prev], next);
    } else {
      callback([]);
    }
  };
  next([]);
}
/**
 * series: {name: }
 *
 */
function asyncPool(series, func, callback, options) {
  // 验证直到出现第一个错误
  if (options.first) {
    const fseries = flattenSeries;
    asyncOneError(fseries, func, callback);
    return;
  }
  const keys = Object.keys(series);
  const seriesLen = keys.length;
  let total = 0;
  const results = [];
  const next = (errors) => {
    results.push(...errors);
    total += 1;
    if (total === seriesLen) {
      callback(results);
    }
  };
  // 验证到每一个字段出现的第一个错误
  if (options.firstField) {
    keys.forEach(key => {
      const arr = series[key];
      asyncOneError(arr, func, next);
    });
  } else {
    keys.forEach(key => {
      const arr = series[key];
      asyncEvery(arr, func, next);
    });
  }
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


  const fields = fields_;
  const keys = Object.keys(this.rules);
  const options = options_;
  options.message = this.message;
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

  asyncPool(series, (data, doIt) => {
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
  }, results => {
    complete(results);
  }, options);
};

export default Validator;
