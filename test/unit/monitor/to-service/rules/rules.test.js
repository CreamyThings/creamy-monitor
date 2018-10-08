const rules = require('./../../../../../src/monitors/to-service/rules/rules');

describe('to-service rules', () => {
  const sampleObject = {
    error: null,
    statusCode: 200,
    responseTime: 315,
    body: 'ok'
  };

  test('responseCode', () => {
    expect(rules.responseCode(sampleObject)).toBe(200);
  });

  test('responseBody', () => {
    expect(rules.responseBody(sampleObject)).toBe('ok');
  });

  test('responseTime', () => {
    expect(rules.responseTime(sampleObject)).toBe(0.315);
  });
});
