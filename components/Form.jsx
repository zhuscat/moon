import React, { Component, PropTypes } from 'react';
import { Row, Col } from './layout';
import Button from './Button';

/*
data 约定（暂时）
[
{name: 'abc', value: 'abc'}
]
*/

// 需要做的工作 将数据放到 form 的 state 上面

const propTypes = {
  children: PropTypes.any,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  layout: PropTypes.oneOf(['inline', 'aligned', 'stacked']),
};

const defaultProps = {
  data: {},
  layout: 'aligned',
};

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
    this.onClick = this.onClick.bind(this);
    this.items = {};
    this.itemBind = this.itemBind.bind(this);
    this.itemUnbind = this.itemUnbind.bind(this);
    this.itemChange = this.itemChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      console.log('form receive props');
      this.setState({ data: nextProps.data });
    }
  }

  onClick() {
    const result = this.validate();
    if (!result) {
      return;
    }
    console.log(this.state.data);
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.data);
    }
  }

  validate() {
    let success = true;
    Object.keys(this.items).forEach(key => {
      const result = this.items[key].validate();
      if (result instanceof Error) {
        success = false;
      } else {
        success = success && result;
      }
    });
    return success;
  }

  // bind item to form
  itemBind(item) {
    const { data } = this.state;
    this.items[item.name] = item;
    data[item.name] = item.value;
    this.setState({ data });
  }

  // unbind item from form
  itemUnbind(name) {
    const { data } = this.state;
    delete this.items[name];
    delete data[name];
    this.setState({ data });
  }

  // called when item data changes
  itemChange(name, value) {
    console.log('item change handled in form');
    const data = this.state.data;
    if (data[name] !== value) {
      data[name] = value;
      this.setState({ data });
    }
    // 改变了的话就看一下有没有可以验证的东西
    if (this.items[name] && this.items[name].validateBinds) {
      this.items[name].validateBinds.forEach(n => {
        this.items[n].validate();
      });
    }
  }

  renderChildren(children) {
    const { layout } = this.props;
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        formData: this.state.data,
        itemChange: this.itemChange,
        itemBind: this.itemBind,
        itemUnbind: this.itemUnbind,
        layout,
      })
    );
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {this.renderChildren(children)}
        <Row>
          <Col span={24}>
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={this.onClick}>提交</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
