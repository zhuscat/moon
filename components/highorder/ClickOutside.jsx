export default Component => class extends Component {
  componentWillUnmount() {
    this.unbindClickOutside();
  }

  bindClickOutside() {
    const fn = this.getClickOutsideEvent();
    document.addEventListener('mousedown', fn);
  }

  unbindClickOutside() {
    const fn = this.getClickOutsideEvent();
    document.removeEventListener('mousedown', fn);
  }

  registerClickOutside(onClickOutside, inside) {
    this.insideElement = inside;
    this.onClickOutside = onClickOutside;
  }

  getClickOutsideEvent() {
    let fn = this.clickOutsideEvent;
    if (!fn) {
      fn = event => {
        event.stopPropagation();
        const el = this.insideElement;
        let source = event.target;
        while (source.parentNode) {
          if (source === el) {
            return;
          }
          source = source.parentNode;
        }
        if (this.onClickOutside) {
          this.onClickOutside();
        }
      };
      this.clickOutsideEvent = fn;
    }
    return fn;
  }
};
