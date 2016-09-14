import React from 'react';

export default function traverseMenuItemRecursively(children, keys, res) {
  if (res.found) {
    return;
  }
  React.Children.forEach(children, c => {
    if (keys.includes(c.key)) {
      res.found = true; // eslint-disable-line no-param-reassign
    }
    if (c.props && c.props.children) {
      traverseMenuItemRecursively(c.props.children, keys, res);
    }
  });
}
