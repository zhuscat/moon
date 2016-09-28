import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { noop } from '../../utils/default';
import '../../style/switch.scss';

const propTypes = {
  value: PropTypes.bool,
  defaultValue: PropTypes.bool,
  readOnly: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

const defaultProps = {
  defaultValue: false,
  readOnly: false,
  onChange: noop,
};

export default class Switch extends Component {
  constructor(props) {
    super(props);
    let value = props.defaultValue;
    if ('value' in props) {
      value = props.value;
    }
    this.state = { value };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  handleButtonClick() {
    const { readOnly } = this.props;
    if (readOnly) {
      return;
    }
    if ('value' in this.props) {
      this.props.onChange(!this.state.value);
    } else {
      this.setState({ value: !this.state.value });
    }
  }

  render() {
    const { value } = this.state;
    const { readOnly } = this.props;
    const switchClassName = classNames({
      'zc-switch': true,
      'zc-switch-active': value,
      'zc-switch-disabled': readOnly,
    });
    return (
      <div className={switchClassName}>
        <div className="zc-switch-inner">
          <div className="zc-switch-button" onClick={this.handleButtonClick} />
        </div>
      </div>
    );
  }
}

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;
