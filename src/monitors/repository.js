const EventEmitter = require('events');

let currentId = 1; // flawless
const emitter = new EventEmitter();

const monitors = [];

const findIndex = id => monitors.findIndex(m => m.id === id);

module.exports = {
  emitter,
  all: () => monitors.slice(),
  upsertGraph: (thing) => { // maybe ghetto clone of http://vincit.github.io/objection.js/#graph-upserts
    const exists = findIndex(thing.id);

    if (exists > -1) {
      // exists
      const existingThing = monitors[exists];
      const updatedThing = {
        ...existingThing,
        ...thing,
      };
      monitors[exists] = updatedThing;
      emitter.emit('update', updatedThing);
      return updatedThing;
    } else {
      // create
      const createdThing = {
        ...thing,
        id: currentId++,
      };
      monitors.push(createdThing);
      emitter.emit('create', createdThing);
      return createdThing;
    }
  },
  delete: (thingId) => {
    const exists = findIndex(thingId);

    if (exists > -1) {
      emitter.emit('delete', monitors[exists]);
      monitors.splice(exists, 1); // remove
      return true;
    }

    return false;
  },
};
