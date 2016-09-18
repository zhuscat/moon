import React from 'react';

export default function oneChild(children) {
  return React.Children.map(children, c => c)[0];
}
