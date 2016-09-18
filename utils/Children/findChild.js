export function findChildByKey(key, children) { // eslint-disable-line
  let res = null;
  if (children) {
    children.forEach(child => {
      if (res) {
        return;
      }
      if (child && child.key === key) {
        res = child;
      }
    });
  }
  return res;
}
