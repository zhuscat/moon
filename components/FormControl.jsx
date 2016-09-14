import React, { Component, PropTypes } from 'react';
import { Row, Col } from './layout';
import { COMPONENTS } from './highorder/FormItem';
import '../style/form-control.scss';

const propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  type: PropTypes.string,
  formData: PropTypes.object,
  labelCol: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  wrapperCol: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  children: PropTypes.any,
  itemChange: PropTypes.func,
  itemBind: PropTypes.func,
  itemUnbind: PropTypes.func,
  required: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  validator: PropTypes.object,
  data: PropTypes.any,
  layout: PropTypes.oneOf(['inline', 'aligned', 'stacked']),
};

export default class FormControl extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value, result: '' };
    this.handleValidate = this.handleValidate.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.itemBind = this.itemBind.bind(this);
    this.itemUnbind = this.itemUnbind.bind(this);
  }

  itemChange(value) {
    console.log('item change called in form control');
    if (this.props.itemChange) {
      this.props.itemChange(this.props.name, value);
    }
  }

  itemBind(item) {
    if (this.props.itemBind) {
      this.props.itemBind(item);
    }
  }

  itemUnbind(name) {
    if (this.props.itemUnbind) {
      this.props.itemUnbind(name);
    }
  }

  handleValidate(result) {
    // result 可能是 true 或者 false 也有可能是一个 Error 的实例
    if (result === true) {
      this.setState({ result: '' });
    } else if (result === false) {
      this.setState({ result: '验证不通过' });
    } else if (result instanceof Error) {
      this.setState({ result: result.message });
    } else {
      this.setState({ result: '' });
    }
  }

  propsExtend(props) {
    return Object.assign({}, props, {
      itemChange: this.itemChange,
      itemBind: this.itemBind,
      itemUnbind: this.itemUnbind,
      onValidate: this.handleValidate,
    });
  }

  renderInline() {
    return (
      <Row>
        <Col span={24}>
          <div>haha</div>
        </Col>
      </Row>
    );
  }

  // 孩子节点的验证自己做
  renderChildren(children, label, labelCol, wrapperCol) {
    if (!children) {
      return null;
    }
    let props = {};
    props = this.propsExtend(props);
    return (
      <div>
        <Row>
          <Col {...labelCol}>
            <label className="zc-label">{`${label}: `}</label>
          </Col>
          <Col {...wrapperCol}>
            {React.cloneElement(children, props)}
            <div>{this.state.result}</div>
          </Col>
        </Row>
      </div>);
  }

  // 这个渲染是渲染给了 type 属性的 FormControl
  renderItem(type, labelCol, wrapperCol, label, props) {
    const renders = [];
    if (COMPONENTS[type]) {
      renders.push(COMPONENTS[type].render(this.propsExtend(Object.assign({}, props, {
        key: 'item-component',
      }))));
      if (this.state.result) {
        renders
          .push(<div key="item-feedback" className="zc-form-control-feedback">
            {this.state.result}</div>);
      }
    }
    return renders;
  }

  renderStacked() {
    const {
      type,
      label,
      labelCol,
      wrapperCol,
    } = this.props;

    return (
      <div>
        <Row>
          <Col {...wrapperCol}>
            <label className="zc-label-stacked">{`${label}: `}</label>
            {this.renderItem(type, labelCol, wrapperCol, label, this.props)}
          </Col>
        </Row>
      </div>
    );
  }

  renderAligned() {
    const {
      type,
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
            {this.renderItem(type, labelCol, wrapperCol, label, this.props)}
          </Col>
        </Row>
      </div>
    );
  }

  renderControls() {
    const { layout } = this.props;
    switch (layout) {
      case 'aligned':
        return this.renderAligned();
      case 'stacked':
        return this.renderStacked();
      default:
        return this.renderAligned();
    }
  }

  render() {
    const {
      children,
      label,
      labelCol,
      wrapperCol,
    } = this.props;

    return (
      <div>
        {this.renderChildren(children, label, labelCol, wrapperCol)}
        {this.renderControls()}
      </div>
    );
  }
}

FormControl.propTypes = propTypes;
