import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NumberInput from '../number-input';
import { noop } from '../../utils/default';
import * as datetime from '../../utils/datetime';
import '../../style/datepicker.scss';

const propTypes = {
  value: PropTypes.object,
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  format: PropTypes.string,
  zIndex: PropTypes.number.isRequired,
};

const defaultProps = {
  defaultValue: new Date(),
  type: 'date',
  zIndex: 999,
  onChange: noop,
};

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    let value = props.defaultValue;
    if ('value' in props) {
      value = props.value;
    }
    // contentType date | month | year
    this.state = {
      value,
      contentType: 'date',
      open: false,
    };
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick);
  }

  onOutsideClick(e) {
    if (!this.state.open) {
      return;
    }
    e.stopPropagation();
    // const thisNode = ReactDOM.findDOMNode(this);
    let source = e.target;

    while (source.parentNode) {
      if (source === this.datePicker || source === this.input) {
        return;
      }
      source = source.parentNode;
    }

    this.setState({ open: false });
  }

  handleChange(value) {
    if ('value' in this.props) {
      this.props.onChange(value);
    } else {
      this.setState({ value });
    }
  }

  handleInputClick(e) {
    if (e.target !== this.input) {
      return;
    }
    this.setState({ open: !this.state.open });
  }

  handleHourChange(value) {
    const d = datetime.cloneDate(this.state.value);
    d.setHours(value);
    this.setState({ open: true });
    if ('value' in this.props) {
      this.props.onChange(d);
    } else {
      this.setState({ value: d });
    }
  }

  handleMinuteChange(value) {
    const d = datetime.cloneDate(this.state.value);
    d.setMinutes(value);
    this.setState({ open: true });
    if ('value' in this.props) {
      this.props.onChange(d);
    } else {
      this.setState({ value: d });
    }
  }

  handleYearButtonClick(value) {
    const d = datetime.cloneDate(this.state.value);
    d.setFullYear(value);
    this.setState({ contentType: 'date' });
    if ('value' in this.props) {
      this.props.onChange(d);
    } else {
      this.setState({ value: d });
    }
  }

  handleMonthButtonClick(value) {
    const d = datetime.cloneDate(this.state.value);
    d.setMonth(value - 1);
    this.setState({ contentType: 'date' });
    if ('value' in this.props) {
      this.props.onChange(d);
    } else {
      this.setState({ value: d });
    }
  }

  renderInputDate() {
    const { type, format } = this.props;
    const { value } = this.state;
    if (format) {
      return datetime.format(value, format);
    }
    switch (type) {
      case 'date':
        return datetime.format(value, 'yyyy/MM/dd');
      case 'datetime':
        return datetime.format(value, 'yyyy/MM/dd hh: mm');
      default:
        return datetime.format(value, 'yyyy/MM/dd hh: mm');
    }
  }

  renderInput() {
    return (
      <div
        ref={node => { this.input = node; }}
        className="zc-calendar-input"
        onClick={this.handleInputClick}
      >
        {this.renderInputDate()}
        <i className="zmdi zmdi-calendar zc-calendar-icon" />
        {this.renderCalendar()}
      </div>
    );
  }

  renderDateSelect() {
    const monthDaysArray = datetime.getMonthDaysArray(this.state.value);
    const currMonth = this.state.value.getMonth();
    return monthDaysArray.map((row, idx) =>
      <tr
        key={`zc-date-select-row-${idx}`}
        className="zc-calendar-body-row"
      >
        {row.map((col, cIdx) => {
          const colClassName = classNames({
            'zc-calendar-body-col': true,
            'zc-calendar-body-column-disabled': col.getMonth() !== currMonth,
          });
          const dateClassName = classNames({
            'zc-calendar-date': true,
            'zc-calendar-date-active': datetime.sameDay(col, this.state.value),
          });
          return (
            <td
              key={`zc-date-select-col-${cIdx}`}
              className={colClassName}
            >
              <div
                className={dateClassName}
                onClick={() => { this.handleChange(col); }}
              >
                {col.getDate()}
              </div>
            </td>
          );
        })}
      </tr>
    );
  }

  renderMonthSelect() {
    const month = this.state.value.getMonth() + 1;
    const monthArray = [];
    const monthRowArray = [];
    for (let i = 1; i <= 12; i += 1) {
      monthArray.push({
        value: i,
      });
    }
    while (monthArray.length) {
      const rowArray = monthArray.splice(0, 4);
      monthRowArray.push(rowArray);
    }
    return monthRowArray.map((row, idx) =>
      <tr
        key={`zc-month-select-row-${idx}`}
        className="zc-calendar-body-row"
      >
        {row.map((col, cIdx) => {
          const calendarMonthClassName = classNames({
            'zc-calendar-year': true,
            'zc-calendar-year-active': month === col.value,
          });
          return (
            <td
              key={`zc-month-select-col-${cIdx}`}
              className="zc-calendar-year-col"
            >
              <div
                className={calendarMonthClassName}
                onClick={() => this.handleMonthButtonClick(col.value)}
              >
                {col.value}
              </div>
            </td>
          );
        })}
      </tr>
    );
  }

  renderYearSelect() {
    const { value } = this.state;
    const fullYear = value.getFullYear();
    const yearArray = [];
    const yearRowArray = [];
    for (let i = fullYear - 9; i <= fullYear + 10; i++) {
      yearArray.push({
        value: i,
      });
    }
    while (yearArray.length) {
      const rowArray = yearArray.splice(0, 4);
      yearRowArray.push(rowArray);
    }
    return yearRowArray.map((row, idx) =>
      <tr
        key={`zc-year-select-row-${idx}`}
        className="zc-calendar-body-row"
      >
        {row.map((col, cIdx) => {
          const year = col.value;
          const calendarYearClassName = classNames({
            'zc-calendar-year': true,
            'zc-calendar-year-active': fullYear === year,
          });
          return (
            <td
              key={`zc-year-select-col-${cIdx}`}
              className="zc-calendar-year-col"
            >
              <div
                className={calendarYearClassName}
                onClick={() => this.handleYearButtonClick(year)}
              >
                {col.value}
              </div>
            </td>
          );
        })}
      </tr>
    );
  }

  renderYearCalendar() {
    const renderArray = [
      <div className="zc-calendar-header" key="zc-year-calendar-header">
        <a
          className="zc-calendar-button zc-calendar-button-prev-year"
          type="button"
          onClick={() => {
            const date = datetime.cloneDate(this.state.value);
            date.setFullYear(date.getFullYear() - 20);
            this.setState({ value: date });
            this.handleChange(date);
          }}
        >
          «
        </a>
        <a
          className="zc-calendar-year-select"
          onClick={() => this.setState({ contentType: 'date' })}
        >
          {`${this.state.value.getFullYear()}年`}
        </a>
        <a
          className="zc-calendar-button zc-calendar-button-next-year"
          type="button"
          onClick={() => {
            const date = datetime.cloneDate(this.state.value);
            date.setFullYear(date.getFullYear() + 20);
            this.setState({ value: date });
            this.handleChange(date);
            console.log(date);
          }}
        >
          »
        </a>
      </div>,
      <div className="zc-calendar-body" key="zc-year-calendar-body">
        <table className="zc-calendar-table">
          <tbody className="zc-calendar-body">
            {this.renderYearSelect()}
          </tbody>
        </table>
      </div>,
    ];
    return renderArray;
  }

  renderMonthCalendar() {
    const renderArray = [
      <div className="zc-calendar-header" key="zc-year-calendar-header">
        <a
          className="zc-calendar-button zc-calendar-button-prev-year"
          type="button"
          onClick={() => {
            const date = datetime.cloneDate(this.state.value);
            date.setMonth(date.getMonth() - 1);
            this.setState({ value: date });
            this.handleChange(date);
          }}
        >
          «
        </a>
        <a
          className="zc-calendar-year-select"
          onClick={() => this.setState({ contentType: 'date' })}
        >
          {`${this.state.value.getMonth() + 1}月`}
        </a>
        <a
          className="zc-calendar-button zc-calendar-button-next-year"
          type="button"
          onClick={() => {
            const date = datetime.cloneDate(this.state.value);
            date.setMonth(date.getMonth() + 1);
            this.setState({ value: date });
            this.handleChange(date);
          }}
        >
          »
        </a>
      </div>,
      <div className="zc-calendar-body" key="zc-year-calendar-body">
        <table className="zc-calendar-table">
          <tbody className="zc-calendar-body">
            {this.renderMonthSelect()}
          </tbody>
        </table>
      </div>,
    ];
    return renderArray;
  }

  renderCalendarContent() {
    const renderArray = [
      <div className="zc-calendar-header" key="zc-calendar-content-header">
        <a
          className="zc-calendar-button zc-calendar-button-prev-year"
          type="button"
          onClick={() => {
            const date = datetime.prevYearDate(this.state.value);
            this.setState({ value: date });
            this.handleChange(date);
          }}
        >
          «
        </a>
        <a
          className="zc-calendar-button zc-calendar-button-prev-month"
          type="button"
          onClick={() => {
            const date = datetime.prevMonthDate(this.state.value);
            this.setState({ value: date });
            this.handleChange(date);
          }}
        >
          ‹
        </a>
        <a
          className="zc-calendar-year-select"
          onClick={() => this.setState({ contentType: 'year' })}
        >
          {`${this.state.value.getFullYear()}年`}
        </a>
        <a
          className="zc-calendar-month-select"
          onClick={() => this.setState({ contentType: 'month' })}
        >
          {`${this.state.value.getMonth() + 1}月`}
        </a>
        <a
          className="zc-calendar-button zc-calendar-button-next-month"
          type="button"
          onClick={() => {
            const date = datetime.nextMonthDate(this.state.value);
            this.setState({ value: date });
            this.handleChange(date);
          }}
        >
          ›
        </a>
        <a
          className="zc-calendar-button zc-calendar-button-next-year"
          type="button"
          onClick={() => {
            const date = datetime.nextYearDate(this.state.value);
            this.setState({ value: date });
            this.handleChange(date);
          }}
        >
          »
        </a>
      </div>,
      <div className="zc-calendar-body" key="zc-calendar-content-body">
        <table className="zc-calendar-table">
          <thead className="zc-calendar-head">
            <tr className="zc-calendar-head-row">
              <td className="zc-calendar-head-col">
                日
              </td>
              <td className="zc-calendar-head-col">
                一
              </td>
              <td className="zc-calendar-head-col">
                二
              </td>
              <td className="zc-calendar-head-col">
                三
              </td>
              <td className="zc-calendar-head-col">
                四
              </td>
              <td className="zc-calendar-head-col">
                五
              </td>
              <td className="zc-calendar-head-col">
                六
              </td>
            </tr>
          </thead>
          <tbody className="zc-calendar-body">
            {this.renderDateSelect()}
          </tbody>
        </table>
      </div>,
      this.props.type === 'datetime' ?
        <div className="zc-calendar-time-select">
          <NumberInput
            min={0}
            max={23}
            value={this.state.value.getHours()}
            onChange={this.handleHourChange}
          />
          <NumberInput
            min={0}
            max={59}
            value={this.state.value.getMinutes()}
            onChange={this.handleMinuteChange}
          />
        </div> : null,
    ];
    return renderArray;
  }

  renderContent() {
    switch (this.state.contentType) {
      case 'date':
        return this.renderCalendarContent();
      case 'year':
        return this.renderYearCalendar();
      case 'month':
        return this.renderMonthCalendar();
      default:
        return this.renderCalendarContent();
    }
  }

  renderCalendar() {
    if (this.state.open) {
      return (
        <div
          className="zc-calendar"
          style={{
            zIndex: this.props.zIndex,
          }}
          ref={node => { this.datePicker = node; }}
        >
          {this.renderContent()}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderInput()}
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;
