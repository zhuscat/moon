import isString from '../../string/isString';

export default function array(rule, value, callback, fields) {
  const errors = [];
  if (!isString(value)) {
    errors.push('必须提供一个字符串');
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
