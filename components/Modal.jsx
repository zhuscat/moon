import React, { Component, PropTypes } from 'react';
import { Row, Col } from './layout';
import Button from './Button';
import '../style/modal.scss';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  show: PropTypes.bool.isRequired,
  appearance: PropTypes.oneOf(['default', 'reverse']).isRequired,
  footer: PropTypes.array,
};

const defaultProps = {
  show: false,
  appearance: 'default',
};

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleOk() {
    if (this.props.onOk) {
      this.props.onOk();
    }
  }

  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  renderFooter() {
    const { footer, appearance } = this.props;
    if (footer) {
      return (
        <div className="zc-dialog-footer-custom">
          <Row>
            <Col span={24}>
              {footer.map(item =>
                item
              )}
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <div className="zc-dialog-footer">
        <Row>
          <Col span={6} offset={6}>
            <Button
              radius
              onClick={this.handleCancel}
            >取消</Button>
          </Col>
          <Col span={6}>
            <Button
              radius
              type={appearance === 'reverse' ? 'normal' : 'primary'}
              onClick={this.handleOk}
            >确认</Button>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { title, content, show, appearance } = this.props;
    const dialogClassName = appearance === 'reverse' ? 'zc-dialog-reverse' : 'zc-dialog';
    return (
      <div className="zc-modal" style={{ display: show ? 'block' : 'none' }}>
        <div className={dialogClassName} style={{ opacity: show ? 1 : 0 }}>
          <Row>
            <Col span={24}>
              <div className="zc-dialog-title">{title}</div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="zc-dialog-content">{content}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.renderFooter()}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
