const ruleParser = require('./rules');

const assertNoError = data => data.error === null;

module.exports = (monitor, data) => {
  const rules = [
    assertNoError,
    ...ruleParser.mapRules(monitor.rules || []),
  ];

  const healthy = rules.every(rule => rule(data));

  console.log(monitor.id, 'healthy?', healthy ? 'yes' : 'no');
};
