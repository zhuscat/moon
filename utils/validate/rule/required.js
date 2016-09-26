import isEmptyArray from '../../array/isEmptyArray';
import isEmptyString from '../../string/isEmptyString';
import format from '../../format';

function required(rule, value, callback, errors, fields, options) {
  const isRequired = rule.required;
  const isEmptyValue = value === undefined ||
    value === null ||
    isEmptyArray(value) ||
    isEmptyString(value);
  if (isRequired && isEmptyValue) {
    errors.push(format(options.message.required, rule.displayName || rule.fieldName));
  }
}

export default required;
