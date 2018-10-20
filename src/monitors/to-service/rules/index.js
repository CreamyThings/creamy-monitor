const rules = require('./rules');
const operators = require('./operators');

module.exports.mapRule = ({ type, operator, value }) => {
  const rule = rules[type];
  const ruleOperator = operators[operator];

  return {
    test: data => ruleOperator(
      rule(data),
      value,
    ),
    text: (data) => {
      const current = rule(data);
      const expected = value;

      const truth = ruleOperator(current, expected);
      const ruleText = truth
        ? ruleOperator.trueText
        : ruleOperator.falseText;

      return `${type} of ${current} ${ruleText} ${expected}`;
    },
  };
};

// deserialize monitor rules into truth functions
module.exports.mapRules = monitorRules => monitorRules.map(module.exports.mapRule);
