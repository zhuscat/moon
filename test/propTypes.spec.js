import expect from 'expect';
import { getOrigins } from '../utils/types';

describe('propTypes', function() {
  it('getOrigins', function() {
    const test = getOrigins();
    const res = [
      ['left', 'top'],
      ['left', 'bottom'],
      ['right', 'top'],
      ['right', 'bottom'],
    ];
    expect(test).toEqual(res);
  });
})
