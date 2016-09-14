import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Modal from '../components/Modal';
import Button from '../components/Button';
import '../style/base.scss'

class ModalExample1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false }
  }

  render() {
    return (
      <div>
        <Button onClick={() => { this.setState({ show: !this.state.show }) }}>Open Modal</Button>
        <Modal
          show={this.state.show}
          title="Are you sure?"
          content="All the operations will be canceled"
          onOk={() => { this.setState({ show: !this.state.show })}}
          onCancel={() => { this.setState({ show: !this.state.show })}}
        />
      </div>
    );
  }
}

class ModalExample2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false }
  }

  render() {
    return (
      <div>
        <Button onClick={() => { this.setState({ show: !this.state.show }) }}>Open Modal Appearance Reverse</Button>
        <Modal
          show={this.state.show}
          title="Are you sure?"
          content="All the operations will be canceled"
          appearance="reverse"
          onOk={() => { this.setState({ show: !this.state.show })}}
          onCancel={() => { this.setState({ show: !this.state.show })}}
        />
      </div>
    );
  }
}

class ModalExample3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false }
    this.handleOk = () => { this.setState({ show: false })};
    this.handleCancel = () => { this.setState({ show: false })}
  }

  render() {
    return (
      <div>
        <Button onClick={() => { this.setState({ show: !this.state.show }) }}>Custom Footer</Button>
        <Modal
          show={this.state.show}
          title="Are you sure?"
          content="All the operations will be canceled"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button onClick={this.handleOk}>Left</Button>,
            <Button onClick={action('Middle Button Click')}>Middle</Button>, 
            <Button onClick={this.handleCancel}>Right</Button>]}
        />
      </div>
    );
  }
}

storiesOf('Modal 模态对话框', module)
  .add('Basic 基本', () => {
    return (
      <div>
        <ModalExample1 />
        <ModalExample2 />
      </div>
    );
  })
  .add('Custom Footer 自定义页脚', () => {
    return (
      <div>
        <ModalExample3 />
      </div>
    )
  })
