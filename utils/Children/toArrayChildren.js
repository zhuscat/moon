import React from 'react';

export default function toArrayChildren(children) {
  const res = [];
  React.Children.forEach(children, child => {
    res.push(child);
  });
  console.log(res);
  return res;
}
