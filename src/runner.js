const repository = require('./monitors/repository');
const bootstrapToService = require('./monitors/to-service/bootstrap');
const repositoryDebug = require('./monitors/repositoryDebug');

const notifications = require('./notifications');
const notificationDebug = require('./notifications/notificationDebug');
const notificationSaveToRepo = require('./notifications/saveToRepository');

bootstrapToService(repository.emitter);
repositoryDebug(repository.emitter);

notificationDebug(notifications.emitter);
notificationSaveToRepo(notifications.emitter);

// insert test monitor
repository.upsertGraph({
  name: 'test monitor',
  type: 'to-service',
  initialized: false, // if monitor was ever healhy
  healthy: false, // current health state
  interval: 30,
  request: {
    url: 'http://albinodrought.com',
    method: 'get',
  },
});
