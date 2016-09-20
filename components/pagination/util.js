export function calcPage(pageSize, total) {
  return Math.floor((total - 1) / pageSize) + 1;
}

export function calcPageList(current = 0, total = 0, pageSize = 10) {
  const pageList = [];
  const totalPages = calcPage(pageSize, total);
  if (totalPages <= 9) {
    for (let i = 1; i <= totalPages; i++) {
      pageList.push(i);
    }
  } else {
    let left = Math.max(1, current - 2);
    let right = Math.min(current + 2, totalPages);
    if (current <= 2) {
      right = 5;
    }
    if (current >= totalPages - 2) {
      left = totalPages - 4;
    }
    for (let i = left; i <= right; i++) {
      pageList.push(i);
    }
    if (left !== 1) {
      if (left === 2) {
        pageList.unshift(1);
      } else {
        pageList.unshift(1, -1);
      }
    }
    if (right !== totalPages) {
      if (right === totalPages - 1) {
        pageList.push(totalPages);
      } else {
        pageList.push(-1, totalPages);
      }
    }
  }
  return pageList;
}
