import mustArray from '../../utils/array/mustArray';
import isEmptyArray from '../../utils/array/isEmptyArray';
import isEmptyString from '../../utils/string/isEmptyString';
import isNumber from '../../utils/number/isNumber';
import isString from '../../utils/string/isString';
import { noop } from '../../utils/default';

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
  if (options.first) {
    const fseries = flattenSeries;
    return asyncOneError(fseries, func, callback);
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
  keys.forEach(key => {
    const arr = series[key];
    asyncEvery(arr, func, next);
  });
}

const Validator = function Validator(descriptor) {
  this.rules = null;
  this.parse(descriptor);
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
Validator.prototype.validate = function validate(fields_, callback = noop, options = {}) {
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
  const { first } = options;
  if (!this.rules || keys.length === 0) {
    callback();
    return;
  }
  const series = {};
  keys.forEach(fieldName => {
    const arr = this.rules[fieldName];
    const value = fields[fieldName];
    arr.forEach(r => {
      // TODO: getValidator but now just don't do anything
      if (!r.validator) {
        return;
      }
      series[fieldName] = series[fieldName] || [];
      series[fieldName].push({
        rule: r,
        value,
        fields,
        fieldName,
      });
    });
  });
  asyncPool(series, (data, count) => {
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

      errors = errors.map(e => {
        return {
          message: e,
          fieldName: data.fieldName,
        };
      });
      count(errors);
    };
    rule.validator(rule, data.value, cb, data.fields);
  }, results => {
    complete(results);
  }, options);
};

export default Validator;
