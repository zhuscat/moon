import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  span: PropTypes.number,
  pull: PropTypes.number,
  push: PropTypes.number,
  offset: PropTypes.number,
  xs: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  sm: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  md: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  lg: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object.isRequired,
};

const defaultProps = {
  style: {},
};

const Col = (props) => {
  const { span, offset, pull, push } = props;
  let sizeObj = {};
  ['xs', 'sm', 'md', 'lg'].forEach(size => {
    let sizeProps = {};
    if (typeof props[size] === 'number') {
      sizeProps.span = props[size];
    } else if (props[size] === 'object') {
      sizeProps = props[size] || {};
    }
    sizeObj = Object.assign({}, sizeObj, {
      [`col-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
      [`col-${size}-offset-${sizeProps.offset}`]: sizeProps.offset !== undefined,
      [`col-${size}-pull-${sizeProps.pull}`]: sizeProps.pull !== undefined,
      [`col-${size}-push-${sizeProps.push}`]: sizeProps.push !== undefined,
    });
  });

  const className = classNames(Object.assign({}, {
    [`col-${span}`]: span !== undefined,
    [`col-offset-${offset}`]: offset !== undefined,
    [`col-pull-${pull}`]: pull !== undefined,
    [`col-push-${push}`]: push !== undefined,
  }, sizeObj));

  return <div className={className} style={props.style}>{props.children}</div>;
};

Col.propTypes = propTypes;
Col.defaultProps = defaultProps;

export default Col;
