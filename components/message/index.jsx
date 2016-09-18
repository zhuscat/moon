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
}) {
  const notification = getNotificationInstance();
  console.log(notification);
  notification.notify({
    content,
    type,
  });
}

export { notify };
