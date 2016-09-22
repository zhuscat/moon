import React, { Component, PropTypes } from 'react';
import { Row, Col } from '../layout';
import '../../style/form-control.scss';

const propTypes = {
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
};

export default class FormItem extends Component {

  getErrors() {
    const name = this.props.children.props.name;
    const errors = this.props.form.getFieldErrors(name);
    return errors.join('');
  }

  renderAligned() {
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
            {this.props.children}
            {this.getErrors() ?
              <div className="zc-form-control-feedback">{this.getErrors()}</div> : null}
          </Col>
        </Row>
      </div>
    );
  }
  render() {
    return this.renderAligned();
  }
}

FormItem.propTypes = propTypes;
