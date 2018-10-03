const rules = require('./rules');
const operators = require('./operators');

// deserialize monitor rules into truth functions
module.exports = (monitorRules) => {
  return monitorRules.map(({ type, operator, value }) => {
    const rule = rules[type];
    const ruleOperator = operators[operator];

    return data => ruleOperator(
      rule(data),
      value
    );
  });
};
