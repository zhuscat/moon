import React, { Component, PropTypes } from 'react';
import Animator from './Animator';
import CSSAnimatorChild from './CSSAnimatorChild';

const propTypes = {
  onEnter: PropTypes.string,
  enterActive: PropTypes.string,
  enterDuration: PropTypes.number,
  onLeave: PropTypes.string,
  leaveActive: PropTypes.string,
  leaveDuration: PropTypes.number,
  children: PropTypes.any,
};

export default class CSSAnimator extends Component {
  constructor(props) {
    super(props);
    this.wrapChild = this.wrapChild.bind(this);
  }

  wrapChild(child) {
    return (
      <CSSAnimatorChild
        onEnter={this.props.onEnter}
        enterActive={this.props.enterActive}
        enterDuration={this.props.enterDuration}
        onLeave={this.props.onLeave}
        leaveActive={this.props.leaveActive}
        leaveDuration={this.props.leaveDuration}
      >
        {child}
      </CSSAnimatorChild>
    );
  }

  render() {
    return (
      <Animator
        childFactory={this.wrapChild}
      >
        {this.props.children}
      </Animator>
    );
  }
}

CSSAnimator.propTypes = propTypes;
