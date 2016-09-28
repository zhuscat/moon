import React, { Component, PropTypes } from 'react';
import '../../style/table.scss';

const propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  type: PropTypes.oneOf([
    'default',
    'stripped',
  ]),
};

const defaultProps = {
  data: [],
};

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { temp: '' };
  }

  render() {
    const { columns, data, type } = this.props;
    const rowClassName = type === 'stripped' ? 'zc-table-tr-stripped' : 'zc-table-tr';
    return (
      <table className="zc-table">
        <thead>
          <tr>
          {columns.map(column =>
            <td key={column.key} className="zc-table-thead-td">{column.title}</td>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            return (
              <tr key={row.key} className={rowClassName}>
                {columns.map((column) => {
                  const d = row[column.dataPath];
                  if (column.render) {
                    return (
                      <td>
                        {column.render(d, data[idx], idx)}
                      </td>
                    );
                  } else {
                    return <td key={column.key} className="zc-table-td">{d}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;
