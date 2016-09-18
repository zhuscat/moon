import { findChildByKey } from './findChild';

export default function mergeChildren(prev, next) {
  let res = [];

  const nextChildrenPending = {};
  let pendingChildren = [];
  prev.forEach(child => {
    if (child && findChildByKey(child.key, next)) {
      if (pendingChildren.length) {
        nextChildrenPending[child.key] = pendingChildren;
        pendingChildren = [];
      }
    } else {
      pendingChildren.push(child);
    }
  });
  next.forEach(child => {
    if (child && {}.hasOwnProperty.call(nextChildrenPending, child.key)) {
      res = res.concat(nextChildrenPending[child.key]);
    }
    res.push(child);
  });
  res = res.concat(pendingChildren);
  return res;
}
