import {formatCurency} from '../scripts/utils/money.js';

console.log('test suite: formatCurency')

console.log('converts cents into $')

if (formatCurency(2095) === '20.95') {
  console.log('passed1');
} else {
  console.log('failed1')
}

console.log('works with 0')

if (formatCurency(0) === '0.00') {
  console.log('passed2')
} else {
  console.log('failed2')
}

console.log('rounds up to the nearest cent')

if (formatCurency(2000.5) === '20.01' ) {
  console.log('passed3')
} else {
  console.log('failed3')
}

if (formatCurency(2000.4) === '20.00' ) {
  console.log('passed4')
} else {
  console.log('failed4')
}