export default function mustArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }
  if (!obj) {
    return [];
  }
  return [obj];
}
