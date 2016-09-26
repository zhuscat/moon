import React, { Component, PropTypes } from 'react';
import createForm from '../highorder/Form';
import '../../style/form.scss';

const propTypes = {
  mode: PropTypes.string,
  children: PropTypes.any,
  form: PropTypes.object,
};

const defaultProps = {
  mode: 'horizontal',
};

export default class Form extends Component {
  render() {
    return (
      <div>
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
              mode: this.props.mode,
            })
          )
        }
      </div>
    );
  }
}

Form.create = (options) => {
  const formWrapper = createForm(options);
  return (WrappedComponent) => formWrapper(React.createClass({
    propTypes: {
      form: PropTypes.object,
    },
    childContextTypes: {
      form: PropTypes.object,
    },
    getChildContext() {
      return {
        form: this.props.form,
      };
    },
    render() {
      return <WrappedComponent {...this.props} />;
    },
  }));
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
