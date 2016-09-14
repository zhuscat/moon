import React, { Component, PropTypes } from 'react';
import Radio from './Radio';
import { register } from './highorder/FormItem';
import '../style/radiogroup.scss';

const propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.any,
  readOnly: PropTypes.bool.isRequired,
};

const defaultProps = {
  readOnly: false,
};

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data, value: props.value };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data, value: nextProps.value });
  }

  handleClick(value) {
    console.log('radio group handle click');
    this.setState({ value }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  }

  render() {
    const { data, value } = this.state;
    const { readOnly } = this.props;
    return (
      <div className="radio-group">
        {data.map(r =>
          <Radio
            key={`radio-${r.value}`}
            text={r.text}
            value={r.value}
            on={r.value === value}
            onClick={this.handleClick}
            readOnly={readOnly}
          />
        )}
      </div>
    );
  }
}

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default register(RadioGroup, ['radio-group']);
