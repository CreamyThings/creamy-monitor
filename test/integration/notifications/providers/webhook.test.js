const express = require('express');
const webhook = require('./../../../../src/notifications/providers/webhook');

const HOST = 'localhost';
const PORT = 10087;
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
    server.post('/webhook', (req, res) => {
      expect(req.body).toEqual({
        monitor: { name: 'test-monitor' },
        event: {
          actions: [
            { passed: true, text: 'error is null' },
            { passed: false, text: 'responseCode is not equal to 200' },
          ],
        },
        type: 'unhealthy',
      });
      res.send('', 204);
    });

    webhook(`${BASE}/webhook`)('unhealthy', {
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
