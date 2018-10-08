const repository = require('./monitors/repository');
const bootstrapToService = require('./monitors/to-service/bootstrap');
const repositoryDebug = require('./monitors/repositoryDebug');

bootstrapToService(repository.emitter);
repositoryDebug(repository.emitter);

// insert test monitor
repository.upsertGraph({
  name: 'test monitor',
  type: 'to-service',
  interval: 30,
  request: {
    url: 'http://albinodrought.com',
    method: 'get',
  };
});
