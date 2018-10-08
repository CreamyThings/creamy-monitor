const notifications = require('./../../../src/notifications');

describe('notifications', () => {
  test('it should initialize a monitor once', () => {
    const testMonitor = {
      id: 1,
      initialized: false,
      healthy: false,
    };

    const testEvent = {
      healthy: true,
    };

    let timesCalled = 0;

    const handler = ({ monitor, event }) => {
      timesCalled += 1;

      expect(monitor).toBe(testMonitor);
      expect(event).toBe(testEvent);

      expect(timesCalled).toBe(1); // would fail if called twice

      expect(monitor.initialized).toBe(true);
      expect(monitor.healthy).toBe(true);
    };

    notifications.emitter.on('initialized', handler);

    // this should trigger init
    notifications.log(testMonitor, testEvent);
    // this should not trigger anything
    notifications.log(testMonitor, testEvent);

    notifications.emitter.removeListener('initialized', handler);
  });

  test('it should mark monitor as healthy', () => {
    const testMonitor = {
      id: 2,
      initialized: true,
      healthy: false,
    };

    const testEvent = {
      healthy: true,
    };

    notifications.emitter.once('healthy', ({ monitor, event }) => {
      expect(monitor).toBe(testMonitor);
      expect(event).toBe(testEvent);

      expect(monitor.healthy).toBe(true);
    });

    notifications.log(testMonitor, testEvent);
  });

  test('it should not mark monitor as healthy', () => {
    const testMonitor = {
      id: 2,
      initialized: true,
      healthy: true,
    };

    const testEvent = {
      healthy: true,
    };

    const fail = () => expect(false).toBe(true);
    notifications.emitter.on('healthy', fail);

    notifications.log(testMonitor, testEvent);

    notifications.emitter.removeListener('healthy', fail);
  });

  test('it should mark monitor as unhealthy', () => {
    const testMonitor = {
      id: 2,
      initialized: true,
      healthy: true,
    };

    const testEvent = {
      healthy: false,
    };

    notifications.emitter.once('unhealthy', ({ monitor, event }) => {
      expect(monitor).toBe(testMonitor);
      expect(event).toBe(testEvent);

      expect(monitor.healthy).toBe(false);
    });

    notifications.log(testMonitor, testEvent);
  });

  test('it should not mark monitor as unhealthy', () => {
    const testMonitor = {
      id: 2,
      initialized: true,
      healthy: false,
    };

    const testEvent = {
      healthy: false,
    };

    const fail = () => expect(false).toBe(true);
    notifications.emitter.on('unhealthy', fail);

    notifications.log(testMonitor, testEvent);

    notifications.emitter.removeListener('unhealthy', fail);
  });
});
