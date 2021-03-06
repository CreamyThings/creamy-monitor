const ruleParser = require('./../../../../../src/monitors/to-service/rules');

describe('to-service ruleparser', () => {
  const sampleObject = {
    error: null,
    statusCode: 200,
    responseTime: 315,
    body: 'everything will be ok i promise',
  };

  const passingRules = [
    ['responseTime', 'lt', 1],
    ['responseTime', 'lte', 0.5],
    ['responseTime', 'gt', 0.1],
    ['responseBody', 'eq', 'everything will be ok i promise'],
    ['responseBody', 'contains', 'i promise'],
    ['responseCode', 'eq', 200],
    ['responseCode', 'lt', 400],
  ];

  const failingRules = [
    ['responseTime', 'lte', 0.31],
    ['responseBody', 'contains', 'i dont promise'],
    ['responseBody', 'eq', 'Everything will be ok I promise'],
    ['responseCode', 'eq', 204],
  ];

  passingRules.forEach(([type, operator, value]) => {
    test(`${type} should ${operator} ${value}`, () => {
      expect(ruleParser.mapRule({
        type,
        operator,
        value,
      }).test(sampleObject)).toBe(true);
    });
  });

  failingRules.forEach(([type, operator, value]) => {
    test(`${type} should not ${operator} ${value}`, () => {
      expect(ruleParser.mapRule({
        type,
        operator,
        value,
      }).test(sampleObject)).toBe(false);
    });
  });

  test('passing rules mapped through `mapRules` should pass', () => {
    const rules = passingRules.map(([type, operator, value]) => ({
      type,
      operator,
      value,
    }));

    const mappedRules = ruleParser.mapRules(rules);
    expect(mappedRules.every(tf => tf.test(sampleObject))).toBe(true);
  });

  test('failing rules mapped through `mapRules` should fail', () => {
    const rules = failingRules.map(([type, operator, value]) => ({
      type,
      operator,
      value,
    }));

    const mappedRules = ruleParser.mapRules(rules);
    expect(mappedRules.every(tf => !tf.test(sampleObject))).toBe(true);
  });


  const ruleText = [
    {
      rule: ['responseTime', 'lt', 1],
      text: 'responseTime of 0.315 is less than 1',
    },
    {
      rule: ['responseBody', 'contains', 'i dont promise'],
      text: 'responseBody of everything will be ok i promise does not contain i dont promise',
    },
    {
      rule: ['responseCode', 'eq', 204],
      text: 'responseCode of 200 is not equal to 204',
    },
  ];

  ruleText.forEach((rule, i) => {
    test(`expected ruleText ${i}`, () => {
      const [type, operator, value] = rule.rule;

      const parsedRule = ruleParser.mapRule({
        type,
        operator,
        value,
      });

      expect(parsedRule.text(sampleObject)).toBe(rule.text);
    });
  });
});
