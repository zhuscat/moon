import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { register } from './highorder/FormItem';
import '../style/switch.scss';

const propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
};

const defaultProps = {
  value: false,
  readOnly: false,
};

class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('switch will receive props', nextProps);
    this.setState({ value: nextProps.value });
  }

  handleButtonClick() {
    const { readOnly } = this.props;
    if (readOnly) {
      return;
    }
    this.setState({ value: !this.state.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    });
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

export default register(Switch, ['switch']);
