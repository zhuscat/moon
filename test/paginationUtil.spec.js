import expect from 'expect';
import { calcPageList } from '../components/pagination/util'

describe('pagination util', function() {
  it('calcPageList', function() {
    const test1 = calcPageList(1, 90, 10);
    const res1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(test1).toEqual(res1);
    const test2 = calcPageList(1, 100, 10);
    const res2 = [1, 2, 3, 4, 5, -1, 10];
    expect(test2).toEqual(res2);
    const test3 = calcPageList(48, 500, 10);
    const res3 = [1, -1, 46, 47, 48, 49, 50];
    expect(test3).toEqual(res3);
    const test4 = calcPageList(43, 500, 10);
    const res4 = [1, -1, 41, 42, 43, 44, 45, -1, 50];
    expect(test4).toEqual(res4);
    const test5 = calcPageList(4, 500, 10);
    const res5 = [1, 2, 3, 4, 5, 6, -1, 50];
    expect(test5).toEqual(res5);
    const test6 = calcPageList(47, 500, 10);
    const res6 = [1, -1, 45, 46, 47, 48, 49, 50];
    expect(test6).toEqual(res6);
  });
})
