const repository = require('./monitors/repository');
const bootstrapToService = require('./monitors/to-service/bootstrap');
const repositoryDebug = require('./monitors/repositoryDebug');

const notifications = require('./notifications');
const notificationDebug = require('./notifications/notificationDebug');
const notificationSaveToRepo = require('./notifications/saveToRepository');
const notificationsSend = require('./notifications/sendNotifications');

bootstrapToService(repository.emitter);
repositoryDebug(repository.emitter);

notificationDebug(notifications.emitter);
notificationSaveToRepo(notifications.emitter);
notificationsSend(notifications.emitter);

module.exports = async () => {
  const things = await repository.all();

  if (things.length) {
    things.forEach((thing) => {
      // beautiful hack to rejiggle listeners
      // boots `setInterval` calls for existing resources
      repository.emitter.emit('update', thing);
    });
  } else {
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
      notifications: {
        webhooks: [
          'http://albinodrought.com/hello',
        ],
      },
    });
  }
};
