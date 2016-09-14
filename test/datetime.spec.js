import expect from 'expect';
import * as datetime from '../utils/datetime';

describe('datetime', function() {
  it('cloneDate', function() {
    const curr = new Date();
    const res = datetime.cloneDate(curr);
    expect(curr.getTime()).toEqual(res.getTime());
  });
  it('getMonthFirstDay', function() {
    const curr = new Date();
    const test = datetime.getMonthFirstDay(curr);
    const res = new Date(curr.getFullYear(), curr.getMonth(), 1);
    expect(test).toEqual(res);
  });
  it('getMonthDays', function() {
    const date1 = new Date(2016, 1, 1);
    expect(datetime.getMonthDays(date1)).toEqual(29);
    const date2 = new Date(2016, 7, 10);
    expect(datetime.getMonthDays(date2)).toEqual(31);
  });
  it('getMonthDaysArray', function() {
    const array = [];
    const firstWeek = [];
    firstWeek.push(new Date(2016, 0, 31));
    for (let i = 1; i <= 6; i++) {
      firstWeek.push(new Date(2016, 1, i));
    }
    const secondWeek = [];
    for (let i = 7; i <= 13; i++) {
      secondWeek.push(new Date(2016, 1, i));
    }
    const thirdWeek = [];
    for (let i = 14; i <= 20; i++) {
      thirdWeek.push(new Date(2016, 1, i));
    }
    const fourthWeek = [];
    for (let i = 21; i <= 27; i++) {
      fourthWeek.push(new Date(2016, 1, i));
    }
    const fifthWeek = [];
    for (let i = 28; i <= 29; i++) {
      fifthWeek.push(new Date(2016, 1, i));
    }
    for (let i = 1; i <= 5; i++) {
      fifthWeek.push(new Date(2016, 2, i));
    }
    array.push(firstWeek);
    array.push(secondWeek);
    array.push(thirdWeek);
    array.push(fourthWeek);
    array.push(fifthWeek);
    const res = datetime.getMonthDaysArray(new Date(2016, 1, 10));
    expect(res).toEqual(array);
  });
});
