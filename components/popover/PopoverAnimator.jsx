import React, { Component, PropTypes } from 'react';

const propTypes = {
  enter: PropTypes.string.isRequired,
  enterActive: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default class PopoverAnimator extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  componentDidMount() {
    this.setState({ active: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    const { enter, enterActive } = this.props;
    const { active } = this.state;
    const className = active ? enterActive : enter;
    return (
      <div style={{ position: 'absolute' }}>
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              className,
            })
          )
        }
      </div>
    );
  }
}

PopoverAnimator.propTypes = propTypes;
