import isNumber from '../../number/isNumber';
import rules from '../rule';

// rule is a single rule
export default function number(rule, value, callback, fields, options) {
  const errors = [];
  rules.required(rule, value, callback, fields, errors, options);
  const v = Number.parseFloat(value);
  if (!isNumber(v)) {
    errors.push('你需要提供一个数字');
  } else {
    if ('min' in rule) {
      if (v < rule.min) {
        errors.push('太小');
      }
    }
    if ('max' in rule) {
      if (v > rule.max) {
        errors.push('太大');
      }
    }
  }
  callback(errors);
}
