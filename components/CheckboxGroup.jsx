import React, { Component, PropTypes } from 'react';
import Checkbox from './Checkbox';
import { register } from './highorder/FormItem';
import '../style/checkboxgroup.scss';

const propTypes = {
  value: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
};

const defaultProps = {
  value: [],
  readOnly: false,
};

class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { values: this.props.value, data: this.props.data };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('check box will receive props');
    this.setState({ values: nextProps.value, data: nextProps.data });
  }

  handleClick(value) {
    const { values } = this.state;
    const optionIndex = values.indexOf(value);
    if (optionIndex === -1) {
      values.push(value);
    } else {
      values.splice(optionIndex, 1);
    }
    this.setState({ values }, () => {
      if (this.props.onChange) {
        this.props.onChange(values);
      }
    });
    console.log(values);
  }

  render() {
    const { values, data } = this.state;
    const { readOnly } = this.props;
    return (
      <div className="checkbox-group">
        {data.map(c =>
          <Checkbox
            key={c.value}
            value={c.value}
            on={values.includes(c.value)}
            text={c.text}
            onClick={this.handleClick}
            readOnly={readOnly}
          />
        )}
      </div>
    );
  }
}

CheckboxGroup.propTypes = propTypes;
CheckboxGroup.defaultProps = defaultProps;

export default register(CheckboxGroup, ['checkbox-group']);
