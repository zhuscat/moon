import React, { Component, PropTypes } from 'react';
import { noop } from '../../utils/default';
import classNames from 'classnames';
import '../../style/carousel.scss';

const propTypes = {
  current: PropTypes.number,
  defaultCurrent: PropTypes.number,
  autoPlay: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.any,
};

const defaultProps = {
  defaultCurrent: 0,
  autoPlay: true,
  onChange: noop,
};

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    let current = props.defaultCurrent;
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.autoPlay = this.autoPlay.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    if ('current' in props) {
      current = props.current;
    }
    this.state = { current };
  }

  componentDidMount() {
    this.autoPlay();
  }

  componentWillReceiveProps(nextProps) {
    if ('current' in nextProps) {
      this.setState({ current: nextProps.current });
    }
  }

  componentWillUnmount() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  handleChange(page) {
    if ('current' in this.props) {
      this.props.onChange(page);
    } else {
      this.setState({ current: page });
    }
  }

  autoPlay() {
    this.autoPlayInterval = setInterval(this.next, 2000);
  }

  prev() {
    let { current } = this.state;
    if (current === 0) {
      current = this.props.children.length - 1;
    } else {
      current -= 1;
    }
    this.handleChange(current);
  }

  next() {
    let { current } = this.state;
    if (current === this.props.children.length - 1) {
      current = 0;
    } else {
      current += 1;
    }
    this.handleChange(current);
  }

  handleMouseOver() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    this.setState({ showButtons: true });
  }

  handleMouseOut() {
    if (!this.autoPlayInterval && this.props.autoPlay) {
      this.autoPlay();
    }
    this.setState({ showButtons: false });
  }

  render() {
    const { showButtons } = this.state;
    const leftButtonClassName = classNames({
      'zc-carousel-button': true,
      'zc-carousel-button-left': true,
      'zc-carousel-button-hidden': !showButtons,
    });
    const rightButtonClassName = classNames({
      'zc-carousel-button': true,
      'zc-carousel-button-right': true,
      'zc-carousel-button-hidden': !showButtons,
    });
    return (
      <div
        className="zc-carousel"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {React.Children.map(this.props.children, (child, index) => {
          return (
            <div
              className="zc-carousel-wrapper"
              style={{
                left: `${index - this.state.current}00%`,
              }}
            >
              {child}
            </div>
          );
        })}
        <div
          className={leftButtonClassName}
          onClick={() => {
            this.prev();
          }}
        >
          <i className="zmdi zmdi-chevron-left zmdi-hc-2x" />
        </div>
        <div
          className={rightButtonClassName}
          onClick={() => {
            this.next();
          }}
        >
          <i className="zmdi zmdi-chevron-right zmdi-hc-2x" />
        </div>
      </div>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;
