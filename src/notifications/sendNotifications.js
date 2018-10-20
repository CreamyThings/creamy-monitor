const providers = require('./providers');

const sendNotifications = type => (data) => {
  const { monitor } = data;
  const mappedNotifications = providers.mapNotifications(monitor.notifications || {});

  mappedNotifications.forEach(n => n(type, data));
};

module.exports = (emitter) => {
  emitter.on('initialized', sendNotifications('initialized'));
  emitter.on('healthy', sendNotifications('healthy'));
  emitter.on('unhealthy', sendNotifications('unhealthy'));
};
