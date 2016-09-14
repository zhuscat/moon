import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NumberInput from './NumberInput';
import { register } from './highorder/FormItem';
import * as datetime from '../utils/datetime';
import '../style/datepicker.scss';

const propTypes = {
  date: PropTypes.object.isRequired,
  onDateClick: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  format: PropTypes.string,
  zIndex: PropTypes.number.isRequired,
};

const defaultProps = {
  date: new Date(),
  type: 'date',
  zIndex: 999,
};

class DatePicker extends Component {
  constructor(props) {
    super(props);
    // contentType date | month | year
    this.state = {
      date: this.props.date,
      contentType: 'date',
      open: false,
    };
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick);
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
      console.log(source);
      if (source === this.datePicker || source === this.input) {
        return;
      }
      source = source.parentNode;
    }

    console.log('set open false');

    this.setState({ open: false });
  }

  handleChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleInputClick(e) {
    if (e.target !== this.input) {
      return;
    }
    this.setState({ open: !this.state.open });
  }

  handleDateClick(date) {
    if (this.props.onDateClick) {
      this.props.onDateClick(date);
    }
    this.setState({ date });
    this.handleChange(date);
  }

  handleHourChange(value) {
    console.log(`handle hour change ${value}`);
    const d = datetime.cloneDate(this.state.date);
    d.setHours(value);
    this.setState({ date: d, open: true });
    this.handleChange(d);
  }

  handleMinuteChange(value) {
    const d = datetime.cloneDate(this.state.date);
    d.setMinutes(value);
    console.log(d);
    this.setState({ date: d, open: true });
    this.handleChange(d);
  }

  handleYearButtonClick(value) {
    const d = datetime.cloneDate(this.state.date);
    d.setFullYear(value);
    this.setState({ date: d, contentType: 'date' });
  }

  handleMonthButtonClick(value) {
    const d = datetime.cloneDate(this.state.date);
    d.setMonth(value - 1);
    this.setState({ date: d, contentType: 'date' });
  }

  renderInputDate() {
    const { type, format } = this.props;
    const { date } = this.state;
    if (format) {
      return datetime.format(date, format);
    }
    switch (type) {
      case 'date':
        return datetime.format(date, 'yyyy/MM/dd');
      case 'datetime':
        return datetime.format(date, 'yyyy/MM/dd hh: mm');
      default:
        return datetime.format(date, 'yyyy/MM/dd hh: mm');
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
    const monthDaysArray = datetime.getMonthDaysArray(this.state.date);
    const currMonth = this.state.date.getMonth();
    return monthDaysArray.map(row =>
      <tr className="zc-calendar-body-row">
        {row.map(col => {
          const colClassName = classNames({
            'zc-calendar-body-col': true,
            'zc-calendar-body-column-disabled': col.getMonth() !== currMonth,
          });
          const dateClassName = classNames({
            'zc-calendar-date': true,
            'zc-calendar-date-active': datetime.sameDay(col, this.state.date),
          });
          return (
            <td className={colClassName}>
              <div
                className={dateClassName}
                onClick={() => { this.handleDateClick(col); }}
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
    const month = this.state.date.getMonth() + 1;
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
    return monthRowArray.map(row =>
      <tr className="zc-calendar-body-row">
        {row.map(col => {
          const calendarMonthClassName = classNames({
            'zc-calendar-year': true,
            'zc-calendar-year-active': month === col.value,
          });
          return (
            <td className="zc-calendar-year-col">
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
    const { date } = this.state;
    const fullYear = date.getFullYear();
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
    return yearRowArray.map(row =>
      <tr className="zc-calendar-body-row">
        {row.map(col => {
          const year = col.value;
          const calendarYearClassName = classNames({
            'zc-calendar-year': true,
            'zc-calendar-year-active': fullYear === year,
          });
          return (
            <td className="zc-calendar-year-col">
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
            const date = datetime.cloneDate(this.state.date);
            date.setFullYear(date.getFullYear() - 20);
            this.setState({ date });
            this.handleChange(date);
          }}
        >
          «
        </a>
        <a
          className="zc-calendar-year-select"
          onClick={() => this.setState({ contentType: 'date' })}
        >
          {`${this.state.date.getFullYear()}年`}
        </a>
        <a
          className="zc-calendar-button zc-calendar-button-next-year"
          type="button"
          onClick={() => {
            const date = datetime.cloneDate(this.state.date);
            date.setFullYear(date.getFullYear() + 20);
            this.setState({ date });
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
            const date = datetime.cloneDate(this.state.date);
            date.setMonth(date.getMonth() - 1);
            this.setState({ date });
            this.handleChange(date);
          }}
        >
          «
        </a>
        <a
          className="zc-calendar-year-select"
          onClick={() => this.setState({ contentType: 'date' })}
        >
          {`${this.state.date.getMonth() + 1}月`}
        </a>
        <a
          className="zc-calendar-button zc-calendar-button-next-year"
          type="button"
          onClick={() => {
            const date = datetime.cloneDate(this.state.date);
            date.setMonth(date.getMonth() + 1);
            this.setState({ date });
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
      <div className="zc-calendar-header">
        <a
          className="zc-calendar-button zc-calendar-button-prev-year"
          type="button"
          onClick={() => {
            const date = datetime.prevYearDate(this.state.date);
            this.setState({ date });
            this.handleChange(date);
          }}
        >
          «
        </a>
        <a
          className="zc-calendar-button zc-calendar-button-prev-month"
          type="button"
          onClick={() => {
            const date = datetime.prevMonthDate(this.state.date);
            this.setState({ date });
            this.handleChange(date);
          }}
        >
          ‹
        </a>
        <a
          className="zc-calendar-year-select"
          onClick={() => this.setState({ contentType: 'year' })}
        >
          {`${this.state.date.getFullYear()}年`}
        </a>
        <a
          className="zc-calendar-month-select"
          onClick={() => this.setState({ contentType: 'month' })}
        >
          {`${this.state.date.getMonth() + 1}月`}
        </a>
        <a
          className="zc-calendar-button zc-calendar-button-next-month"
          type="button"
          onClick={() => {
            const date = datetime.nextMonthDate(this.state.date);
            this.setState({ date });
            this.handleChange(date);
          }}
        >
          ›
        </a>
        <a
          className="zc-calendar-button zc-calendar-button-next-year"
          type="button"
          onClick={() => {
            const date = datetime.nextYearDate(this.state.date);
            this.setState({ date });
            this.handleChange(date);
            console.log(date);
          }}
        >
          »
        </a>
      </div>,
      <div className="zc-calendar-body">
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
            value={this.state.date.getHours()}
            itemChange={this.handleHourChange}
          />
          <NumberInput
            min={0}
            max={59}
            value={this.state.date.getMinutes()}
            itemChange={this.handleMinuteChange}
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

export default register(DatePicker, ['date', 'datetime']);
