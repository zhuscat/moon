export default function splitObject(obj, parts) {
  const left = {};
  const right = {};
  Object.keys(obj).forEach(key => {
    if (parts.includes(key)) {
      left[key] = obj[key];
    } else {
      right[key] = obj[key];
    }
  });
  return [left, right];
}
