const ruleParser = require('./rules');

const assertNoError = {
  test: data => data.error === null,
  text: data => `error ${data.error === null ? 'is' : 'is not'} null`,
};

const makeVerboseRules = (rules, data) => rules.map(rule => ({
  passed: rule.test(data),
  text: rule.text(data),
}));

module.exports = (monitor, data) => {
  const rules = [
    assertNoError,
    ...ruleParser.mapRules(monitor.rules || []),
  ];

  const actions = makeVerboseRules(rules, data);
  const healthy = actions.every(action => action.passed);

  const event = {
    type: 'to-service',
    healthy,
    time: (new Date()).getTime(),
    actions,
  };

  console.log(monitor.id, 'healthy?', healthy ? 'yes' : 'no');

  return event;
};
