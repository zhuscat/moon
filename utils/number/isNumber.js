export default function isString(obj) {
  return (Object.prototype.toString.call(obj) === '[object Number]');
}
