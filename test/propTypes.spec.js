import expect from 'expect';
import * as propTypes from '../utils/propTypes';

describe('propTypes', function() {
  it('getOrigins', function() {
    const test = propTypes.getOrigins();
    const res = [
      ['left', 'top'],
      ['left', 'bottom'],
      ['right', 'top'],
      ['right', 'bottom'],
    ];
    expect(test).toEqual(res);
  });
})
