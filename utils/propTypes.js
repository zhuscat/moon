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

export { origin, getOrigins }; // eslint-disable-line import/prefer-default-export
