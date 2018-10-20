const repository = require('./../monitors/repository');

const save = ({ monitor }) => {
  repository.upsertGraph(monitor);
};

// listen for events emitted by the notification manager
// when we receive them, save changed monitor state into db
// decouples notification manager from db
module.exports = (emitter) => {
  emitter.on('initialized', save);
  emitter.on('healthy', save);
  emitter.on('unhealthy', save);
};
