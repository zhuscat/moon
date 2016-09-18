import { PropTypes } from 'react';

const horizontalDirection = ['left', 'right'];
const verticalDirection = ['top', 'bottom'];

function getOrigins() {
  const origins = [];

  for (const hd of horizontalDirection) {
    for (const vd of verticalDirection) {
      origins.push([hd, vd]);
    }
  }

  return origins;
}

const origin = PropTypes.oneOf(getOrigins());

const message = PropTypes.oneOf(['info', 'success', 'warn', 'error']);

const types = {
  origin,
  message,
};

export {
  origin,
  getOrigins,
  message,
}; // eslint-disable-line import/prefer-default-export

export default types;
