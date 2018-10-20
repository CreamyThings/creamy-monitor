const rules = require('./rules');
const operators = require('./operators');

module.exports.mapRule = ({ type, operator, value }) => {
  const rule = rules[type];
  const ruleOperator = operators[operator];

  return data => ruleOperator(
    rule(data),
    value,
  );
};

// deserialize monitor rules into truth functions
module.exports.mapRules = monitorRules => monitorRules.map(module.exports.mapRule);
