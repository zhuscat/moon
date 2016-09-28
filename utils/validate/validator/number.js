import isNumber from '../../number/isNumber';
import rules from '../rule';
import format from '../../format';

// rule is a single rule
export default function number(rule, value, callback, fields, options) {
  const errors = [];
  const v = Number.parseFloat(value);
  if (value === undefined || value === null || value === '' || Number.isNaN(value)) {
    rules.required(rule, value, callback, errors, fields, options);
  } else if (!isNumber(v)) {
    errors.push(options.message.number.default);
  } else {
    if ('min' in rule) {
      if (v < rule.min) {
        errors.push(format(options.message.number.min, rule.fieldName, rule.min));
      }
    }
    if ('max' in rule) {
      if (v > rule.max) {
        errors.push(format(options.message.number.max, rule.fieldName, rule.max));
      }
    }
  }
  callback(errors);
}
