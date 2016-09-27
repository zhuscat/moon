import React, { Component, PropTypes } from 'react';
import '../../style/card.scss';

const propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  headerRender: PropTypes.func,
  bodyRender: PropTypes.func,
  footerRender: PropTypes.func,
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
          标题
        </div>
        <div className="zc-card-body">
          你怎么知道
        </div>
        <div className="zc-card-footer"></div>
      </div>
    );
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
