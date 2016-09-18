/**
 * An abstract component for animation.
 * Inspired by react/src/addons/transitions and react-component/animate.
 *
 */

import React, { Component, PropTypes } from 'react';
import { toArrayChildren, findChildByKey, mergeChildren } from '../utils/Children';

const propTypes = {
  children: PropTypes.any,
  childFactory: PropTypes.func,
};

const defaultProps = {
  childFactory: c => c,
};

export default class Animator extends Component {
  constructor(props) {
    super(props);
    this.state = { children: toArrayChildren(this.props.children) };
  }

  componentWillMount() {
    this.keysToEnter = [];
    this.keysToLeave = [];
  }

  componentWillReceiveProps(nextProps) {
    const nextChildren = toArrayChildren(nextProps.children);
    const prevChildren = this.state.children;
    this.setState({
      children: mergeChildren(prevChildren, nextChildren),
    });
    // 寻找到需要 enter 的孩子节点
    nextChildren.forEach(nextChild => {
      const hasPrev = nextChild && findChildByKey(nextChild.key, prevChildren);
      if (!hasPrev) {
        this.keysToEnter.push(nextChild.key);
      }
    });
    // 寻找到需要 leave 的孩子节点
    prevChildren.forEach(prevChild => {
      const hasNext = prevChild && findChildByKey(prevChild.key, nextChildren);
      if (!hasNext) {
        this.keysToLeave.push(prevChild.key);
      }
    });
  }

  componentDidUpdate() {
    // 执行动画
    this.keysToEnter.forEach(key => {
      this.performEnter(key);
    });
    this.keysToLeave.forEach(key => {
      this.performLeave(key);
    });
    this.keysToEnter = [];
    this.keysToLeave = [];
  }

  performEnter(key) {
    const component = this.refs[key]; // eslint-disable-line
    if (component.componentWillEnter) {
      component.componentWillEnter(this.handleDoneEntering.bind(this, key));
    } else {
      this.handleDoneEntering(key);
    }
  }

  performLeave(key) {
    const component = this.refs[key]; // eslint-disable-line
    if (component.componentWillLeave) {
      component.componentWillLeave(this.handleDoneLeaving.bind(this, key));
    } else {
      this.handleDoneLeaving(key);
    }
  }

  handleDoneEntering(key) {
    const component = this.refs[key]; // eslint-disable-line
    if (component.componentDidEnter) {
      component.componentDidEnter();
    }
  }

  handleDoneLeaving(key) {
    const component = this.refs[key]; // eslint-disable-line
    if (component.componentDidLeave) {
      component.componentDidLeave();
    }
    this.setState(prevState => {
      const newChildren = prevState.children.concat();
      let index = -1;
      newChildren.forEach((child, i) => {
        if (index !== -1) {
          return;
        }
        if (child.key === key) {
          index = i;
        }
      });
      if (index !== -1) {
        newChildren.slice(index, 1);
      }
      return { children: newChildren };
    });
  }

  render() {
    let childrenToRender = [];
    childrenToRender = this.state.children.map(child => {
      if (!child) {
        return null;
      }
      if (!child.key) {
        throw new Error('child in animator must have a key.');
      }
      return React.cloneElement(
        this.props.childFactory(child),
        { ref: child.key, key: child.key }
      );
    });
    return (
      <div>
        {childrenToRender}
      </div>
    );
  }
}

Animator.propTypes = propTypes;
Animator.defaultProps = defaultProps;
