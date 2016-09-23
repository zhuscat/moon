export default function omit(obj, parts = []) {
  const remain = {};
  Object.keys(obj).forEach(key => {
    if (!parts.includes(key)) {
      remain[key] = obj[key];
    }
  });
  return remain;
}
