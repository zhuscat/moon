import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import PopoverAnimator from './PopoverAnimator';
import RenderToLayer from '../RenderToLayer';
import clickOutside from '../highorder/ClickOutside';
import * as types from '../../utils/types';
import '../../style/popover.scss';

const propTypes = {
  children: PropTypes.any,
  show: PropTypes.bool.isRequired,
  anchorElement: PropTypes.object,
  anchorOrign: types.origin.isRequired,
  targetOrign: types.origin.isRequired,
  onClickOutside: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

const defaultProps = {
  show: false,
  anchorOrign: ['right', 'bottom'],
  targetOrign: ['left', 'top'],
};

export default class Popover extends clickOutside(Component) {

  constructor(props) {
    super(props);
    this.getAnchorElementPosition = this.getAnchorElementPosition.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.getPopover = this.getPopover.bind(this);
  }

  componentDidMount() {
    const insideEl = this.layer.getLayer();
    this.registerClickOutside(this.handleOutsideClick, insideEl);
    this.bindClickOutside();
    this.setPosition();
  }

  getLayer() {
    return this.layer.getLayer();
  }

  componentDidUpdate() {
    this.setPosition();
  }

  handleOutsideClick() {
    if (this.props.onClickOutside) {
      this.props.onClickOutside();
    }
  }

  handleMouseEnter(e) {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  }

  handleMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  }

  setPosition() {
    const { anchorElement, anchorOrign, targetOrign } = this.props;
    const [anchorHorizontal, anchorVertical] = anchorOrign;
    const [targetHorizontal, targetVertical] = targetOrign;
    const anchorElementPosition = this.getAnchorElementPosition(anchorElement);
    const popoverStyle = {
      [targetHorizontal]: anchorElementPosition[anchorHorizontal],
      [targetVertical]: anchorElementPosition[anchorVertical],
    };
    const targetElement = this.layer.getLayer().children[0];
    if (!targetElement) {
      return;
    }
    targetElement.style.left = `${popoverStyle.left}px`;
    targetElement.style.top = `${popoverStyle.top}px`;
  }

  getPopover() {
    return this.refs.popover;
  }

  getAnchorElementPosition(el) {
    if (!el) {
      return {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        bottom: 0,
        right: 0,
      };
    }
    const rect = el.getBoundingClientRect();
    const position = {
      top: rect.top,
      left: rect.left,
      width: el.offsetWidth,
      height: el.offsetHeight,
    };
    position.right = position.right || position.left + position.width;
    position.bottom = position.bottom || position.top + position.height;
    return position;
  }

  render() {
    const { show } = this.props;
    const popoverClassName = classNames({
      'zc-popover': true,
      'zc-popover-show': show,
    });
    return (
      <RenderToLayer
        ref={node => { this.layer = node; }}
      >
        {
          show ?
            <PopoverAnimator
              enter="zc-popover"
              enterActive={popoverClassName}
            >
              <div
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              >
                {this.props.children}
              </div>
            </PopoverAnimator> : null
        }
      </RenderToLayer>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;
