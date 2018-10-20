const express = require('express');
const slack = require('./../../../../src/notifications/providers/slack');

const HOST = 'localhost';
const PORT = 10086;
const BASE = `http://${HOST}:${PORT}`;

describe('slack notification provider', () => {
  let server;
  let socket;

  beforeEach((done) => {
    server = express();

    socket = server.listen(PORT, done);
  });

  afterEach((done) => {
    if (socket) {
      socket.close(done);
    }

    server = undefined;
    socket = undefined;
  });

  test('kitchen sink', (done) => {
    server.use(express.json());
    server.post('/services/OOGA/BOOGA/BOOGITY', (req, res) => {
      expect(req.body).toEqual({
        text: 'test-monitor is unhealthy!',
        attachments: [
          {
            color: 'good',
            fallback: 'error is null',
            text: 'error is null',
          },
          {
            color: 'danger',
            fallback: 'responseCode is not equal to 200',
            text: 'responseCode is not equal to 200',
          },
        ],
      });
      res.send('', 204);
    });

    slack(`${BASE}/services/OOGA/BOOGA/BOOGITY`)('unhealthy', {
      monitor: { name: 'test-monitor' },
      event: {
        actions: [
          { passed: true, text: 'error is null' },
          { passed: false, text: 'responseCode is not equal to 200' },
        ],
      },
    }).then(({ statusCode }) => {
      expect(statusCode).toBe(204);
      done();
    });
  });
});
