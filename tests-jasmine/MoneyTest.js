import {formatCurency} from '../scripts/utils/money.js';

describe('test suite format curency', () => {
  it('converts cents into $',() => {
    expect(formatCurency(2095)).toEqual('20.95');
  });
  
  it('works with 0', () => {
    expect(formatCurency(0)).toEqual('0.00');
  })

  it('rounds up to the neares', () => {
    expect(formatCurency(2000.5)).toEqual('20.01');
  })
});