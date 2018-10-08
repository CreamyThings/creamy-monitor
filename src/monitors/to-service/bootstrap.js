const checker = require('./checker');
const determineHealth = require('./determineHealth');
const notifications = require('./../../notifications');

const intervals = {};

const checkMonitor = monitor => () => {
  console.log('checking to-service', monitor.id);
  checker(monitor.request).then((data) => {
    console.log('checked to-service', monitor.id, data);
    const event = determineHealth(monitor, data);
    notifications.log(monitor, event);
  });
};

const stopProcessing = (monitor) => {
  clearInterval(intervals[monitor.id]);
  delete intervals[monitor.id];
};

const startProcessing = (monitor) => {
  stopProcessing(monitor);
  intervals[monitor.id] = setInterval(
    checkMonitor(monitor),
    (monitor.interval || 30) * 1000, // ms to s
  );
};

module.exports = (emitter) => {
  emitter.on('create', (monitor) => {
    startProcessing(monitor);
  });

  emitter.on('update', (monitor) => {
    // clear old checks
    stopProcessing(monitor);
    // create new checks
    startProcessing(monitor);
  });

  emitter.on('delete', (monitor) => {
    // stop processing checks
    stopProcessing(monitor);
  });
};
