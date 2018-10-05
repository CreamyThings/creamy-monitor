const determineHealth = require('./../../../../src/monitors/to-service/determineHealth');

describe('to-service determineHealth', () => {
  const checks = [
    {
      monitor: {},
      data: {
        error: null,
      },
      pass: true,
    },
    {
      monitor: {},
      data: {
        error: 'could not connect oh no',
      },
      pass: false,
    },
    {
      monitor: {
        id: 12,
        rules: [
          {
            type: 'responseTime',
            operator: 'lt',
            value: 0.5,
          },
          {
            type: 'responseTime',
            operator: 'gt',
            value: 0.1,
          },
          {
            type: 'responseCode',
            operator: 'eq',
            value: 200,
          },
        ],
      },
      data: {
        error: null,
        responseTime: 400,
        statusCode: 200,
        body: 'hi',
      },
      pass: true,
    },
    {
      monitor: {
        id: 42,
        rules: [
          {
            type: 'responseTime',
            operator: 'lt',
            value: 1,
          },
          {
            type: 'responseCode',
            operator: 'eq',
            value: 200,
          }
        ],
      },
      data: {
        error: null,
        responseTime: 652,
        statusCode: 503,
        body: '503 Server Unavailable',
      },
      pass: false,
    },
  ];

  checks.forEach(({ monitor, data, pass }, i) => {
    test(`check #${i} should ${pass ? 'pass' : 'fail'}`, () => {
      expect(determineHealth(monitor, data)).toBe(pass);
    });
  });
});
