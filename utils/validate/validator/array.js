import rules from '../rule';
import format from '../../format';

export default function array(rule, value, callback, fields, options) {
  const errors = [];
  rules.required(rule, value, callback, errors, fields, options);
  if (!Array.isArray(value)) {
    errors.push(options.message.array.default);
  } else {
    if ('min' in rule) {
      if (value.length < rule.min) {
        errors.push(format(options.message.array.min, rule.fieldName, rule.min));
      }
    }
    if ('max' in rule) {
      if (value.length > rule.max) {
        errors.push(format(options.message.array.max, rule.fieldName, rule.max));
      }
    }
  }
  callback(errors);
}
