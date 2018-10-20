const operators = require('./../../../../../src/monitors/to-service/rules/operators');

describe('to-service rule operators', () => {
  const thingsThatAreTrue = [
    [1, 'eq', 1],
    [3.33, 'eq', 3.33],
    ['foo', 'eq', 'foo'],
    [5, 'lt', 6],
    [5, 'lte', 5],
    [6, 'gt', 5],
    [5, 'gte', 5],
    [5, 'not', 42],
    ['foobar', 'contains', 'foo'],
    ['foobar', 'contains', 'bar'],
    ['mister bergmann', 'contains', 'ster berg'],
  ];

  const thingsThatAreNotTrue = [
    [1, 'eq', 2], // are you still with me
    ['foo', 'eq', 'bar'],
    ['capitalism', 'contains', 'ethical consumption'],
    [4, 'lt', 4],
    [4, 'lte', 3.9],
    [4, 'gt', 4],
    [4.0, 'gt', 4.0],
    [5, 'gte', 6],
    [1, 'not', 1],
    [2.5, 'not', 2.5],
  ];

  thingsThatAreTrue.forEach(([a, op, b]) => {
    test(`${a} should ${op} ${b}`, () => {
      expect(
        operators[op](a, b),
      ).toBe(true);
    });
  });

  thingsThatAreNotTrue.forEach(([a, op, b]) => {
    test(`${a} should not ${op} ${b}`, () => {
      expect(
        operators[op](a, b),
      ).toBe(false);
    });
  });
});
