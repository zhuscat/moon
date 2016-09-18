
// TODO: 增加代码的健壮性(如：可能有浏览器不支持 classList)

export function addClass(el, className) {
  el.classList.add(className);
}

export function removeClass(el, className) {
  el.classList.remove(className);
}
