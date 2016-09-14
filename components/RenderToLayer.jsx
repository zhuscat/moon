import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const propTypes = {
  children: PropTypes.any,
};

export default class RenderToLayer extends Component {
  componentDidMount() {
    this.layer = document.createElement('div');
    document.body.appendChild(this.layer);
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
  }

  getLayer() {
    return this.layer;
  }

  unrenderLayer() {
    if (!this.layer) {
      return;
    }
    ReactDOM.unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  renderLayer() {
    if (!this.props.children) {
      ReactDOM.render(<span />, this.layer);
      return;
    }
    ReactDOM.render(this.props.children, this.layer);
  }

  render() {
    return null;
  }
}

RenderToLayer.propTypes = propTypes;
