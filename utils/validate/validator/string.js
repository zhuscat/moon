import isString from '../../string/isString';
import rules from '../rule';
import format from '../../format';

/**
 * The logic is when the value is '', null, undefined, then show required
 * If not a string provided, show need a string.
 * If the string is provided, then you can just test it.
 */
export default function string(rule, value, callback, fields, options) {
  const errors = [];
  if (value === undefined || value === null || value === '') {
    rules.required(rule, value, callback, errors, fields, options);
  } else if (!isString(value)) {
    errors.push(options.message.default);
  } else {
    if ('min' in rule) {
      if (value.length < rule.min) {
        errors.push(format(options.message.string.min, rule.fieldName, rule.min));
      }
    }
    if ('max' in rule) {
      if (value.length > rule.max) {
        errors.push(format(options.message.string.max, rule.fieldName, rule.max));
      }
    }
  }
  callback(errors);
}
