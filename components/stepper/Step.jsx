import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  current: PropTypes.number,
  stepNumber: PropTypes.number,
  width: PropTypes.string,
  marginRight: PropTypes.string,
  type: PropTypes.string,
  lastStep: PropTypes.bool,
  status: PropTypes.string,
};

const defaultProps = {
  current: 0,
  type: 'horizontal',
  lastStep: false,
  status: 'process',
};

export default class Step extends Component {

  stepHeadContent() {
    const { status } = this.props;
    const isActive = this.props.current === this.props.stepNumber;
    if (!isActive) {
      return this.props.stepNumber + 1;
    }
    switch (status) {
      case 'process':
        return (
          this.props.stepNumber + 1
        );
      case 'error':
        return <i className="zmdi zmdi-alert-triangle zmdi-hc-lg" />;
      default:
        return null;
    }
  }

  render() {
    const { type, lastStep } = this.props;
    const isActive = this.props.current === this.props.stepNumber;
    const headInnerClassName = classNames({
      'zc-step-head-inner': this.props.status === 'process' || !isActive,
      'zc-step-head-inner-active': isActive && this.props.status === 'process',
      'zc-step-head-inner-status': this.props.status !== 'process' && isActive,
      [`zc-step-head-inner-status-${this.props.status}`]: isActive,
    });
    const stepStyle = {
      width: this.props.width,
      marginRight: this.props.marginRight,
    };
    const wrapperClassName = type === 'vertical' ? 'zc-step-wrapper-vertical' : 'zc-step-wrapper';
    const lineClassName = type === 'vertical' ? 'zc-step-line-vertical' : 'zc-step-line';
    const titleClassName = classNames({
      'zc-step-title': true,
      'zc-step-title-active': isActive,
      [`zc-step-title-status-${this.props.status}`]: isActive,
    });
    return (
      <div className={wrapperClassName} style={stepStyle}>
        {lastStep ? null : <div className={lineClassName} />}
        <div className="zc-step">
          <div className="zc-step-head">
            <div className={headInnerClassName}>
              {this.stepHeadContent()}
            </div>
          </div>
          <div className="zc-step-content">
            <div className={titleClassName}>
              {this.props.title}
            </div>
            <div className="zc-step-description">
              {this.props.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Step.propTypes = propTypes;
Step.defaultProps = defaultProps;
