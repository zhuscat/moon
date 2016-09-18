import React, { Component, PropTypes } from 'react';
import Message from './Message';
import getId from '../../utils/id';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  add(message) {
    const key = message.key = message.key || getId('zc_message'); // eslint-disable-line
    const { messages } = this.state;
    if (!messages.filter(m => m.key === key).length) {
      this.setState({ messages: messages.concat([message]) });
    }
  }

  remove(key) {
    const messages = this.state.messages.filter(m => m.key !== key);
    this.setState({ messages });
  }

  render() {
    const { messages } = this.state;
    const renderNodes = messages.map(m => {
      const onClose = () => {
        this.remove(m.key);
      };
      return (
        <Message
          {...m}
          onClose={onClose}
        />
      );
    });
    return (
      <div>
        {renderNodes}
      </div>
    );
  }
}
