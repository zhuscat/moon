import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import toArrayChildren from '../../utils/Children/toArrayChildren';

const propTypes = {
  current: PropTypes.number,
  children: PropTypes.any,
  type: PropTypes.string,
  status: PropTypes.string,
};

const defaultProps = {
  current: 0,
  type: 'horizontal',
  status: 'process',
};

export default class Stepper extends Component {
  constructor(props) {
    super(props);
    this.state = { lastStepWidth: 0 };
  }

  componentDidMount() {
    this.calcLastStepOffsetWidthIfNeeded();
  }

  componentDidUpdate() {
    this.calcLastStepOffsetWidthIfNeeded();
  }

  calcLastStepOffsetWidth() {
    const node = ReactDOM.findDOMNode(this); // eslint-disable-line
    if (node.children.length > 0) {
      // setTimeout to be sure the component has mounted
      const width = node.children[node.children.length - 1].offsetWidth;
      if (this.state.lastStepWidth === width) {
        return;
      }
      this.setState({ lastStepWidth: width });
    }
  }

  calcLastStepOffsetWidthIfNeeded() {
    if (this.props.type === 'horizontal') {
      this.calcLastStepOffsetWidth();
    }
  }

  render() {
    const { type } = this.props;
    const children = toArrayChildren(this.props.children);
    const lastIndex = children.length - 1;
    return (
      <div>
        {React.Children.map(this.props.children, (child, idx) => {
          return React.cloneElement(child, {
            width: type === 'vertical' || idx === lastIndex ? null : `${100 / lastIndex}%`,
            marginRight: type === 'vertical' || idx === lastIndex ?
              null : `-${this.state.lastStepWidth / lastIndex}`,
            stepNumber: idx,
            type: this.props.type,
            lastStep: idx === lastIndex,
            current: this.props.current,
            status: this.props.status,
          });
        })}
      </div>
    );
  }
}

Stepper.propTypes = propTypes;
Stepper.defaultProps = defaultProps;
