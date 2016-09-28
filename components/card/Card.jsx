import React, { Component, PropTypes } from 'react';
import '../../style/card.scss';

const propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.any,
};

const defaultProps = {
  title: '',
  width: '100%',
};

export default class Card extends Component {
  render() {
    return (
      <div className="zc-card">
        <div className="zc-card-header">
          {this.props.title}
        </div>
        <div className="zc-card-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
