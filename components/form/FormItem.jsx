import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Row, Col } from '../layout';
import '../../style/form-control.scss';

const propTypes = {
  mode: PropTypes.string,
  label: PropTypes.string,
  labelCol: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  wrapperCol: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  layout: PropTypes.oneOf(['inline', 'aligned', 'stacked']),
  children: PropTypes.any,
  showAllErrors: PropTypes.bool,
  status: PropTypes.string,
  showStatus: PropTypes.bool,
};

const defaultProps = {
  mode: 'horizontal',
  showAllErrors: true,
  status: '',
  showStatus: true,
};

const contextTypes = {
  form: PropTypes.object,
};

export default class FormItem extends Component {
  getErrors() {
    const { showAllErrors } = this.props;
    const name = this.props.children.props.name;
    const errors = this.context.form.getFieldErrors(name);
    if (showAllErrors) {
      return errors.join(', ');
    }
    if (errors.length) {
      return errors[0];
    }
    return null;
  }

  isValidating() {
    const name = this.props.children.props.name;
    if (this.context.form.isFieldValidating(name)) {
      return true;
    }
    return false;
  }

  renderField() {
    let { status } = this.props;
    if (!status) {
      const name = this.props.children.props.name;
      const field = this.context.form.getField(name);
      const errors = this.context.form.getFieldErrors(name);
      const isValidating = this.isValidating();
      if (isValidating) {
        status = 'validating';
      } else if ((!errors || errors.length === 0) && field.validated) {
        status = 'success';
      } else if (field.validated) {
        status = 'error';
      }
    }
    const className = classNames({
      'feedback-icon': true,
      'zmdi-hc-li': true,
      zmdi: true,
      'zmdi-hc-spin': status === 'validating',
      'zmdi-refresh': status === 'validating',
      'zmdi-alert-circle': status === 'warning' || status === 'error',
      'zmdi-check-circle': status === 'success',
      'feedback-icon-success': status === 'success',
      'feedback-icon-alert': status === 'warning',
      'feedback-icon-error': status === 'error',
    });
    return (
      <div className="zc-form-control-wrapper">
        {this.props.children}
        <div className={className} />
      </div>
    );
  }

  renderStacked() {
    const {
      label,
    } = this.props;

    return (
      <div>
        <Row>
          <Col>
            <label className="zc-label-stacked">{`${label}: `}</label>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.renderField()}
            {this.getErrors() ?
              <div className="zc-form-control-feedback">{this.getErrors()}</div> : null}
          </Col>
        </Row>
      </div>
    );
  }

  renderHorizontal() {
    const {
      label,
      labelCol,
      wrapperCol,
    } = this.props;

    return (
      <div>
        <Row>
          <Col {...labelCol}>
            <label className="zc-label">{`${label}: `}</label>
          </Col>
          <Col {...wrapperCol}>
            {this.renderField()}
            {this.getErrors() ?
              <div className="zc-form-control-feedback">{this.getErrors()}</div> : null}
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { mode } = this.props;
    if (mode === 'horizontal') {
      return this.renderHorizontal();
    } else if (mode === 'stacked') {
      return this.renderStacked();
    }
    return null;
  }
}

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;
FormItem.contextTypes = contextTypes;
