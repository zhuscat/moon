import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { addClass, removeClass } from '../utils/Dom/Css/classList';
import oneChild from '../utils/Children/oneChild';

const TICK = 17;

const propTypes = {
  onEnter: PropTypes.string,
  enterActive: PropTypes.string,
  enterDuration: PropTypes.number,
  onLeave: PropTypes.string,
  leaveActive: PropTypes.string,
  leaveDuration: PropTypes.number,
  children: PropTypes.any,
};

const defaultProps = {
  enterDuration: 0,
  leaveDuration: 0,
};

export default class CSSAnimatorChild extends Component {
  componentWillEnter(callback) {
    const node = ReactDOM.findDOMNode(this); // eslint-disable-line
    addClass(node, this.props.onEnter);
    this.triggerAnimation(callback, this.props.enterActive, this.props.enterDuration);
  }

  componentDidEnter() {
    const node = ReactDOM.findDOMNode(this); // eslint-disable-line
    removeClass(node, this.props.onEnter);
    removeClass(node, this.props.enterActive);
  }

  componentWillLeave(callback) {
    const node = ReactDOM.findDOMNode(this); // eslint-disable-line
    addClass(node, this.props.onLeave);
    this.triggerAnimation(callback, this.props.leaveActive, this.props.leaveDuration);
  }

  componentDidLeave() {
    const node = ReactDOM.findDOMNode(this); // eslint-disable-line
    removeClass(node, this.props.onLeave);
    removeClass(node, this.props.leaveActive);
  }

  triggerAnimation(callback, className, duration) {
    setTimeout(() => {
      const node = ReactDOM.findDOMNode(this); // eslint-disable-line
      addClass(node, className);
    }, TICK);
    setTimeout(callback, duration);
  }

  render() {
    return oneChild(this.props.children);
  }
}

CSSAnimatorChild.propTypes = propTypes;
CSSAnimatorChild.defaultProps = defaultProps;
