export default function shallowClone(obj) {
  if (typeof obj !== 'object' || obj === null || obj === undefined) {
    return obj;
  }
  const clone = {};
  Object.keys(obj).forEach(key => {
    clone[key] = obj[key];
  });
  return clone;
}
