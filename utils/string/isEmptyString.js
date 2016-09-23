import isString from './isString';

export default function isEmptyString(obj) {
  return isString(obj) && (obj === '');
}
