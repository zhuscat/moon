import mustArray from '../../utils/array/mustArray';
import isEmptyArray from '../../utils/array/isEmptyArray';
import isEmptyString from '../../utils/string/isEmptyString';
import isNumber from '../../utils/number/isNumber';
import isString from '../../utils/string/isString';
import { noop } from '../../utils/default';
import DEFAULT_LOCALE from '../../locale/zh_CN/FormValidate';

const REGEXPS = {
  email: /\S+@\S+\.\S+/,
};

/**
 * Validate the value based on the rules provided
 *
 */

/*
  rule:
  min,
  max,
  required,
  regex,
  func,
  type,
  message
*/
export default function formValidate(value, rules = [], callback = noop, locale = DEFAULT_LOCALE) {
  const rs = mustArray(rules);
  const errors = [];
  rs.forEach(r => {
    if (r.required) {
      if (value === null || value === undefined || isEmptyArray(value) || isEmptyString(value)) {
        if (!r.message) {
          errors.push(locale.required);
        } else {
          errors.push(r.message);
        }
      }
    }
    if (r.type) {
      const keys = Object.keys(REGEXPS);
      const idx = keys.indexOf(r.type);
      if (idx !== -1) {
        if (!REGEXPS[keys[idx]].test(value)) {
          if (!r.message) {
            errors.push(locale[`${r.type}Error`]);
          } else {
            errors.push(r.message);
          }
        }
      }
    }
    if ('min' in r) {
      if (isNumber(value)) {
        if (value < r.min) {
          if (!r.message) {
            errors.push(locale.numberMinError);
          } else {
            errors.push(r.message);
          }
        }
      } else if (isString(value) && value.length < r.min) {
        if (!r.message) {
          errors.push(locale.stringMinError);
        } else {
          errors.push(r.message);
        }
      } else if (Array.isArray(value) && value.length < r.min) {
        if (!r.message) {
          errors.push(locale.arrayMinError);
        } else {
          errors.push(r.message);
        }
      }
    }

    if ('max' in r) {
      if (isNumber(value)) {
        if (value > r.max) {
          if (!r.message) {
            errors.push(locale.numberMaxError);
          } else {
            errors.push(r.message);
          }
        }
      } else if (isString(value) && value.length > r.max) {
        if (!r.message) {
          errors.push(locale.stringMaxError);
        } else {
          errors.push(r.message);
        }
      } else if (Array.isArray(value) && value.length > r.max) {
        if (!r.message) {
          errors.push(locale.arrayMaxError);
        } else {
          errors.push(r.message);
        }
      }
    }

    if ('regex' in r) {
      const regs = mustArray(r.regex);
      let passFlag = true;
      regs.forEach(reg => {
        if (!reg.test(value)) {
          passFlag = false;
        }
      });
      if (!passFlag) {
        if (!r.message) {
          errors.push(locale.regexError);
        } else {
          errors.push(r.message);
        }
      }
    }

    if (r.func) {
      const result = r.func(value);
      if (!result) {
        if (!r.message) {
          errors.push(locale.funcError);
        } else {
          errors.push(r.message);
        }
      }
    }
  });
  return errors;
}
