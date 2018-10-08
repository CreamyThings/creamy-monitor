const eq = (a, b) => a === b;
const lt = (a, b) => a < b;
const lte = (a, b) => a <= b;
const gt = (a, b) => a > b;
const gte = (a, b) => a >= b;
const not = (a, b) => a !== b;
const contains = (a, b) => a.indexOf(b) > -1;

module.exports = {
  eq,
  lt,
  lte,
  gt,
  gte,
  not,
  contains,
};
