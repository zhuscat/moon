import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DatePicker from '../components/DatePicker';
import '../style/base.scss';
import '../style/icon/css/material-design-iconic-font.min.css';

storiesOf('DatePicker 日期选择器', module)
  .add('Basic 基本', () => {
    return (
      <div>
        <div>
          <DatePicker
            type="date"
            date={new Date()}
            onDateClick={action('DatePicker Click')}
            zIndex={999}
          />
        </div>
        <br />
        <div>
          <DatePicker
            type="datetime"
            date={new Date()}
            onDateClick={action('DatePicker Click')}
            zIndex={900}
          />
        </div>
      </div>
    )
  })
