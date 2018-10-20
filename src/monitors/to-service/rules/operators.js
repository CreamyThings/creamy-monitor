const eq = (a, b) => a === b;
eq.trueText = 'is equal to';
eq.falseText = 'is not equal to';

const lt = (a, b) => a < b;
lt.trueText = 'is less than';
lt.falseText = 'is not less than';

const lte = (a, b) => a <= b;
lte.trueText = 'is less than or equal to';
lte.falseText = 'is not less than or equal to';

const gt = (a, b) => a > b;
gt.trueText = 'is greater than';
gt.falseText = 'is not greater than';

const gte = (a, b) => a >= b;
gte.trueText = 'is greater than or equal to';
gte.falseText = 'is not greater than or equal to';

const not = (a, b) => a !== b;
not.trueText = 'is not equal to and should not be';
not.falseText = 'is equal to but should not be';

const contains = (a, b) => a.indexOf(b) > -1;
contains.trueText = 'contains';
contains.falseText = 'does not contain';

module.exports = {
  eq,
  lt,
  lte,
  gt,
  gte,
  not,
  contains,
};
