import {formatCurency} from '../../scripts/utils/money.js';

describe('test suite:format curency', () => {
  it('converts cents into $',() => {
    expect(formatCurency(2095)).toEqual('20.95');
  });
  it('works with 0', () => {
    expect(formatCurency(0)).toEqual('0.00');
  });
  it('rounds up to the nearest', () => {
    expect(formatCurency(2000.5)).toEqual('20.01');
  });
  it('rounds down when needed',() => {
    expect(formatCurency(2000.4)).toEqual('20.00');
  });
  it('work with negative numbers',() => {
    expect(formatCurency(-2000)).toEqual('-20.00');
  });
});