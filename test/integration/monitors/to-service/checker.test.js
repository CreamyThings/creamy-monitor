const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const checker = require('./../../../../src/monitors/to-service/checker');

const HOST = 'localhost';
const PORT = 10080;
const BASE = `http://${HOST}:${PORT}`;

describe('healthcheck checker', () => {
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

  test('should send an empty GET request with just URL', (done) => {
    server.get('/', (req, res) => {
      res.send('hi');
    });

    checker({ url: BASE }).then((resp) => {
      expect(resp.body).toBe('hi');
      expect(resp.statusCode).toBe(200);
      expect(resp.error).toBe(null);
      expect(resp.responseTime).toBeDefined();
      done();
    });
  });

  const passedMethodsTest = [
    'get',
    // 'head',
    'patch',
    'post',
    'put',
    'GET',
    // 'HEAD',
    'PATCH',
    'POST',
    'PUT',
  ];

  passedMethodsTest.forEach((method) => {
    test(`should send with method ${method}`, (done) => {
      server[method.toLowerCase()]('/', (req, res) => {
        res.send(method);
      });
  
      checker({ url: BASE, method }).then((resp) => {
        expect(resp.body).toBe(method);
        expect(resp.statusCode).toBe(200);
        expect(resp.error).toBe(null);
        expect(resp.responseTime).toBeDefined();
        done();
      });
    });
  });

  test('should timeout if it takes too long to receive a response', (done) => {
    server.get('/', (req, res) => {
      setTimeout(() => {
        res.send('hi');
      }, 5000);
    });

    checker({ url: BASE }).then((resp) => {
      expect(resp.error).toBeDefined();
      expect(resp.error.code).toBe('ESOCKETTIMEDOUT');
      expect(resp.body).toBeUndefined();
      expect(resp.responseTime).toBeUndefined();
      expect(resp.statusCode).toBeUndefined();
      done();
    });
  });

  test('should timeout if it takes longer than specified', (done) => {
    server.get('/', (req, res) => {
      setTimeout(() => {
        res.send('hi');
      }, 1500);
    });

    checker({ url: BASE, timeoutSeconds: 1 }).then((resp) => {
      expect(resp.error).toBeDefined();
      expect(resp.error.code).toBe('ESOCKETTIMEDOUT');
      expect(resp.body).toBeUndefined();
      expect(resp.responseTime).toBeUndefined();
      expect(resp.statusCode).toBeUndefined();
      done();
    });
  });

  test('should use passed headers', (done) => {
    server.get('/', (req, res) => {
      expect(req.headers['x-foo']).toBe('bar');
      expect(req.headers['user-agent']).toBe('Undercover');
      res.send('hi');
    });

    checker({ url: BASE, headers: { 'X-Foo': 'bar', 'User-Agent': 'Undercover' } }).then((resp) => {
      expect(resp.body).toBe('hi');
      expect(resp.statusCode).toBe(200);
      expect(resp.error).toBe(null);
      expect(resp.responseTime).toBeDefined();
      done();
    });
  });

  test('should use passed cookies', (done) => {
    server.use(cookieParser());
    server.get('/', (req, res) => {
      expect(req.cookies['foo']).toBe('bar');
      expect(req.cookies['bar']).toBe('foo');
      res.send('hi');
    });

    checker({ url: BASE, cookies: { foo: 'bar', bar: 'foo' } }).then((resp) => {
      expect(resp.body).toBe('hi');
      expect(resp.statusCode).toBe(200);
      expect(resp.error).toBe(null);
      expect(resp.responseTime).toBeDefined();
      done();
    });
  });

  test('should use passed cookies _and_ headers', (done) => {
    server.use(cookieParser());
    server.get('/', (req, res) => {
      expect(req.cookies['foo']).toBe('bar');
      expect(req.cookies['bar']).toBe('foo');
      expect(req.headers['x-foo']).toBe('bar');
      expect(req.headers['user-agent']).toBe('Undercover');
      res.send('hi');
    });

    checker({ url: BASE, cookies: { foo: 'bar', bar: 'foo' }, headers: { 'X-Foo': 'bar', 'User-Agent': 'Undercover' } }).then((resp) => {
      expect(resp.body).toBe('hi');
      expect(resp.statusCode).toBe(200);
      expect(resp.error).toBe(null);
      expect(resp.responseTime).toBeDefined();
      done();
    });
  });

  const bodyMethods = [
    'post',
    'patch',
    'put',
  ];

  const bodies = [
    'some body',
    '{ "foo": "bar" }',
  ];

  bodyMethods.forEach((bodyMethod) => {
    bodies.forEach((body) => {
      test(`should ${bodyMethod} body ${body}`, (done) => {
        server.use(bodyParser.text());
        server[bodyMethod]('/', (req, res) => {
          expect(req.body).toBe(body);
          res.send(bodyMethod);
        });

        checker({ url: BASE, method: bodyMethod, body, headers: { 'Content-Type': 'text/plain' } }).then((resp) => {
          expect(resp.body).toBe(bodyMethod);
          expect(resp.statusCode).toBe(200);
          expect(resp.error).toBe(null);
          expect(resp.responseTime).toBeDefined();
          done();
        });
      });
    });
  });
});
