const EventEmitter = require('events');
const Check = require('./../database/models/check');

const emitter = new EventEmitter();

module.exports = {
  emitter,
  all: async () => Check.query(),
  upsertGraph: async (check) => {
    const existed = !!check.id;
    const fetched = await Check.query().upsertGraphAndFetch(check);

    if (existed) {
      emitter.emit('update', fetched);
    } else {
      emitter.emit('create', fetched);
    }

    return fetched;
  },
  delete: async (thingId) => {
    const thing = await Check.query().where('id', thingId);

    if (!thing) {
      return false;
    }

    emitter.emit('delete', thing);
    return Check.query().delete().where('id', thingId);
  },
};
