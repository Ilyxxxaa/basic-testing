// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const finalResult = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: { value: 4, next: { value: null, next: null } },
    },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const result = generateLinkedList([1, 2, 3, 4]);
    expect(result).toStrictEqual(finalResult);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const result = generateLinkedList([2, 3, 4, 5, 6]);
    expect(result).toMatchSnapshot();
  });
});
