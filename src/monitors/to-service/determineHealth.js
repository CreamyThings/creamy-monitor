const ruleParser = require('./rules');

const assertNoError = {
  test: data => data.error === null,
  text: data => `error ${data.error === null ? 'is' : 'is not'} null`,
};

module.exports = (monitor, data) => {
  const rules = [
    assertNoError,
    ...ruleParser.mapRules(monitor.rules || []),
  ];

  const healthy = rules.every(rule => rule.test(data));

  console.log(monitor.id, 'healthy?', healthy ? 'yes' : 'no');

  return healthy;
};
