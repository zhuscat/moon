import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';

let notificationInstance;

function createNotificationInstance(props = {}) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const notification = ReactDOM.render(<Notification {...props} />, div); // eslint-disable-line
  return {
    component: notification,
    notify(message) {
      notification.add(message);
    },
    removeMessage(key) {
      notification.remove(key);
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  };
}

function getNotificationInstance() {
  notificationInstance = notificationInstance || createNotificationInstance();
  return notificationInstance;
}

function notify({
  content = '',
  type = 'info',
  duration = 1000,
}) {
  const notification = getNotificationInstance();
  notification.notify({
    content,
    type,
    duration,
  });
}

export { notify };
