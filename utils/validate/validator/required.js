import rules from '../rule';


function required(rule, value, callback, fields, options) { // eslint-disable-line no-unused-vars
  const errors = [];
  rules.required(rule, value, callback, errors, fields, options);
  callback(errors);
}

export default required;
