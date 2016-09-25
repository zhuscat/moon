export default function isNumber(obj) {
  return (Object.prototype.toString.call(obj) === '[object Number]') && !Number.isNaN(obj);
}
