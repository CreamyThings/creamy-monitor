const EventEmitter = require('events');

const emitter = new EventEmitter();

module.exports = {
  emitter,
  log: (monitor, event) => {
    console.log('got event', monitor, event);

    const localMonitor = monitor; // stops eslint from crying

    if (!monitor.initialized && event.healthy) {
      localMonitor.initialized = true;
      localMonitor.healthy = true;
      emitter.emit('initialized', {
        monitor,
        event,
      });
    } else if (!monitor.healthy && event.healthy) {
      localMonitor.healthy = true;
      emitter.emit('healthy', {
        monitor,
        event,
      });
    } else if (monitor.healthy && !event.healthy) {
      localMonitor.healthy = false;
      emitter.emit('unhealthy', {
        monitor,
        event,
      });
    }
  },
};
