const EventEmitter = require('events');
const repository = require('./../monitors/repository');

const emitter = new EventEmitter();

module.exports = {
  emitter,
  log: (monitor, event) => {
    console.log('got event', monitor, event);

    const localMonitor = monitor;

    if (!monitor.initialized && event.healthy) {
      localMonitor.initialized = true;
      localMonitor.healthy = true;
      emitter.emit('initialized', {
        monitor,
        event,
      });
      repository.upsertGraph(localMonitor);
    } else if (!monitor.healthy && event.healthy) {
      localMonitor.healthy = true;
      emitter.emit('healthy', {
        monitor,
        event,
      });
      repository.upsertGraph(localMonitor);
    } else if (monitor.healthy && !event.healthy) {
      localMonitor.healthy = false;
      emitter.emit('unhealthy', {
        monitor,
        event,
      });
      repository.upsertGraph(localMonitor);
    }
  },
};
