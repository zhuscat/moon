import React, { Children, PropTypes } from 'react';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
  gutter: PropTypes.number.isRequired,
  rowSpace: PropTypes.number.isRequired,
};

const defaultProps = {
  gutter: 16,
  rowSpace: 16,
};

const Row = (props) => {
  const { gutter, rowSpace, children } = props;
  const rowStyle = {
    paddingTop: rowSpace,
    paddingBottom: rowSpace,
  };

  return (
    <div className="row" style={rowStyle}>
      {Children.map(children, col => {
        if (!col) {
          return null;
        }
        return React.cloneElement(col, {
          style: gutter > 0 ? Object.assign({}, {
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2,
          }, col.props.style) : col.props.style,
        });
      })}
    </div>
  );
};

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
