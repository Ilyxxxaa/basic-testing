// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 10, b: 5, action: Action.Add, expected: 15 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 10, b: 5, action: Action.Multiply, expected: 50 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 10, b: 5, action: Action.Exponentiate, expected: 100000 },
  { a: 10, b: 5, action: 'invalid action', expected: null },
  { a: '10', b: 5, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('table test', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
