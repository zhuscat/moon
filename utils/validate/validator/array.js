import rules from '../rule';

export default function array(rule, value, callback, fields, options) {
  const errors = [];
  rules.required(rule, value, callback, fields, errors, options);
  if (!Array.isArray(value)) {
    errors.push('必须提供一个数组');
  } else {
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
  }
  callback(errors);
}
